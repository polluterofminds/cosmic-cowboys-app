import { Alchemy, Network } from "alchemy-sdk";
import { getFiles, uploadJson } from "./storage";
const { TokenboundClient } = require("@tokenbound/sdk");
const { ethers } = require("ethers");
const provider = new ethers.AlchemyProvider("goerli", process.env.ALCHEMY_KEY);
const foodContractAddress = process.env.FOOD_CONTRACT_ADDRESS;
const suppliesContractAddress = process.env.SUPPLIES_CONTRACT_ADDRESS;
const currencyContractAddress = process.env.CURRENCY_CONTRACT_ADDRESS;

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
const tokenboundClient = new TokenboundClient({ signer: wallet, chainId: 5 });

export const getNPCStateFromBlockchain = async () => {
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
        tokenId: npc.tokenId,
        description: npc.description,
        image: npc.rawMetadata.image,
        maxHealth: 10,
      };

      const npcStats = await operatorContract.getNPCStats(npc.tokenId);
      const parsedResult = {
        bigIntValue: Number(npcStats[0]),
        stringValue: npcStats[1],
      };

      newNpc.health = parsedResult.bigIntValue;
      newNpc.currentLocation = parsedResult.stringValue;

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

      mergedNpcData.push(newNpc);
    }

    const options = {
      pinataMetadata: {
        name: `Cosmic Cowboy State ${new Date()}`,
        keyvalues: {
          ccs: "true",
        },
      },
      pinataOptions: {
        cidVersion: 1,
      },
    };
    const hashData = await uploadJson({ body: mergedNpcData, options });
    console.log(hashData);

    return mergedNpcData;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getNPCState = async () => {
  try {
    const metadata = {
      keyvalues: {
        "ccs": {
          value: "true",
          op: "eq",
        },
      },
    };

    const filters = {
      status: "pinned",
      pageLimit: 10,
      pageOffset: 0,
      metadata: metadata,
    };
    const files = await getFiles(filters);
    const { rows } = files;
    const newest = rows[0];
    const data = await fetch(`https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${newest.ipfs_pin_hash}`);
    const text = await data.text();
    const json = JSON.parse(text);
    return json;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const availableFunctions = [
  {
    actionToTake: "goToBar",
    locationName: "Bar",
    description:
      "Socialization point, helps develop character personality. The Ganymede bar is the only place to learn what other space cowboys are up to. Cannot be at the bar already to go to bar. Cannot be on a supply mission to go to bar.",
    arguments: [""],
  },
  {
    actionToTake: "goToHome",
    locationName: "Home",
    description:
      "Home is where our space cowboys rest. By visiting home, you'll increase health by 2 but reduce food by 2. You cannot already be at home to choose to go here. You cannot be on a supply mission to go here.",
    arguments: [""],
  },
  {
    actionToTake: "goToSupplyDepot",
    locationName: "Supply Depot",
    description:
      "The supply depot is where you can buy and sell supplies. Supplies are bought and sold 1-to-1, meaning if you sell 1 supply, you get 1 credit or if you sell 1 supply, you get 1 credit. You can also launch a supply mission here. The cost to launch a mission is 5 credits. The supply depot is the only place you can go if you are already on a supply mission. You cannot go to the supply depot if you are already at the supply depot.",
    arguments: [""],
  },
  {
    actionToTake: "buySupplies",
    locationName: "Supply Depot",
    description:
      "Supplies are necessary for launching future supply missions. Without supplies, you launch mission wouldn't be successful. Supplies cost 1 credit to get 1 supply. You can only buy supplies if you are at the supply depot. You must have credits > 0.",
    arguments: [""],
  },
  {
    actionToTake: "sellSupplies",
    locationName: "Supply Depot",
    description:
      "Selling supplies gives you credits. Credits can be used to launch a mission or visit the bar. Each supply you sell generates 1 credit and reduces your supply inventory by 1. You must be at the supply depot to sell supplies. You must have supplies > 0.",
  },
  {
    actionToTake: "launchSupplyMission",
    locationName: "Supply Depot",
    description:
      "A supply mission is the best way to build up a supply inventory without having to buy supplies. It is also the only way to build up your food inventory. A supply mission will yield 10 supplies and 10 food. The cost to launch the mission is 5 credits. You must be at the supply depot to launch a mission and you must have a credit balance of at least 5.",
  },
];

export const goToBar = async (npc) => {
  try {
    if (npc.currentLocation === "Bar") {
      console.log("Already at bar")
      return
    }
    const goToBarTx = await operatorContract.goToBar(npc.tokenId);
    console.log(goToBarTx)
    console.log(`${npc.name} chose: goToBar`)
  } catch (error) {
    throw error;
  }
};

export const goToHome = async (npc) => {
  try {
    if (npc.currentLocation === "Home") {
      console.log("Already at home")
      return
    } else if (npc.food < 2) {
      console.log("Not enough food")
      return
    }
    const goToHomeTx = await operatorContract.goToHome(npc.tokenId);
    console.log(goToHomeTx)
    const burnFood = await tokenboundClient.transferNFT({
      account: npc.tba,
      tokenType: 'ERC1155',
      tokenContract: foodContractAddress,
      tokenId: 0,
      recipientAddress: '0x000000000000000000000000000000000000dEaD',
      amount: 2,
    })
    console.log(burnFood)
    console.log(`${npc.name} chose: goToHome`)
  } catch (error) {
    throw error;
  }
};

export const goToSupplyDepot = async (npc) => {
  try {
    if (npc.currentLocation === "Supply Depot") {
      console.log("Already at supply depot")
      return
    }
    const goToSupplyDepotTx = await operatorContract.goToSupplyDepot(npc.tokenId);
    console.log(goToSupplyDepotTx)
    console.log(`${npc.name} chose: goToSupplyDepot`)
  } catch (error) {
    throw error;
  }
};

export const buySupplies = async (npc) => {
  try {
    if (npc.credits < 1) {
      console.log("Not enough credits")
      return
    }
    const burnCredits = await tokenboundClient.transferERC20({
      account: npc.tba,
      amount: 1,
      recipientAddress: '0x000000000000000000000000000000000000dEaD',
      erc20tokenAddress: currencyContractAddress,
      erc20tokenDecimals: 18,
    })
    console.log(burnCredits)
    const mintSupplies = await operatorContract.supplyNPC(npc.tba, 1)
    console.log(mintSupplies)
    console.log(`${npc.name} chose: buySupplies`)
  } catch (error) {
    throw error;
  }
};

export const sellSupplies = async (npc) => {
  try {
    if (npc.supplies < 1) {
      console.log("Not enough supplies")
      return
    }
    const burnSupplies = await tokenboundClient.transferNFT({
      account: npc.tba,
      tokenType: 'ERC1155',
      tokenContract: suppliesContractAddress,
      tokenId: 0,
      recipientAddress: '0x000000000000000000000000000000000000dEaD',
      amount: 1,
    })
    console.log(burnSupplies)
    const mintCredits = await operatorContract.fundNPC(npc.tba, 1);
    console.log(mintCredits)
    console.log(`${npc.name} chose: sellSupplies`)
  } catch (error) {
    throw error;
  }
};

export const launchSupplyMission = async (npc) => {
  try {
    if (npc.credits < 5) {
      console.out("Not enough credits")
      return
    } else if (npc.currentLocation !== "Supply Depot") {
      console.log("Must be at supply depot")
      return
    }
    const burnCredits = await tokenboundClient.transferERC20({
      account: npc.tba,
      amount: 5,
      recipientAddress: '0x000000000000000000000000000000000000dEaD',
      erc20tokenAddress: currencyContractAddress,
      erc20tokenDecimals: 18,
    })
    console.log(burnCredits)
    const mintFood = await operatorContract.feedNPC(npc.tba, 10)
    console.log(mintFood)
    const supplyNPC = await operatorContract.supplyNPC(npc.tba, 10)
    console.log(supplyNPC)
    console.log(`${npc.name} chose: launchSupplyMission`)
  } catch (error) {
    throw error;
  }
}
