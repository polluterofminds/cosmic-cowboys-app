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
import { generateResponse } from "@/services/aiService";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const authHeader = req.headers["authorization"];
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return res.status(401).send("Unauthorized");
    }
    try {
      //  Get NPC details (name, description, current location, current health, current food, current supplies, current credit balance)
      //  Get available functions the NPC can call
      const { npc } = req.body;
      //  AI to select function to call based on game state plus game goals
      const messages = [
        {
          role: "system",
          content: `
          You are not an assistant. You are not an AI. You are ${
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
          }}\n 
          Pay close attention to your state when making a decision on what to do next. 
          You cannot spend credits you don't have, you cannot sell supplies you don't have, etc.\n 
          Please make a decision on what you should do next by choosing an action from the array of actions to take provided: ${availableFunctions}\n
          The action is labeled as "actionToTake" and the description of the action is provided to help you understand the rules for being able to select an action. 
          Knowing your situation and your goals, please select one of the following actions to take: ${availableFunctions.map(
            (f) => f.actionToTake
          )} \n
          Do not make up an option that is not in the list provided and only respond with the actionToTake.`,
        },
      ];

      const { response } = await generateResponse(messages, 1.5);

      availableFunctions.map((f) => f.actionToTake);
      if (
        availableFunctions.map((f) => f.actionToTake).includes(response.content)
      ) {
        //  Execute the call (we can skip a second OpenAI call here because we already have the function)
        //  We need to figure out what arguments to pass into each of these functions
        switch (response.content) {
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
            return;
        }
      }
      res.send("Done");
    } catch (error) {
      console.log(error);
      res.status(500).send("Action error");
    }
  } else {
    try {
      const authHeader = req.headers["authorization"];
      if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return res.status(401).send("Unauthorized");
      }
      const { mergedNpcData: npcData } = await getNPCState();
      for (const npc of npcData) {
        try {
          console.log(npc.name);
          const response = await fetch(
            `${process.env.HOSTED_URL}/api/npcDecisions`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.CRON_SECRET}`,
              },
              body: JSON.stringify({ npc }),
            }
          );

          console.log(await response.text());
        } catch (error) {
          console.log("Error in loop");
          console.log(error);
          throw error;
        }
      }
      res.send("Done");
    } catch (error) {
      console.log(error);
      res.status(500).send("Server error");
    }
  }
}
