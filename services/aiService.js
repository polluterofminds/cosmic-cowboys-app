import OpenAI from "openai";
const { Client, Settings } = require('bageldb-beta');

const settings = new Settings({
  bagel_api_impl: "rest",
  bagel_server_host: "api.bageldb.ai",
  bagel_server_http_port: 80
});

const bagelClient = new Client(settings);

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

export const generateResponse = async (messages, temperature, functions, gpt) => {
  try {
    const completionObj = {
      messages: messages,
      temperature: temperature || 0.7, 
      model: gpt || "gpt-3.5-turbo",
    }

    if(functions) {
      completionObj["functions"] = functions;
    }

    const completion = await openai.chat.completions.create(completionObj);

    return {response: completion.choices[0].message }
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

export const createEmbedding = async (content) => {
  try {
    // const cluster = await bagelClient.get_or_create_cluster('cosmic-cowboys-chat');
    // const result = await cluster.add(content);
    // console.log({bagelResult: result});
    const embedding = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: "The quick brown fox jumped over the lazy dog",
      encoding_format: "float",
    });
  
    console.log(embedding?.data[0]?.embedding);
    return embedding?.data[0]?.embedding;
  } catch (error) {
    console.log("BAGEL ERROR")
    console.log(error);
    throw error;
  }
}

export function cosineSimilarity(vec1, vec2) {
  if (vec1.length !== vec2.length) {
    throw new Error("Vectors must have the same length");
  }

  let dotProduct = 0;
  let magnitude1 = 0;
  let magnitude2 = 0;

  for (let i = 0; i < vec1.length; i++) {
    dotProduct += vec1[i] * vec2[i];
    magnitude1 += Math.pow(vec1[i], 2);
    magnitude2 += Math.pow(vec2[i], 2);
  }

  magnitude1 = Math.sqrt(magnitude1);
  magnitude2 = Math.sqrt(magnitude2);

  return dotProduct / (magnitude1 * magnitude2);
}

export const mostRelevantEmbedding = async (question, Embeddings) => {
  const questionVector = await createEmbedding(question);  
  const mostSimilarEmbedding = Embeddings.reduce(
    (best, embedding) => {
      const similarity = cosineSimilarity(questionVector, embedding.vector);
      if (similarity > best.similarity) {
        return { embedding, similarity };
      } else {
        return best;
      }
    },
    { embedding: null, similarity: -Infinity }
  );

  console.log(
    `Most relevant embedding for '${question}' was found in ${
      mostSimilarEmbedding.embedding.file
    }`
  );
}