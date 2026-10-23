import OpenAI from "openai";

const client = new OpenAI();

export async function getOpenAIAnswer(question) {
  const response = await client.responses.create({
    model: process.env.OPENAI_MODEL,
    input: question,
  });

  return response.output_text;
}
