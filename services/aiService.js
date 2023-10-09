import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

export const generateResponse = async (messages, temperature, gpt) => {
  try {
    const completion = await openai.chat.completions.create({
      messages: messages,
      temperature: temperature || 0.7, 
      model: gpt || "gpt-3.5-turbo",
    });

    return completion.choices[0].message.content
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const generateImage = async (prompt) => {
  try {
    const image = await openai.images.generate({ 
      prompt: prompt, 
      size: "512x512", 
      response_format: "url"
    });
    console.log(image);
    return image.data[0].url
  } catch (error) {
    console.log(error);
    throw error;
  }
}