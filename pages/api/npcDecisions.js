import { getNPCState } from "@/services/npc";
import { generateResponse } from "@/services/aiService";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      //  Get NPC details (name, description, current location, current health, current food, current supplies, current credit balance)
      //  Get available functions the NPC can call
      const { mockNPC, availableFunctions } = await getNPCState();
      //  AI to select function to call based on game state plus game goals
      const messages = [
        {
          role: "system",
          content: `
          You are ${mockNPC.name}. Your backstory is: ${
            mockNPC.description
          }. You were one of 20 space cowboys that left Earth to mine a giant Lithium space rock only to end up crash-landing on Jupiter's moon Ganymede. 
          Your goal now is survival and happiness. Here is your current state in JSON form: ${mockNPC}.\n 
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

      const response = await generateResponse(messages, 1.5);
      console.log(response);
      res.send(response);
      //  AI to execute a forced function call based on previous response
    } catch (error) {
      console.log(error);
      res.status(500).send("Action error");
    }
  } else {
    
  }
}
