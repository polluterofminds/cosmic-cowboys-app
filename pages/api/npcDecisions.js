import { availableFunctions, buySupplies, getNPCState, goToBar, goToHome, goToSupplyDepot, launchSupplyMission, sellSupplies } from "@/services/npc";
import { generateResponse } from "@/services/aiService";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      //  Get NPC details (name, description, current location, current health, current food, current supplies, current credit balance)
      //  Get available functions the NPC can call
      const { npc } = req.body;
      //  AI to select function to call based on game state plus game goals
      const messages = [
        {
          role: "system",
          content: `
          You are ${npc.name}. Your backstory is: ${
            npc.description
          }. You were one of 20 space cowboys that left Earth to mine a giant Lithium space rock only to end up crash-landing on Jupiter's moon Ganymede. 
          Your goal now is survival and happiness, and to end up with the most credits. Here is your current state in JSON form: ${npc}.\n 
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
      
      availableFunctions.map(f => f.actionToTake)
      if(availableFunctions.map(f => f.actionToTake).includes(response.content)) {
        //  Execute the call (we can skip a second OpenAI call here because we already have the function)
        //  We need to figure out what arguments to pass into each of these functions
        switch(response.content) {
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
      const npcData = await getNPCState();
      for (const npc of npcData) {
        try {
          console.log(npc.name);
          const response = await fetch("http://localhost:3000/api/npcDecisions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({npc}),
          });

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
