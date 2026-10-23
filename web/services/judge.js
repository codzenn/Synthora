import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export async function judgeAnswers(question, answers) {
  const model = process.env.JUDGE_MODEL;

  const prompt = `
You are the judge for Synthora, a multi-model AI answer aggregation system.

ORIGINAL QUESTION:
${question}

ANSWERS FROM THE MODELS:
${JSON.stringify(answers, null, 2)}

YOUR TASK:
Evaluate the available answers and synthesize the most useful response.

Rules:
1. Prioritize correctness, relevance, and completeness.
2. Identify meaningful disagreements and unsupported claims.
3. Never assume a claim is correct simply because multiple models agree.
4. Do not invent facts or imply that you independently verified claims.
5. Acknowledge uncertainty only when it materially affects the answer.
6. Avoid repeating the same information.
7. Keep the complete response concise: aim for 150–220 words.
8. Use Markdown headings and bullet points only when they improve readability.
9. Do not reproduce the three answers individually.
10. Finish every sentence and every list item. Never end mid-sentence or mid-word.

REQUIRED ENDING:
Finish with a clearly labeled "Bottom line:" followed by one complete sentence
that directly answers the original question.

Before returning your response, check that the Bottom line is complete,
ends with appropriate punctuation, and does not introduce unfinished text.

Return only the final synthesized response.
`;

  const message = await client.messages.create({
    model,
    max_tokens: 3072,
    output_config: {
      effort: "low",
    },
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const finalAnswer = message.content
    .filter((block) => block.type === "text")
    .map((block) => block.text)
    .join("\n")
    .trim();

  // Log metadata to diagnose incomplete responses.
  console.info("[Synthora judge]", {
    model,
    stopReason: message.stop_reason,
    outputTokens: message.usage?.output_tokens,
    answerLength: finalAnswer.length,
  });

  if (message.stop_reason === "max_tokens") {
    console.warn(
      "[Synthora judge] Output-token limit reached. The answer may be incomplete.",
    );
  }

  if (!finalAnswer) {
    throw new Error("The judge returned an empty response.");
  }

  return finalAnswer;
}
