import { Alchemy, Network } from "alchemy-sdk";
import fs from "fs";
const { TokenboundClient } = require("@tokenbound/sdk");
const { ethers } = require("ethers");
const provider = new ethers.AlchemyProvider("goerli", process.env.ALCHEMY_KEY);

const wallet = new ethers.Wallet(
  process.env.SERVER_WALLET_PRIVATE_KEY,
  provider
);
const config = {
  apiKey: process.env.ALCHEMY_KEY,
  network: Network.ETH_GOERLI,
};
const operatorAbi = require("./operatorAbi.json").abi;
const alchemy = new Alchemy(config);

const operatorContract = new ethers.Contract(
  process.env.OPERATOR_CONTRACT_ADDRESS,
  operatorAbi,
  wallet
);

export const getNPCState = async (npcId) => {
  const tokenboundClient = new TokenboundClient({ signer: wallet, chainId: 5 });
  try {
    const npcsData = await alchemy.nft.getNftsForOwner(
      process.env.SERVER_WALLET_ADDRESS,
      { contractAddresses: [process.env.NPC_CONTRACT_ADDRESS] }
    );
    
    const npcs = npcsData.ownedNfts;

    let mergedNpcData = [];

    for (let npc of npcs) {
      let newNpc = {
        name: npc.title,
        description: npc.description,
        // image: npc.metadata.image,
        maxHealth: 10,
      };

      const npcStats = await operatorContract.getNPCStats(npc.tokenId);
      const parsedResult = {
        bigIntValue: Number(npcStats[0]),
        stringValue: npcStats[1],
      };

      newNpc.health = parsedResult.bigIntValue;
      newNpc.location = parsedResult.stringValue;

      const tba = tokenboundClient.getAccount({
        tokenContract: process.env.NPC_CONTRACT_ADDRESS,
        tokenId: npc.tokenId,
      });

      newNpc.tba = tba;

      const tbaCurrencyBalance = await alchemy.core.getTokenBalances(tba, [
        process.env.CURRENCY_CONTRACT_ADDRESS,
      ]);

      const tbaCurrencyBalanceReadable =
        tbaCurrencyBalance.tokenBalances[0].tokenBalance / 10 ** 18;
      newNpc.credits = tbaCurrencyBalanceReadable;

      const tbaItems = await alchemy.nft.getNftsForOwner(tba);

      for (let i = 0; i < tbaItems.ownedNfts.length; i++) {
        if (tbaItems.ownedNfts[i].title === "Space Slop") {
          newNpc.food = tbaItems.ownedNfts[i].balance;
        } else if (tbaItems.ownedNfts[i].title === "Jupiter's Junk") {
          newNpc.supplies = tbaItems.ownedNfts[i].balance;
        }
      }

      //  Get image CID
      const charactersDirectory = fs.readdirSync("./characters");
      const miners = [];
      for (const c of charactersDirectory) {
        let m = JSON.parse(fs.readFileSync(`./characters/${c}`));
        const image = m.image;
        const name = m.name;
        miners.push({image, name});
      }

      const found = miners.find(m => m.name === newNpc.name);
      if(found) {
        newNpc.image = found.image;
      }

      mergedNpcData.push(newNpc);
    }

    return mergedNpcData;
  } catch (error) {
    console.log(error);
    throw error;
  }

  // try {
  //   const mockNPC = {
  //     name: 'Josefina "Josie" Blackwood\n',
  //     description:
  //       'Josefina Blackwood grew up in a small mining town on Earth, dreaming of exploration and adventure among the stars. Born into a family of hardworking miners, she soon developed a knack for navigating treacherous underground tunnels and extracting valuable resources. Her sharp wit and resourcefulness earned her the nickname "Josie" among her friends.\n\nAs the space rock made of lithium entered the galaxy, Josefina saw it as an opportunity to leave her mundane life behind and embark on a thrilling journey into the unknown. Equipped with her trusty laser cutter and a determination to strike it rich, she joined a band of fellow miners, ready to make their mark in the cosmos.\n\nJosefina\'s spirited personality often shines through as she fearlessly navigates the challenges of space mining. Her agility and knowledge of underground operations make her an invaluable asset within the team. Though she can be reserved at first, her natural leadership abilities and strong sense of camaraderie soon earn her the respect and admiration of her peers.\n\nDriven by her quest for adventure and the chance to uncover the secrets hidden within the lithium rock, Josefina embraces her role as a modern-day space cowboy. With her bouncy auburn hair tucked under a worn-out hat and a determination etched into her eyes, she sets her sights on the vastness of the cosmos, ready to make her own mark in the annals of space mining history.',
  //     health: 7,
  //     credits: 25,
  //     supplies: 4,
  //     food: 4,
  //     maxHealth: 10,
  //     suppliesCost: 1,
  //     foodCost: 1,
  //     barCost: 2,
  //     launchSupplyMissionCost: 5,
  //     currentLocaltion: "Home",
  //   };

  //   const availableFunctions = [
  //     {
  //       actionToTake: "goToBar",
  //       locationName: "Bar",
  //       description:
  //         "Socialization point, helps develop character personality. The Ganymede bar is the only place to learn what other space cowboys are up to. Cannot be at the bar already to go to bar. Cannot be on a supply mission to go to bar.",
  //       arguments: [""],
  //     },
  //     {
  //       actionToTake: "goToHome",
  //       locationName: "Home",
  //       description:
  //         "Home is where our space cowboys rest. By visiting home, you'll increase health by 2 but reduce food by 2. You cannot already be at home to choose to go here. You cannot be on a supply mission to go here.",
  //       arguments: [""],
  //     },
  //     {
  //       actionToTake: "goToSupplyDepot",
  //       locationName: "Supply Depot",
  //       description:
  //         "The supply depot is where you can buy and sell supplies. Supplies are bought and sold 1-to-1, meaning if you sell 1 supply, you get 1 credit or if you sell 1 supply, you get 1 credit. You can also launch a supply mission here. The cost to launch a mission is 5 credits. The supply depot is the only place you can go if you are already on a supply mission. You cannot go to the supply depot if you are already at the supply depot.",
  //       arguments: [""],
  //     },
  //     {
  //       actionToTake: "buySupplies",
  //       locationName: "Supply Depot",
  //       description:
  //         "Supplies are necessary for launching future supply missions. Without supplies, you launch mission wouldn't be successful. Supplies cost 1 credit to get 1 supply. You can only buy supplies if you are at the supply depot. You must have credits > 0.",
  //       arguments: [""],
  //     },
  //     {
  //       actionToTake: "sellSupplies",
  //       locationName: "Supply Depot",
  //       description:
  //         "Selling supplies gives you credits. Credits can be used to launch a mission or visit the bar. Each supply you sell generates 1 credit and reduces your supply inventory by 1. You must be at the supply depot to sell supplies. You must have supplies > 0.",
  //     },
  //     {
  //       actionToTake: "launchSupplyMission",
  //       locationName: "Supply Depot",
  //       description:
  //         "A supply mission is the best way to build up a supply inventory without having to buy supplies. It is also the only way to build up your food inventory. A supply mission will yield 10 supplies and 10 food. The cost to launch the mission is 5 credits. You must be at the supply depot to launch a mission and you must have a credit balance of at least 5.",
  //     },
  //   ];

  //   return { mockNPC, availableFunctions };
  // } catch (error) {
  //   console.log(`Error getting NPC state: ${error}`);
  //   throw error;
  // }
};
