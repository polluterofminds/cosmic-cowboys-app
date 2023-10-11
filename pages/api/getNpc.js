const { TokenboundClient } = require("@tokenbound/sdk");
const { ethers } = require("ethers")
const provider = new ethers.AlchemyProvider("goerli", process.env.ALCHEMY_KEY)
import { Alchemy, Network } from "alchemy-sdk";
const wallet = new ethers.Wallet(process.env.SERVER_WALLET_PRIVATE_KEY, provider)
const config = {
  apiKey: process.env.ALCHEMY_KEY,
  network: Network.ETH_GOERLI,
};
const alchemy = new Alchemy(config);



export default async function handler(req, res) {
  if (req.method === "GET") {
    const tokenboundClient = new TokenboundClient({ signer: wallet, chainId: 5 })
    try {

      const npcsData = await alchemy.nft.getNftsForOwner(process.env.SERVER_WALLET_ADDRESS, { contractAddresses: [process.env.NPC_CONTRACT_ADDRESS] })
      const npcs = npcsData.ownedNfts

      let mergedNpcData = [];

      for (let npc of npcs) {
        let newNpc = { ...npc }

        console.log(npc)

        const tba = tokenboundClient.getAccount({
          tokenContract: process.env.NPC_CONTRACT_ADDRESS,
          tokenId: npc.tokenId
        })

        newNpc.tba = tba

        const tbaCurrencyBalance = await alchemy.core.getTokenBalances(tba, [process.env.CURRENCY_CONTRACT_ADDRESS])

        newNpc.balance = tbaCurrencyBalance

        const tbaItems = await alchemy.nft.getNftsForOwner(tba)

        newNpc.inventory = tbaItems

        mergedNpcData.push(newNpc)
      }

      console.log(mergedNpcData)
      res.send(mergedNpcData);
    } catch (error) {
      console.log(error);
      res.status(500).send("Action error");
    }
  }
}

