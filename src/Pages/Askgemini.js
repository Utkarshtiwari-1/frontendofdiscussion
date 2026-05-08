import React, { useMemo, useState } from "react";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  FiArrowUpRight,
  FiBookOpen,
  FiCheck,
  FiClipboard,
  FiCode,
  FiCopy,
  FiMessageSquare,
  FiRefreshCcw,
  FiSend,
  FiZap,
} from "react-icons/fi";
import { GenerateResponse } from "../service/operations";
import geminiimage from "../images/google-bard-gemini-v2.webp";

const promptIdeas = [
  {
    icon: FiBookOpen,
    label: "Explain",
    prompt: "Explain this topic with simple examples and a short summary: ",
  },
  {
    icon: FiCode,
    label: "Debug",
    prompt: "Debug this code and explain the issue step by step:\n\n",
  },
  {
    icon: FiMessageSquare,
    label: "Improve",
    prompt: "Improve this answer so it is clear, structured, and practical:\n\n",
  },
];

const starterQuestions = [
  "Create a roadmap to learn React hooks in 7 days.",
  "Explain closures in JavaScript with one real example.",
  "Write a strong answer for a discussion question about REST APIs.",
];

function structureMarkdown(value) {
  const text = String(value || "")
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  if (!text) {
    return "";
  }

  const hasMarkdownStructure = /(^#{1,6}\s)|(^[-*]\s)|(^\d+\.\s)|(```)|(\|.+\|)/m.test(text);

  if (hasMarkdownStructure) {
    return text;
  }

  const paragraphs = text
    .split(/\n{2,}/)
    .map((item) => item.trim())
    .filter(Boolean);

  if (paragraphs.length > 1) {
    return `## Answer\n\n${paragraphs.join("\n\n")}`;
  }

  const sentences = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [text];
  const formattedSentences = sentences.map((sentence) => sentence.trim()).filter(Boolean);

  if (formattedSentences.length <= 2) {
    return `## Answer\n\n${text}`;
  }

  const intro = formattedSentences.slice(0, 2).join(" ");
  const points = formattedSentences.slice(2).map((sentence) => `- ${sentence}`).join("\n");

  return `## Answer\n\n${intro}\n\n## Key Points\n\n${points}`;
}

export const Askgemini = () => {
  const [prompt, setPrompt] = useState("");
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [copied, setCopied] = useState(false);

  const structuredResponse = useMemo(() => structureMarkdown(response), [response]);
  const characterCount = prompt.trim().length;

  async function submithandler(customPrompt) {
    const nextPrompt = (customPrompt ?? prompt).trim();

    if (nextPrompt.length === 0) {
      toast.error("Please enter a query");
      return;
    }

    setQuestion(nextPrompt);
    setLoading(true);
    setResponse("");
    setCopied(false);

    if (!customPrompt) {
      setPrompt("");
    }

    try {
      const result = await GenerateResponse(nextPrompt);

      if (!result) {
        toast.error("Something went wrong");
        return;
      }

      setResponse(result);
    } catch (error) {
      console.log(error);
      toast.error("Failed to generate response");
    } finally {
      setLoading(false);
    }
  }

  async function copyResponse() {
    if (!structuredResponse) {
      return;
    }

    try {
      await navigator.clipboard.writeText(structuredResponse);
      setCopied(true);
      toast.success("Response copied");
      setTimeout(() => setCopied(false), 1600);
    } catch (error) {
      toast.error("Copy failed");
    }
  }

  function handleKeyDown(event) {
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
      submithandler();
    }
  }

  return (
    <div className="min-h-screen w-full bg-[#f7f8fb] text-slate-950">
      <section className="mx-auto grid min-h-screen w-full max-w-7xl grid-cols-1 gap-0 px-4 py-6 sm:px-6 lg:grid-cols-[390px_minmax(0,1fr)] lg:px-8 lg:py-8">
        <aside className="flex min-h-[520px] flex-col border border-slate-200 bg-white shadow-xl shadow-slate-200/70 lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)]">
          <div className="border-b border-slate-100 p-5">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                <img src={geminiimage} alt="Gemini" className="h-full w-full object-cover" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-700">AI Assistant</p>
                <h1 className="text-2xl font-black text-slate-950">Ask Gemini</h1>
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-5 overflow-y-auto p-5">
            <div>
              <label htmlFor="gemini-prompt" className="text-sm font-bold text-slate-800">
                Your question
              </label>
              <div className="mt-3 border border-slate-200 bg-slate-50 p-3 focus-within:border-cyan-500 focus-within:ring-4 focus-within:ring-cyan-100">
                <textarea
                  id="gemini-prompt"
                  value={prompt}
                  onChange={(event) => setPrompt(event.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask for an explanation, summary, code help, writing polish..."
                  className="min-h-[210px] w-full resize-none bg-transparent text-sm leading-6 text-slate-800 outline-none placeholder:text-slate-400"
                />
                <div className="mt-3 flex items-center justify-between border-t border-slate-200 pt-3">
                  <span className="text-xs font-medium text-slate-500">{characterCount} chars</span>
                  <button
                    type="button"
                    onClick={() => submithandler()}
                    disabled={loading}
                    className="inline-flex h-10 items-center gap-2 bg-slate-950 px-4 text-sm font-bold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                  >
                    {loading ? <FiRefreshCcw className="animate-spin" /> : <FiSend />}
                    Send
                  </button>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm font-bold text-slate-800">Quick modes</p>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {promptIdeas.map(({ icon: Icon, label, prompt: idea }) => (
                  <button
                    type="button"
                    key={label}
                    onClick={() => setPrompt(idea)}
                    className="flex min-h-[78px] flex-col items-center justify-center gap-2 border border-slate-200 bg-white px-2 text-xs font-bold text-slate-700 transition hover:border-cyan-500 hover:bg-cyan-50"
                  >
                    <Icon className="text-lg text-cyan-700" />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-bold text-slate-800">Try one</p>
              <div className="mt-3 space-y-2">
                {starterQuestions.map((item) => (
                  <button
                    type="button"
                    key={item}
                    onClick={() => submithandler(item)}
                    className="group flex w-full items-start justify-between gap-3 border border-slate-200 bg-white p-3 text-left text-sm font-medium leading-5 text-slate-700 transition hover:border-emerald-500 hover:bg-emerald-50"
                  >
                    <span>{item}</span>
                    <FiArrowUpRight className="mt-1 shrink-0 text-slate-400 transition group-hover:text-emerald-700" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <main className="min-h-[640px] border-x border-b border-slate-200 bg-white shadow-xl shadow-slate-200/70 lg:border-l-0 lg:border-t">
          <div className="flex min-h-full flex-col">
            <header className="border-b border-slate-100 px-5 py-4 sm:px-7">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-700">Structured output</p>
                  <h2 className="mt-1 text-xl font-black text-slate-950 sm:text-2xl">Clean answers, readable markdown</h2>
                </div>
                <button
                  type="button"
                  onClick={copyResponse}
                  disabled={!structuredResponse}
                  className="inline-flex h-10 items-center justify-center gap-2 border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 transition hover:border-slate-950 hover:text-slate-950 disabled:cursor-not-allowed disabled:text-slate-300"
                >
                  {copied ? <FiCheck className="text-emerald-600" /> : <FiCopy />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </header>

            <div className="flex-1 p-4 sm:p-7">
              {question && (
                <div className="mb-5 flex justify-end">
                  <div className="max-w-3xl bg-slate-950 px-5 py-4 text-sm leading-6 text-white shadow-lg shadow-slate-200 sm:text-base">
                    {question}
                  </div>
                </div>
              )}

              {loading ? (
                <div className="border border-cyan-100 bg-cyan-50 p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center bg-white text-cyan-700 shadow-sm">
                      <FiZap className="animate-pulse text-xl" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">Gemini is shaping the response</p>
                      <p className="text-sm text-slate-600">Formatting headings, lists, code blocks, and useful sections.</p>
                    </div>
                  </div>
                  <div className="mt-5 space-y-3">
                    <div className="h-3 w-11/12 animate-pulse bg-cyan-100" />
                    <div className="h-3 w-9/12 animate-pulse bg-cyan-100" />
                    <div className="h-3 w-10/12 animate-pulse bg-cyan-100" />
                  </div>
                </div>
              ) : structuredResponse ? (
                <article className="gemini-answer prose prose-slate max-w-none">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      a: ({ children, ...props }) => (
                        <a {...props} target="_blank" rel="noreferrer">
                          {children}
                        </a>
                      ),
                      table: ({ children }) => (
                        <div className="my-5 overflow-x-auto border border-slate-200">
                          <table>{children}</table>
                        </div>
                      ),
                      code: ({ inline, children, ...props }) =>
                        inline ? (
                          <code {...props}>{children}</code>
                        ) : (
                          <pre className="overflow-x-auto bg-slate-950 p-4 text-slate-50">
                            <code {...props}>{children}</code>
                          </pre>
                        ),
                    }}
                  >
                    {structuredResponse}
                  </ReactMarkdown>
                </article>
              ) : (
                <div className="grid min-h-[520px] place-items-center border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
                  <div className="max-w-md">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center bg-white text-cyan-700 shadow-sm">
                      <FiClipboard className="text-3xl" />
                    </div>
                    <h3 className="mt-5 text-2xl font-black text-slate-950">Ready when you are</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      Ask a detailed question and the answer will render with headings, lists, tables, and code blocks when Gemini returns them.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </section>
    </div>
  );
};
