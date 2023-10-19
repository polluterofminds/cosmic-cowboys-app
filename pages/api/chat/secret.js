import { generateResponse } from "@/services/aiService";
import { Client } from "@xmtp/xmtp-js";
import { uploadJson } from "@/services/storage";
import {
  availableFunctions,
  buySupplies,
  getNPCState,
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
    const { npc, address } = req.body;
    console.log(address)
    try {
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

      //  Marge's favorite number between 15-30
      if (messagesToUse.length < 22) {
        await conversation.send(
          `${npc.tokenId} - Sorry, but I can only tell secrets to people I've grown really close to.`
        );
      } else {
        //Get Miners
        const { mergedNpcData } = await getNPCState();
        //  Randomly Select a miner
        const miner =
          mergedNpcData[Math.floor(Math.random() * mergedNpcData.length)];

        // Generate AI response
        const messages = [
          {
            role: "system",
            content: `You are not an assistant. You are not an AI. Do not respond with anything indicating you are an AI assistant. You are ${
              npc.name
            }. This is your story: ${
              npc.description
            }. This is the story of the adventure you are on: An asteroid made of 90% lithium crashed into our galaxy, prompting a worldwide race to mine it for its valuable resource. A group of hastily trained space cowboys embarked on this quest, only to end up crash-landing on Ganymede, one of Jupiter's moons, due to cosmic disturbances. Stranded, they had to build a society using available resources and tools, relying on rockets for supplies from nearby moons. These are you current stats: ${{
              health: npc.health,
              maxHealth: npc.maxHealth,
              supplies: npc.supplies,
              food: npc.food,
              credits: npc.credits,
              location: npc.currentLocation,
            }}. You will be communicating with someone on Earth who is asking for you a secret about the following fellow miner named ${miner.name} who has the following backstory: ${miner.description}. Please makse sure the secret you tell is about that person only. Do not make up another person. Please make sure all of your responses are in plain text and readable in a chat interface. Please limit your response to two or three sentences. Each response should be pre-fixed with "${
              npc.tokenId
            } -".`,
          },
          {
            role: "user",
            content:
              "Can you please tell me a secret about one of the other miners?",
          },
        ];
        const { response } = await generateResponse(
          messages.filter((m) => !m.content.includes("***SYSTEM MESSAGE")),
          1.2
        );
        await conversation.send(response.content);
      }
      res.send("Done");
    } catch (error) {
      console.log(error);
      res.status(500).send("Server error");
    }
  }
}
