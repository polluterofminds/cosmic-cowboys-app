import { getNPCState, getNPCStateFromBlockchain } from "@/services/npc";

export default async function handler(req, res) {
  if (req.method === "GET") {    
    try {
      if(req.query.cached) {
        const {hash, mergedNpcData} = await getNPCState();
        return res.json({hash, mergedNpcData});
      } else {
        const { hash, mergedNpcData } = await getNPCStateFromBlockchain();
        res.json({hash, mergedNpcData});
      }
            
    } catch (error) {
      console.log(error);
      res.status(500).send("Action error");
    }
  }
}

