"use client";

import { useState, useRef, useEffect } from "react";

// Re-including icons here to ensure the component is copy-paste ready.
// If you have them in 'components/icons.tsx', you can switch back to your import.
const ChatIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);
const XIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const SendIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
  sources?: string[]; // Added optional field for RAG sources
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm Surya's AI assistant. Ask me anything about his experience, projects, or skills!",
      sender: "bot",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // 1. Add User Message
    const userMessage: Message = {
      id: Date.now(),
      text: input,
      sender: "user",
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // 2. Call your Next.js API Route
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      // 3. Add Bot Response with Sources
      const botMessage: Message = {
        id: Date.now() + 1,
        text: data.text || "Sorry, I couldn't generate a response.",
        sender: "bot",
        sources: data.sources, // Array of source strings
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: "I'm having trouble connecting to the server. Please try again later.",
        sender: "bot",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* CHAT WINDOW */}
      {isOpen && (
        <div className="mb-4 w-[350px] h-[500px] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-700 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-amber-500 p-4 flex justify-between items-center text-white shadow-md">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
              <h3 className="font-bold text-lg">Surya&apos;s Assistant</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-amber-600 p-1 rounded-full transition"
            >
              <XIcon />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-slate-800">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm ${
                    msg.sender === "user"
                      ? "bg-amber-500 text-white rounded-br-none"
                      : "bg-white dark:bg-slate-700 dark:text-gray-100 text-gray-800 border border-gray-100 dark:border-slate-600 rounded-bl-none"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>

                {/* Display Sources if available (Only for Bot) */}
                {msg.sender === "bot" &&
                  msg.sources &&
                  msg.sources.length > 0 && (
                    <div className="mt-1 max-w-[85%] text-xs text-gray-500 dark:text-gray-400 pl-2">
                      <p className="font-semibold mb-1">Sources:</p>
                      <ul className="list-disc pl-4 space-y-1">
                        {msg.sources.map((source, idx) => (
                          <li key={idx} className="italic opacity-80">
                            &quot;{source.slice(0, 60)}...&quot;
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-slate-700 p-3 rounded-2xl rounded-bl-none shadow-sm border border-gray-100 dark:border-slate-600">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form
            onSubmit={handleSend}
            className="p-4 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-700"
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Surya's skills..."
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-full focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 dark:bg-slate-800 dark:text-white"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="p-2 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              >
                <SendIcon />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* LAUNCHER BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 ${
          isOpen ? "bg-red-500 rotate-90" : "bg-amber-500 hover:bg-amber-600"
        } text-white flex items-center justify-center`}
      >
        {isOpen ? <XIcon /> : <ChatIcon />}
      </button>
    </div>
  );
}
