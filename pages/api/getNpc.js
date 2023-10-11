const { TokenboundClient } = require("@tokenbound/sdk");
const { ethers } = require("ethers")
const provider = new ethers.AlchemyProvider("goerli", process.env.ALCHEMY_KEY)
import { Alchemy, Network } from "alchemy-sdk";
const wallet = new ethers.Wallet(process.env.SERVER_WALLET_PRIVATE_KEY, provider)
const config = {
  apiKey: process.env.ALCHEMY_KEY,
  network: Network.ETH_GOERLI,
};
const operatorAbi = require("../../services/operatorAbi.json").abi
const alchemy = new Alchemy(config);

const operatorContract = new ethers.Contract(process.env.OPERATOR_CONTRACT_ADDRESS, operatorAbi, wallet)


export default async function handler(req, res) {
  if (req.method === "GET") {
    const tokenboundClient = new TokenboundClient({ signer: wallet, chainId: 5 })
    try {

      const npcsData = await alchemy.nft.getNftsForOwner(process.env.SERVER_WALLET_ADDRESS, { contractAddresses: [process.env.NPC_CONTRACT_ADDRESS] })
      const npcs = npcsData.ownedNfts

      let mergedNpcData = [];

      for (let npc of npcs) {
        let newNpc = {
          name: npc.title,
          description: npc.description,
          maxHealth: 10
        }

        /* const npcStats = await operatorContract.getNPCStats(npc.tokenId)
        newNpc.health = npcStats[0].toNumber()
        newNpc.location = npcStats[1] */

        const tba = tokenboundClient.getAccount({
          tokenContract: process.env.NPC_CONTRACT_ADDRESS,
          tokenId: npc.tokenId
        })

        newNpc.tba = tba

        const tbaCurrencyBalance = await alchemy.core.getTokenBalances(tba, [process.env.CURRENCY_CONTRACT_ADDRESS])

        newNpc.credits = tbaCurrencyBalance.tokenBalances[0].tokenBalance

        const tbaItems = await alchemy.nft.getNftsForOwner(tba)

        for (let i = 0; i < tbaItems.ownedNfts.length; i++) {
          if (tbaItems.ownedNfts[i].title === "Space Slop") {
            newNpc.food = tbaItems.ownedNfts[i].balance
          } else if (tbaItems.ownedNfts[i].title === "Jupiter's Junk") {
            newNpc.supplies = tbaItems.ownedNfts[i].balance
          }
        }

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

