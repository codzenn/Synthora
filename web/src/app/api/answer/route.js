import { getOpenAIAnswer } from "../../../../services/openai.js";
import { getClaudeAnswer } from "../../../../services/claude.js";
import { getGeminiAnswer } from "../../../../services/gemini.js";
import { judgeAnswers } from "../../../../services/judge.js";

// Measure and log the execution time of an individual operation.
async function timedCall(name, operation) {
  const start = Date.now();

  try {
    const result = await operation();

    console.info(`[Synthora timing] ${name}: ${Date.now() - start} ms`);

    return result;
  } catch (error) {
    console.error(
      `[Synthora timing] ${name} failed after ${Date.now() - start} ms`,
      error,
    );

    throw error;
  }
}

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return Response.json(
      { error: "The request body must be valid JSON." },
      { status: 400 },
    );
  }

  const question =
    typeof body?.question === "string" ? body.question.trim() : "";

  if (!question) {
    return Response.json(
      { error: "Please provide a question." },
      { status: 400 },
    );
  }

  if (question.length > 5000) {
    return Response.json(
      { error: "Your question must be 5,000 characters or fewer." },
      { status: 413 },
    );
  }

  const requestStart = Date.now();

  // Run all three model requests concurrently.
  const results = await Promise.allSettled([
    timedCall("OpenAI", () => getOpenAIAnswer(question)),
    timedCall("Claude", () => getClaudeAnswer(question)),
    timedCall("Gemini", () => getGeminiAnswer(question)),
  ]);

  const providers = ["openai", "claude", "gemini"];

  const answers = {
    openai: null,
    claude: null,
    gemini: null,
  };

  const errors = {};

  results.forEach((result, index) => {
    const provider = providers[index];

    if (
      result.status === "fulfilled" &&
      typeof result.value === "string" &&
      result.value.trim().length > 0
    ) {
      answers[provider] = result.value;
    } else {
      errors[provider] = "This model could not provide an answer.";

      if (result.status === "rejected") {
        // Detailed errors stay on the server.
        console.error(`[Synthora] ${provider} request failed:`, result.reason);
      }
    }
  });

  const successfulAnswers = Object.values(answers).filter(
    (answer) => typeof answer === "string" && answer.trim().length > 0,
  );

  if (successfulAnswers.length === 0) {
    console.info(
      `[Synthora timing] Total server processing: ${
        Date.now() - requestStart
      } ms`,
    );

    return Response.json(
      {
        error: "All three models failed to respond. Please try again.",
        errors,
      },
      { status: 502 },
    );
  }

  let finalAnswer = null;
  let judgeError = null;

  // Ask the judge to synthesize the successful model answers.
  try {
    finalAnswer = await timedCall("Judge", () =>
      judgeAnswers(question, answers),
    );

    if (typeof finalAnswer !== "string" || finalAnswer.trim().length === 0) {
      finalAnswer = null;
      judgeError = "The judge returned an empty answer.";
    }
  } catch (error) {
    console.error("[Synthora] Judge failed:", error);

    judgeError =
      "The model answers are available, but the judge could not synthesize them.";
  }

  console.info(
    `[Synthora timing] Total server processing: ${
      Date.now() - requestStart
    } ms`,
  );

  return Response.json({
    question,
    answers,
    finalAnswer,
    errors,
    judgeError,
  });
}
