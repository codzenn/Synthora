"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  Check,
  ChevronRight,
  GitCompare,
  Layers3,
  LoaderCircle,
  MessageSquareText,
  Network,
  Sparkles,
  X,
} from "lucide-react";

const examples = [
  "How should I structure a scalable SaaS backend?",
  "Compare PostgreSQL and MongoDB for my use case",
  "Explain RAG vs. fine-tuning",
];

const models = [
  {
    id: "openai",
    name: "OpenAI",
    detail: "Independent reasoning",
    mark: "O",
    style: "bg-[#E9F7EF] text-[#17834B]",
  },
  {
    id: "claude",
    name: "Claude",
    detail: "Careful analysis",
    mark: "C",
    style: "bg-[#FBECE5] text-[#B85C37]",
  },
  {
    id: "gemini",
    name: "Gemini",
    detail: "Another perspective",
    mark: "G",
    style: "bg-[#EAEAFF] text-[#6654D9]",
  },
];

const features = [
  {
    icon: BrainCircuit,
    number: "01",
    title: "Independent perspectives",
    description:
      "The same question goes to three AI models, each bringing its own reasoning and approach.",
  },
  {
    icon: GitCompare,
    number: "02",
    title: "Meaningful comparison",
    description:
      "The judge examines agreements, contradictions, gaps, and claims that may need verification.",
  },
  {
    icon: Network,
    number: "03",
    title: "One synthesized answer",
    description:
      "Useful insights come together in a single response, with uncertainty preserved where necessary.",
  },
];

function FormattedAnswer({ content, heightClass }) {
  return (
    <div
      className={`${heightClass} overflow-y-auto overscroll-contain pr-3 text-sm leading-7 text-[#5E6076]
        [&_h1]:mb-3 [&_h1]:mt-4 [&_h1]:text-lg [&_h1]:font-bold [&_h1]:text-[#28293D]
        [&_h2]:mb-2 [&_h2]:mt-4 [&_h2]:text-base [&_h2]:font-semibold [&_h2]:text-[#28293D]
        [&_h3]:mb-2 [&_h3]:mt-3 [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:text-[#28293D]
        [&_p]:mb-3 [&_p:last-child]:mb-0
        [&_ul]:mb-3 [&_ul]:list-disc [&_ul]:pl-5
        [&_ol]:mb-3 [&_ol]:list-decimal [&_ol]:pl-5
        [&_li]:my-1
        [&_strong]:font-semibold [&_strong]:text-[#34354B]
        [&_pre]:my-3 [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:bg-[#F1F0F8] [&_pre]:p-3
        [&_code]:rounded [&_code]:bg-[#F1F0F8] [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-[13px]
        [&_pre_code]:bg-transparent [&_pre_code]:p-0
        [&_blockquote]:my-3 [&_blockquote]:border-l-2 [&_blockquote]:border-[#D6D0FF] [&_blockquote]:pl-3
        [&_a]:font-medium [&_a]:text-[#705CF0] [&_a]:underline
        [&_table]:my-3 [&_table]:w-full [&_table]:border-collapse [&_table]:text-left [&_table]:text-xs
        [&_th]:border [&_td]:border [&_th]:border-[#E8E8F1] [&_td]:border-[#E8E8F1]
        [&_th]:bg-[#F7F7FC] [&_th]:p-2 [&_td]:p-2
        [&_hr]:my-4 [&_hr]:border-[#E8E8F1]`}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children, ...props }) => (
            <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
              {children}
            </a>
          ),
        }}
      >
        {content || ""}
      </ReactMarkdown>
    </div>
  );
}

function ModelAnswerCard({ model, answer, error, loading }) {
  return (
    <article className="flex min-w-0 flex-col rounded-[20px] border border-[#E8E8F1] bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] text-sm font-bold ${model.style}`}
          >
            {model.mark}
          </span>

          <div className="min-w-0">
            <h3 className="font-semibold text-[#28293D]">{model.name}</h3>
            <p className="mt-0.5 text-xs text-[#9293A6]">{model.detail}</p>
          </div>
        </div>

        {loading ? (
          <LoaderCircle
            size={18}
            className="shrink-0 animate-spin text-[#7662ED]"
          />
        ) : answer ? (
          <span
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#EAF7EF] text-[#238750]"
            title="Response received"
          >
            <Check size={14} />
          </span>
        ) : (
          <AlertCircle size={18} className="shrink-0 text-[#D97757]" />
        )}
      </div>

      <div className="mb-3 mt-5 border-t border-[#EEEEF4]" />

      {loading ? (
        <div
          className="h-90 space-y-4 overflow-hidden pt-2"
          aria-label={`Waiting for ${model.name}`}
        >
          <div className="h-3 w-full animate-pulse rounded bg-[#F0EFF7]" />
          <div className="h-3 w-5/6 animate-pulse rounded bg-[#F0EFF7]" />
          <div className="h-3 w-4/6 animate-pulse rounded bg-[#F0EFF7]" />
          <div className="h-3 w-full animate-pulse rounded bg-[#F0EFF7]" />
          <div className="h-3 w-3/4 animate-pulse rounded bg-[#F0EFF7]" />
        </div>
      ) : answer ? (
        <FormattedAnswer content={answer} heightClass="h-[360px]" />
      ) : (
        <div className="flex h-90 items-start">
          <p className="text-sm leading-6 text-[#B45B41]">
            {error || "No response was received from this model."}
          </p>
        </div>
      )}
    </article>
  );
}

export default function Home() {
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [requestError, setRequestError] = useState("");
  const [copied, setCopied] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    const trimmedQuestion = question.trim();

    if (!trimmedQuestion || isLoading) return;

    setIsLoading(true);
    setResult(null);
    setRequestError("");
    setCopied(false);

    try {
      const response = await fetch("/api/answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: trimmedQuestion,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.error || `The request failed (${response.status}).`,
        );
      }

      setResult(data);
    } catch (error) {
      console.error("Synthora request failed:", error);

      setRequestError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  function selectExample(example) {
    setQuestion(example);
    setResult(null);
    setRequestError("");
    setCopied(false);
  }

  function clearQuestion() {
    setQuestion("");
    setResult(null);
    setRequestError("");
    setCopied(false);
  }

  async function copyFinalAnswer() {
    if (!result?.finalAnswer) return;

    try {
      await navigator.clipboard.writeText(result.finalAnswer);
      setCopied(true);
    } catch {
      setRequestError(
        "Couldn't copy the answer. Please select and copy the text manually.",
      );
    }
  }

  return (
    <main
      id="top"
      className="relative min-h-screen overflow-hidden bg-[#F8F9FC] text-[#191A2D]"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-162.5"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(123, 100, 255, 0.13), transparent 68%)",
        }}
      />

      <header className="relative z-10 border-b border-[#E9EAF1]/80 bg-white/65 backdrop-blur-xl">
        <div className="mx-auto flex h-19 max-w-300 items-center justify-between px-5 sm:px-8">
          <a href="#top" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-linear-to-br from-[#7462F6] to-[#9A84FA] text-white shadow-[0_5px_16px_rgba(116,98,246,0.25)]">
              <Layers3 size={22} strokeWidth={2.2} />
            </div>

            <div>
              <span className="block text-[19px] font-bold tracking-[-0.8px]">
                Synthora
              </span>
              <span className="block text-[10px] font-medium tracking-[1.6px] text-[#9293A7]">
                MULTI-MODEL AI
              </span>
            </div>
          </a>

          <nav className="hidden items-center gap-8 text-[13px] font-medium text-[#77798F] md:flex">
            <a href="#workspace" className="transition hover:text-[#6F5CF4]">
              Workspace
            </a>
            <a href="#how-it-works" className="transition hover:text-[#6F5CF4]">
              How it works
            </a>
          </nav>

          <a
            href="#workspace"
            className="flex items-center gap-2 rounded-xl border border-[#E6E5F0] bg-white px-3.5 py-2.5 text-[12px] font-semibold shadow-sm transition hover:border-[#C9C2FF] hover:text-[#6F5CF4] sm:px-4 sm:text-[13px]"
          >
            <Sparkles size={15} />
            <span>New question</span>
            <ArrowUpRight size={15} />
          </a>
        </div>
      </header>

      <div className="relative z-10">
        <section className="mx-auto max-w-225 px-5 pb-12 pt-17 text-center sm:px-8 sm:pt-22 sm:pb-16">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#E5E0FF] bg-white/80 px-4 py-2 text-[11px] font-bold tracking-[1.2px] text-[#7563E9] shadow-[0_3px_12px_rgba(89,76,160,0.04)] sm:text-xs">
            <Sparkles size={14} />A CLEARER WAY TO THINK WITH AI
          </div>

          <h1 className="mx-auto max-w-205 text-[42px] font-semibold leading-[1.08] tracking-[-2.4px] sm:text-[58px] lg:text-[68px]">
            One question.
            <br />
            <span className="bg-linear-to-r from-[#6858E8] via-[#8971F5] to-[#AB76DD] bg-clip-text text-transparent">
              Multiple perspectives.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-147.5 text-[15px] leading-7 text-[#77798E] sm:text-[17px] sm:leading-8">
            Three AI models. One thoughtful judge. Explore different
            perspectives and bring useful insights together.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
            {models.map((model) => (
              <div
                key={model.id}
                className="flex items-center gap-2 rounded-full border border-[#E9E9F1] bg-white/80 py-2 pl-2 pr-3.5 shadow-[0_2px_8px_rgba(20,20,50,0.025)]"
              >
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${model.style}`}
                >
                  {model.mark}
                </span>
                <span className="text-[12px] font-semibold text-[#45465D]">
                  {model.name}
                </span>
              </div>
            ))}

            <div className="flex items-center gap-2 rounded-full border border-[#E5E0FF] bg-[#F0EDFF]/70 py-2 pl-2 pr-3.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#7664EE] text-white">
                <Sparkles size={13} />
              </span>
              <span className="text-[12px] font-semibold text-[#6D59DF]">
                AI Judge
              </span>
            </div>
          </div>
        </section>

        <section
          id="workspace"
          className="mx-auto max-w-250 scroll-mt-8 px-5 sm:px-8"
        >
          <div className="rounded-[25px] border border-[#E5E5F0] bg-white p-3 shadow-[0_24px_80px_rgba(38,32,91,0.08)] sm:rounded-[30px] sm:p-5">
            <div className="rounded-[19px] bg-[#FBFBFE] p-4 sm:p-6">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EFECFF] text-[#7562ED]">
                    <MessageSquareText size={18} />
                  </div>
                  <div>
                    <h2 className="text-[14px] font-semibold tracking-[-0.2px] sm:text-[15px]">
                      What would you like to explore?
                    </h2>
                    <p className="mt-0.5 text-[11px] text-[#9293A6] sm:text-xs">
                      One question, three independent answers.
                    </p>
                  </div>
                </div>

                {question && (
                  <button
                    type="button"
                    onClick={clearQuestion}
                    disabled={isLoading}
                    aria-label="Clear question"
                    className="rounded-lg p-2 text-[#9696A8] transition hover:bg-[#EFEDFA] hover:text-[#6F5CF4] disabled:opacity-40"
                  >
                    <X size={17} />
                  </button>
                )}
              </div>

              <form onSubmit={handleSubmit}>
                <textarea
                  value={question}
                  onChange={(event) => {
                    setQuestion(event.target.value);
                    setResult(null);
                    setRequestError("");
                    setCopied(false);
                  }}
                  placeholder="Ask anything… a technical challenge, a decision, an idea worth exploring."
                  rows={4}
                  maxLength={5000}
                  disabled={isLoading}
                  aria-label="Your question"
                  className="min-h-32.5 w-full resize-y border-0 bg-transparent px-1 py-3 text-[15px] leading-7 text-[#25263D] outline-none placeholder:text-[#B2B2C2] focus:ring-0 disabled:opacity-60 sm:min-h-36.25 sm:text-[16px]"
                />

                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#ECECF3] pt-4">
                  <div className="flex items-center gap-2 text-[11px] text-[#8A8B9F] sm:text-xs">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#EBF7EF] text-[#29945B]">
                      <Check size={12} />
                    </span>
                    <span>Independent answers, evaluated together</span>
                  </div>

                  <button
                    type="submit"
                    disabled={!question.trim() || isLoading}
                    className="group flex items-center justify-center gap-2 rounded-[13px] bg-linear-to-r from-[#705CF0] to-[#8A70F5] px-4 py-3 text-[12px] font-semibold text-white shadow-[0_6px_18px_rgba(116,92,240,0.24)] transition hover:-translate-y-0.5 hover:shadow-[0_9px_22px_rgba(116,92,240,0.30)] disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:translate-y-0 sm:px-5 sm:text-[13px]"
                  >
                    {isLoading ? (
                      <>
                        <LoaderCircle size={16} className="animate-spin" />
                        Thinking...
                      </>
                    ) : (
                      <>
                        Ask Synthora
                        <ArrowRight
                          size={16}
                          className="transition-transform group-hover:translate-x-0.5"
                        />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="mt-5">
            <p className="mb-3 text-center text-[10px] font-bold tracking-[1.5px] text-[#A0A0B0] sm:text-[11px]">
              NEED SOME INSPIRATION?
            </p>

            <div className="flex flex-wrap justify-center gap-2">
              {examples.map((example) => (
                <button
                  key={example}
                  type="button"
                  disabled={isLoading}
                  onClick={() => selectExample(example)}
                  className="rounded-full border border-[#E7E7F0] bg-white/75 px-3.5 py-2.5 text-left text-[11px] text-[#77788D] shadow-[0_2px_6px_rgba(20,20,50,0.02)] transition hover:border-[#CFC7FF] hover:bg-white hover:text-[#6E5BE8] disabled:opacity-50 sm:text-xs"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>

          {requestError && (
            <div
              role="alert"
              className="mt-6 flex items-start gap-3 rounded-2xl border border-[#F2D4CC] bg-[#FFF7F4] p-4 text-sm text-[#9E4933]"
            >
              <AlertCircle size={19} className="mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold">
                  We couldn&apos;t complete the request
                </p>
                <p className="mt-1 leading-6">{requestError}</p>
              </div>
            </div>
          )}

          {(isLoading || result) && (
            <section aria-live="polite" className="mt-12 scroll-mt-8">
              <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-[10px] font-bold tracking-[1.8px] text-[#8170ED]">
                    MODEL RESPONSES
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-[-0.8px] sm:text-3xl">
                    Three perspectives
                  </h2>
                </div>

                <p className="text-xs text-[#9293A6]">
                  {isLoading
                    ? "Waiting for the models and judge..."
                    : "Scroll within each card to read the full answer."}
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {models.map((model) => (
                  <ModelAnswerCard
                    key={model.id}
                    model={model}
                    answer={result?.answers?.[model.id]}
                    error={result?.errors?.[model.id]}
                    loading={isLoading}
                  />
                ))}
              </div>

              {result?.finalAnswer && (
                <section className="mt-8 overflow-hidden rounded-3xl border border-[#DFDAFF] bg-white shadow-[0_16px_45px_rgba(51,40,120,0.07)]">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EBE8FF] bg-linear-to-r from-[#F3F0FF] to-[#FCF9FF] px-5 py-5 sm:px-7">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-[#7763EE] text-white shadow-[0_5px_14px_rgba(119,99,238,0.22)]">
                        <Sparkles size={21} />
                      </div>

                      <div>
                        <p className="text-[10px] font-bold tracking-[1.5px] text-[#7867E9]">
                          SYNTHORA SYNTHESIS
                        </p>
                        <h2 className="mt-1 text-lg font-semibold tracking-[-0.4px]">
                          Your consolidated answer
                        </h2>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={copyFinalAnswer}
                      className="flex items-center gap-2 rounded-xl border border-[#E4DFFF] bg-white px-3.5 py-2.5 text-xs font-semibold text-[#6D5ADB] transition hover:border-[#BEB3FF]"
                    >
                      {copied ? <Check size={15} /> : <Layers3 size={15} />}
                      {copied ? "Copied" : "Copy answer"}
                    </button>
                  </div>

                  <div className="p-5 sm:p-7">
                    <div className="rounded-xl border border-[#EEEEF4] bg-[#FCFCFF] p-4 sm:p-5">
                      <FormattedAnswer
                        content={result.finalAnswer}
                        heightClass="h-[560px]"
                      />
                    </div>

                    {result.judgeError && (
                      <div className="mt-6 flex items-start gap-2 rounded-xl border border-[#F1DDC9] bg-[#FFFAF3] p-4 text-sm text-[#986337]">
                        <AlertCircle size={18} className="mt-0.5 shrink-0" />
                        <p>{result.judgeError}</p>
                      </div>
                    )}

                    <p className="mt-7 border-t border-[#EEEEF4] pt-4 text-xs leading-5 text-[#9293A6]">
                      Synthora combines model responses, but the synthesis is
                      not an independent guarantee of factual accuracy. Verify
                      important claims using reliable sources.
                    </p>
                  </div>
                </section>
              )}

              {result && !result.finalAnswer && result.judgeError && (
                <div className="mt-6 rounded-2xl border border-[#F1DDC9] bg-[#FFFAF3] p-4 text-sm leading-6 text-[#986337]">
                  The individual model responses are shown above, but the judge
                  could not produce a consolidated answer: {result.judgeError}
                </div>
              )}
            </section>
          )}
        </section>

        <section
          id="how-it-works"
          className="mx-auto max-w-275 scroll-mt-10 px-5 pb-20 pt-24 sm:px-8 sm:pt-28"
        >
          <div className="mx-auto mb-10 max-w-142.5 text-center">
            <div className="mb-3 text-[10px] font-bold tracking-[2px] text-[#8170ED] sm:text-[11px]">
              THE SYNTHORA METHOD
            </div>

            <h2 className="text-[30px] font-semibold tracking-[-1.3px] sm:text-[40px]">
              More perspectives.
              <br />
              <span className="text-[#89889B]">More clarity.</span>
            </h2>

            <p className="mt-4 text-[13px] leading-6 text-[#89899D] sm:text-sm">
              Compare different approaches and bring useful insights together
              while keeping meaningful disagreements visible.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.number}
                  className="group rounded-[22px] border border-[#E8E8F1] bg-white/80 p-6 transition duration-200 hover:-translate-y-1 hover:border-[#D5CEFF] hover:shadow-[0_16px_35px_rgba(41,33,100,0.06)] sm:p-7"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-[#F0EDFF] text-[#7662ED] transition group-hover:bg-[#7662ED] group-hover:text-white">
                      <Icon size={21} />
                    </div>
                    <span className="text-xs font-semibold tracking-[1px] text-[#C1BFD1]">
                      {feature.number}
                    </span>
                  </div>

                  <h3 className="mt-6 text-[16px] font-semibold tracking-[-0.3px] text-[#28293D]">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-[13px] leading-6 text-[#85869A]">
                    {feature.description}
                  </p>

                  <div className="mt-5 flex items-center gap-1 text-xs font-semibold text-[#7867E9] opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100">
                    The workflow
                    <ChevronRight size={14} />
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <footer className="border-t border-[#E8E8F0] bg-white/55">
          <div className="mx-auto flex max-w-300 flex-col items-center justify-between gap-3 px-5 py-7 text-center sm:flex-row sm:px-8 sm:text-left">
            <a href="#top" className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#7662ED] text-white">
                <Layers3 size={15} />
              </div>
              <span className="text-sm font-bold tracking-[-0.4px]">
                Synthora
              </span>
            </a>

            <p className="text-[11px] text-[#9898A9]">
              Built to bring perspectives together, not hide uncertainty.
            </p>

            <a
              href="#workspace"
              className="flex items-center gap-1.5 text-xs font-semibold text-[#77748D] transition hover:text-[#6E5BE8]"
            >
              Back to workspace
              <ArrowUpRight size={14} />
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
}
