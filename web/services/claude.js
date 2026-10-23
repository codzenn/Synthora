import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export async function getClaudeAnswer(question) {
  const message = await client.messages.create({
    model: process.env.CLAUDE_MODEL,
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: question,
      },
    ],
  });

  return message.content
    .filter((block) => block.type === "text")
    .map((block) => block.text)
    .join("\n");
}
