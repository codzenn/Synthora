import "dotenv/config";
import { stdin, stdout } from "node:process";
import { createInterface } from "node:readline/promises";

import { getClaudeAnswer } from "./services/claude.js";
import { getGeminiAnswer } from "./services/gemini.js";
import { judgeAnswers } from "./services/judge.js";
import { getOpenAIAnswer } from "./services/openai.js";

const rl = createInterface({
  input: stdin,
  output: stdout,
});

try {
  const userQuestion = (await rl.question("Ask your question: ")).trim();

  if (!userQuestion) {
    console.log("Please enter a question.");
  } else {
    console.log("\nGetting answers from all three models...\n");

    const results = await Promise.allSettled([
      getOpenAIAnswer(userQuestion),
      getClaudeAnswer(userQuestion),
      getGeminiAnswer(userQuestion),
    ]);

    const providers = ["openai", "claude", "gemini"];
    const answers = {};

    results.forEach((result, index) => {
      const provider = providers[index];

      if (result.status === "fulfilled") {
        answers[provider] = result.value;

        console.log(`\n--- ${provider.toUpperCase()} ---\n`);
        console.log(result.value);
      } else {
        answers[provider] = null;

        console.error(
          `\n${provider.toUpperCase()} request failed:`,
          result.reason?.message ?? result.reason,
        );
      }
    });

    const successfulAnswers = Object.values(answers).filter(
      (answer) => typeof answer === "string" && answer.trim().length > 0,
    );

    if (successfulAnswers.length === 0) {
      console.error(
        "\nAll model requests failed or returned empty answers. Cannot generate a final answer.",
      );
    } else {
      console.log("\nSynthora is evaluating the answers...\n");

      const finalAnswer = await judgeAnswers(userQuestion, answers);

      console.log("\n========== SYNTHORA FINAL ANSWER ==========\n");
      console.log(finalAnswer);
    }
  }
} catch (error) {
  console.error("\nSomething went wrong:", error.message ?? error);
} finally {
  rl.close();
}
