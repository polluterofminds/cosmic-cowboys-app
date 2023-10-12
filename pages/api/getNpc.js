import { getNPCState } from "@/services/npc";

export default async function handler(req, res) {
  if (req.method === "GET") {    
    try {
      const mergedNpcData = await getNPCState();
      res.json(mergedNpcData);
    } catch (error) {
      console.log(error);
      res.status(500).send("Action error");
    }
  }
}

