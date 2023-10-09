import { generateResponse } from "@/services/aiService";
import { Client } from "@xmtp/xmtp-js";
import { Wallet } from 'ethers';

export default async function handler(req, res) {
  if(req.method === "POST") {
    try {
      const { npcId, messageHistory, address } = req.body;
      //  Look up NPC and get wallet address, name, backstory
      const NPC = {}
      const { name, description, walletAddress } = NPC;
      //  Get privateKey for NPC
      const privateKey = "";
      //  Get NPC's current state
      //  Connect to XMTP  
      const wallet = new Wallet(privateKey);  
      // Start a conversation with XMTP @TODO make sure to do this when an NPC's TBA is created to link them to XMTP
      const xmtp = await Client.create(wallet);
      const conversation = await xmtp.conversations.newConversation(address);
      //  Generate AI response
      const messages = [{
        role: 'system', 
        content: `Your name is ${name}, and this is your backstory: ${description}. You are a space cowboy who set off from earth hoping to mine a giant Lithium space rock. However, you crash landed with the other miners on Jupiter's moon Ganymede. This is your current situation: ${summary}` 
      }, ...messageHistory]
      const response = await generateResponse(messages, 1.2);
      await conversation.send(response);
      res.send("Message sent");
    } catch (error) {
      console.log(error);
      res.status(500).send("Terminal connection interrupted by solar flares, please try again later.");
    }
  }
}