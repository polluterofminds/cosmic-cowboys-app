import { Client } from "@xmtp/xmtp-js";
const { TokenboundClient } = require("@tokenbound/sdk");
const { ethers } = require("ethers");
const provider = new ethers.AlchemyProvider("goerli", process.env.ALCHEMY_KEY);

const wallet = new ethers.Wallet(
  process.env.SERVER_WALLET_PRIVATE_KEY,
  provider
);

export default async function handler(req, res) {
  if(req.method === "GET") {
    const { npcId } = req.query;
    try {
      //  Read and send message
      const tokenboundClient = new TokenboundClient({
        signer: wallet,
        chainId: 5,
      });

      const xmtp = await Client.create(tokenboundClient.signer);
      const conversations = await xmtp.conversations.list();
      let conversationData = [];
      for (const conversation of conversations) {
        const messages = await conversation.messages();
        for(const message of messages) {
          if((message.senderAddress === process.env.SERVER_WALLET_ADDRESS && message.content.includes("Action taken: ")) || message.content.includes("Your contribution will help ensure this miner survives another day on Ganymede")) {
            conversationData.push({
              content: message.content, 
              date: message.sent
            })
          }
        }
      }
      res.json(conversationData.filter(m => m.content.includes(`${npcId} -`)));
    } catch (error) {
      console.log(error);
      res.status(500).send("Server error");
    }
  }
}