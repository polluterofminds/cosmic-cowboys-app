import { generateImage, generateResponse } from "@/services/aiService";
import fs from "fs";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      let count = 10;
      // while (count < 20) {
        console.log(`Generating character number ${count}`);
        //  Generate a name for our space cowboy
        //  Generate a random personality
        const messages = [
          {
            role: "system",
            content:
              "You are a brilliant creative, especially good at making up character names and backstories.",
          },
          {
            role: "user",
            content:
              "I am creating a game world where a space rock made of mostly Lithium has entered the galaxy. A ragtag group of modern day gold rushers are entering space to mine the rock. All of the miners are from Earth. There are no colonies on other planets that we know of. These miners are like space cowboys. When generating characters, a character should have a 50% chance of being female and 50% chance of being male. Avoid the name 'Maverick' Please create a unique character name and backstory. Use the TV show Firefly as inspiration, but do not copy names from that show. Please provide an answer containing 'Name:' and the name you generate and 'Backstory': and the backstory you generate.",
          },
        ];
        const spaceCowboy = await generateResponse(messages, 1.3);

        //  Parse and ensure there is a name and a backstory part of the text
        const name = spaceCowboy.split("Name: ")[1].split("Backstory: ")[0];
        console.log({ name });
        const backstory = spaceCowboy.split("Backstory: ")[1];
        console.log({ backstory });
        //  Generate image
        const imagePromptMessages = [
          {
            role: "system",
            content:
              "You are the greatest Midjourney prompt engineer on the planet.",
          },
          {
            role: "user",
            content: `I'm going to provide you a video game character name and backstory, please create one prompt that can be used in Midjourney, an AI image generation tool, to create profile pictures for the character. Here is the character's name: ${name}, and here is the backstory: ${backstory}`,
          },
        ];
        const imagePrompt = await generateResponse(imagePromptMessages, 1.0);
        console.log(imagePrompt);
        console.log(JSON.stringify({name, backstory, imagePrompt}));
        // fs.writeFileSync(`./characters/${count}.json`, JSON.stringify({name, backstory, imagePrompt}));
        count++;
      // }
      res.json("Done");
    } catch (error) {
      console.log(error);
      res.status(500).send("Server Error");
    }
  }
}
