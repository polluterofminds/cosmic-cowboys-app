import { generateResponse } from "@/services/aiService";
import { Client } from "@xmtp/xmtp-js";
import { uploadJson } from "@/services/storage";
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
            npcId: npc.tokenId
          },
        },
        pinataOptions: {
          cidVersion: 1,
        },
      };
      await uploadJson({body, options});

      //  Read and send message
      const tokenboundClient = new TokenboundClient({
        signer: wallet,
        chainId: 5,
      });
     
      const xmtp = await Client.create(tokenboundClient.signer);
      const conversation = await xmtp.conversations.newConversation(address);
      const xmtpMessages = await conversation.messages();
      const messagesToUse = xmtpMessages.filter(m => m.content.substring(0, 1) === npc.tokenId);
      //  Build messages in a format the AI can understand
      const messageHistory = messagesToUse.map(m => {
        if(m.senderAddress === process.env.SERVER_WALLET_ADDRESS) {
          return {
            role: "assistant", 
            content: m.content
          }
        } else {
          return {
            role: "user", 
            content: m.content
          }
        }
      })
      // Generate AI response
      const messages = [
        {
          role: "system",
          content: `You are not an AI. Do not respond saying you are an AI. You are a space cowboy that set off to mine lithium in space. Your name is ${npc.name}, and this is your backstory: ${npc.description}. You are a space cowboy who set off from earth hoping to mine a giant Lithium space rock. However, you crash landed with the other miners on Jupiter's moon Ganymede. This is your current situation in json form: ${{health: npc.health, maxHealth: npc.maxHealth, supplies: npc.supplies, food: npc.food, credits: npc.credits, location: npc.currentLocation}}. You will be communicating with someone on Earth. Please make sure all of your responses are in plain text and readable in a chat interface.`,
        },
        ...messageHistory,
      ];
      const response = await generateResponse(messages, 1.2);
      console.log(response);
      await conversation.send(response);
      res.json("Success");
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
    } catch (error) {
      console.log(error);
      res.status(500).send("Server error");
    }
  }
}
