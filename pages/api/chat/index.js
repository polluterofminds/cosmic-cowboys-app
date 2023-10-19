import { generateResponse } from "@/services/aiService";
import { Client } from "@xmtp/xmtp-js";
import { uploadJson } from "@/services/storage";
import {
  availableFunctions,
  buySupplies,
  goToBar,
  goToHome,
  goToSupplyDepot,
  launchSupplyMission,
  sellSupplies,
} from "@/services/npc";
const { TokenboundClient } = require("@tokenbound/sdk");
const { ethers } = require("ethers");
const provider = new ethers.AlchemyProvider("goerli", process.env.ALCHEMY_KEY);

const wallet = new ethers.Wallet(
  process.env.SERVER_WALLET_PRIVATE_KEY,
  provider
);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { npc, text, address } = req.body;
      //  Store message data
      const body = {
        npcId: npc.tokenId,
        text,
      };
      const options = {
        pinataMetadata: {
          name: `Conversation Input for NPC ${npc.tokenId}`,
          keyvalues: {
            ccci: "true",
            npcId: npc.tokenId,
          },
        },
        pinataOptions: {
          cidVersion: 1,
        },
      };
      await uploadJson({ body, options });

      //  Read and send message
      const tokenboundClient = new TokenboundClient({
        signer: wallet,
        chainId: 5,
      });

      const xmtp = await Client.create(tokenboundClient.signer);
      const conversation = await xmtp.conversations.newConversation(address);
      const xmtpMessages = await conversation.messages();

      const messagesToUse = xmtpMessages.filter(
        (m) => m.content.substring(0, npc.tokenId.length) === npc.tokenId
      );
      //  Build messages in a format the AI can understand
      let messageHistory = messagesToUse.map((m) => {
        if (m.senderAddress === process.env.SERVER_WALLET_ADDRESS) {
          return {
            role: "assistant",
            content: m.content,
          };
        } else {
          return {
            role: "user",
            content: m.content,
          };
        }
      });

      //  Try to keep the system context strong by trimming the conversation history

      //  The AI may choose to execute a function if the input is strong enough
      const functions = availableFunctions.map((f) => {
        return {
          name: f.actionToTake,
          description: f.description,
          parameters: {
            type: "object",
            properties: {
              npc: {
                type: "object",
                description: `The npc who is curently talking, represented by this variable: ${npc}`,
              },
            },
          },
        };
      });

      // Generate AI response
      const messages = [
        {
          role: "system",
          content: `You are not an assistant. You are not an AI. Do not respond with anything indicating you are an AI assistant. You are ${
            npc.name
          }. This is your story: ${
            npc.description
          }. This is the story of the adventure you are on: An asteroid made of 90% lithium crashed into our galaxy, prompting a worldwide race to mine it for its valuable resource. A group of hastily trained space cowboys embarked on this quest, only to end up crash-landing on Ganymede, one of Jupiter's moons, due to cosmic disturbances. Stranded, they had to build a society using available resources and tools, relying on rockets for supplies from nearby moons.Please use the following details to help inform your responses: ${{
            health: npc.health,
            maxHealth: npc.maxHealth,
            supplies: npc.supplies,
            food: npc.food,
            credits: npc.credits,
            location: npc.currentLocation,
          }}. You will be communicating with someone on Earth. Please make sure all of your responses are in plain text and readable in a chat interface. Please limit your response to two or three sentences. Each response should be pre-fixed with "${
            npc.tokenId
          } -".`,
        },
        ...messageHistory.slice(Math.max(messageHistory.length - 8, 0)),
      ];

      const { response } = await generateResponse(messages.filter((m) => !m.content.includes("***SYSTEM MESSAGE")), 1, functions);
      console.log(response);
      if (response.function_call) {
        switch (response.function_call.name) {
          case "goToHome":
            await goToHome(npc);
            break;
          case "goToBar":
            await goToBar(npc);
            break;
          case "goToSupplyDepot":
            await goToSupplyDepot(npc);
            break;
          case "buySupplies":
            await buySupplies(npc);
            break;
          case "sellSupplies":
            await sellSupplies(npc);
            break;
          case "launchSupplyMission":
            await launchSupplyMission(npc);
            break;
          default:
            console.log("No function selected");
            break;
        }
        console.log("Player triggered a function call");
        console.log(response.function_call);
        console.log(`Action taken: ${response.function_call.name}`);
        await conversation.send(
          `${npc.tokenId} - Action taken: ${response.function_call.name}`
        );
        //  @TODO Reward the player for triggering a function call
        await conversation.send(`${npc.tokenId} - \n***SYSTEM MESSAGE***\nThe government thanks you for contributing to the safety of our miners and has rewarded you for your effort.\n***END SYSTEM MESSAGE***`)
        fetch(`${process.env.HOSTED_URL}/api/getNpc`);
      } else {
        await conversation.send(response.content);
      }

      res.json(response);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send(
          "Terminal connection interrupted by solar flares, please try again later."
        );
    }
  } else {
    try {
      const tokenboundClient = new TokenboundClient({
        signer: wallet,
        chainId: 5,
      });

      const xmtp = await Client.create(tokenboundClient.signer);
      console.log(xmtp);

      res.send("connected");
    } catch (error) {
      console.log(error);
      res.status(500).send("Server error");
    }
  }
}
