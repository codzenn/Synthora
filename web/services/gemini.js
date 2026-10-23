import { GoogleGenAI } from "@google/genai";

const client = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function getGeminiAnswer(question) {
  const start = Date.now();

  try {
    const response = await client.models.generateContent({
      model: process.env.GEMINI_MODEL,
      contents: question,
      config: {
        maxOutputTokens: 1024,
      },
    });

    const answer = response.text;

    if (!answer || !answer.trim()) {
      throw new Error("Gemini returned an empty response.");
    }

    return answer;
  } finally {
    console.info(
      `[Synthora timing] Gemini service completed in ${Date.now() - start} ms`,
    );
  }
}
