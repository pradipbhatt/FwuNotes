import { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { AiOutlineRobot, AiOutlineClose, AiOutlineSend } from "react-icons/ai";
import { HiSparkles, HiChatAlt2 } from "react-icons/hi";
import { GEMINI_API_KEY } from "../../config";

const MODEL = "gemini-2.0-flash-lite";

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map(i => (
        <span
          key={i}
          className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );
}

function MessageBubble({ message }) {
  const isUser = message.from === "user";
  const isError = message.isError;

  return (
    <div className={`flex items-end gap-2 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      {/* Avatar */}
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center shrink-0 mb-0.5">
          <AiOutlineRobot className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        </div>
      )}
      {isUser && message.image && (
        <img src={message.image} alt="You" className="w-7 h-7 rounded-full object-cover shrink-0 mb-0.5" />
      )}

      {/* Bubble */}
      <div
        className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap break-words ${
          isUser
            ? "bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900 rounded-br-sm"
            : isError
            ? "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800 rounded-bl-sm"
            : "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 border border-gray-100 dark:border-gray-600 rounded-bl-sm shadow-sm"
        }`}
      >
        {message.text}
      </div>
    </div>
  );
}

function Chat() {
  const [userData, setUserData] = useState({});
  const [question, setQuestion]   = useState("");
  const [messages, setMessages]   = useState([]);
  const [thinking, setThinking]   = useState(false);
  const [open, setOpen]           = useState(false);

  const bottomRef       = useRef(null);
  const inputRef        = useRef(null);
  const chatRef         = useRef(null);

  useEffect(() => {
    try {
      setUserData(JSON.parse(localStorage.getItem("Users") ?? "{}") || {});
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking]);

  // Focus input when chat opens
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (chatRef.current && !chatRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const send = async (e) => {
    e?.preventDefault();
    const text = question.trim();
    if (!text || thinking) return;

    setMessages(prev => [...prev, { text, from: "user", image: userData.userImage }]);
    setQuestion("");
    setThinking(true);

    try {
      if (!GEMINI_API_KEY) throw new Error("AI service key is not configured.");

      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: MODEL });
      const result = await model.generateContent(
        `You are an academic assistant for Far Western University School of Engineering students. Answer clearly and helpfully.\n\nQuestion: ${text}`
      );
      const reply = result.response.text() || "Sorry, I couldn't generate a response.";
      setMessages(prev => [...prev, { text: reply, from: "ai" }]);
    } catch (err) {
      let msg = "Something went wrong. Please try again.";
      const raw = err?.message ?? "";
      if (raw.includes("quota") || raw.includes("RESOURCE_EXHAUSTED")) {
        msg = "Rate limit reached. Please wait a moment and try again.";
      } else if (raw.includes("not found") || raw.includes("404")) {
        msg = "AI model unavailable. Please try again later.";
      } else if (raw.includes("API key") || raw.includes("not configured")) {
        msg = "AI service is not configured. Contact the admin.";
      }
      setMessages(prev => [...prev, { text: msg, from: "ai", isError: true }]);
    }

    setThinking(false);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) send(e);
  };

  return (
    <div className="relative z-50">
      {/* Toggle FAB */}
      <button
        onClick={() => setOpen(v => !v)}
        className="fixed bottom-16 right-3 sm:bottom-6 flex items-center gap-2 px-4 py-2.5 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all text-sm font-semibold z-50"
        aria-label="Toggle AI chat"
      >
        <HiChatAlt2 className="w-4 h-4" />
        Ask AI
      </button>

      {/* Chat panel */}
      {open && (
        <div
          ref={chatRef}
          className="fixed bottom-28 sm:bottom-20 right-3 w-[calc(100vw-24px)] sm:w-96 max-h-[70vh] bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                <AiOutlineRobot className="w-4 h-4 text-gray-700 dark:text-gray-200" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 leading-tight">FWU AI Assistant</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">Powered by Gemini</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              aria-label="Close"
            >
              <AiOutlineClose className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full gap-3 py-8 text-center">
                <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <HiSparkles className="w-6 h-6 text-amber-500" />
                </div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">FWU AI Assistant</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 max-w-[200px]">
                  Ask anything about your courses, exams, or study materials.
                </p>
              </div>
            )}
            {messages.map((msg, i) => (
              <MessageBubble key={i} message={msg} />
            ))}
            {thinking && (
              <div className="flex items-end gap-2">
                <div className="w-7 h-7 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center shrink-0">
                  <AiOutlineRobot className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </div>
                <div className="bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-2xl rounded-bl-sm shadow-sm">
                  <TypingDots />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={send}
            className="flex items-center gap-2 px-3 py-3 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700"
          >
            <input
              ref={inputRef}
              type="text"
              placeholder="Ask a question…"
              value={question}
              onChange={e => setQuestion(e.target.value)}
              onKeyDown={handleKey}
              disabled={thinking}
              className="flex-1 px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 border-0 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500 disabled:opacity-50 transition"
            />
            <button
              type="submit"
              disabled={thinking || !question.trim()}
              className="w-9 h-9 rounded-xl bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 flex items-center justify-center hover:opacity-80 disabled:opacity-30 disabled:cursor-not-allowed transition-all shrink-0"
              aria-label="Send"
            >
              <AiOutlineSend className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Chat;
