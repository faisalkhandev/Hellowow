// app/chat/page.tsx
"use client";

import { sendMessage } from "@/actions/intellihub/chataction";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm Nifa AI, your friendly assistant. I'm here to help you with any questions or tasks you have. How can I assist you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);





  // Save messages to session storage
  useEffect(() => {
    if (messages.length > 1) {
      sessionStorage.setItem("nifa-chat-messages", JSON.stringify(messages));
    }
  }, [messages]);

  // Load messages from session storage
  useEffect(() => {
    const savedMessages = sessionStorage.getItem("nifa-chat-messages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);

    // Optimistically add user message
    setMessages((prev) => [...prev, { role: "user", content: input.trim() }]);
    setInput("");

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    try {
      const { message, error: sendError } = await sendMessage(
        input.trim(),
        messages
      );

      if (sendError) {
        setError(sendError);
        setMessages((prev) => prev.slice(0, -1));
      } else if (message) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: message },
        ]);
      }
    } catch (err) {
      setError("Failed to send message. Please try again.");
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
    setInput(textarea.value);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-70px)] dark:bg-gray-900 text-paragraph p-4 ">
    

      {/* Chat Messages */}
        <div className="max-w-3xl mx-auto space-y-4 overflow-y-auto  invisible-scrollbar  h-[calc(100vh-90px)] p-2">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-2 lg:p-4  rounded-lg hover:bg-opacity-90 transition-colors text-heading  whitespace-pre-line  font-poppin ${
                message.role === "assistant" ? "bg-[#BCE6FF] dark:bg-gray-800" : "bg-[#53A7D8] dark:bg-gray-700"
              }`}
            >


              <div className="flex items-center justify-start gap-2 mb-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
                    message.role === "assistant"
                      ? "bg-blue-600 font-semibold"
                      : "bg-gray-600"
                  }`}
                >
                  {message.role === "assistant" ? "N" : "U"}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="text-sm font-medium text-heading">
                    {message.role === "assistant" ? "Nifa AI" : "You"}
                  </div>
                  </div>
                  </div>
                  <div className="whitespace-pre-wrap break-all lg:ml-2 ">{message.content}</div>
                
                <button
                  onClick={() => navigator.clipboard.writeText(message.content)}
                  className="opacity-0 hover:opacity-100 transition-opacity p-2 hover:bg-gray-400 rounded "
                  title="Copy message"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                </button>
              </div>

          ))}
          <div ref={messagesEndRef} />
        </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-900/50 text-red-200 text-center">
          {error}
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="relative w-full max-w-3xl mx-auto self-end">
  <div className="flex items-center border-none">
    <textarea
      ref={textareaRef}
      rows={1}
      value={input}
      onChange={handleTextareaInput}
      onKeyDown={handleKeyDown}
      placeholder="Message Nifa AI..."
      className="flex-1 h-14 rounded-xl pr-14 p-2 w-full invisible-scrollbar border-transparent resize-none"
      disabled={isLoading}
    />

    <Button
      type="submit"
      disabled={isLoading || !input.trim()}
      className="p-4 ml-2 h-12 self-end  rounded-full disabled:opacity-50 cursor-pointer"
    >
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
    </Button>
  </div>

  {isLoading && (
    <div className="mt-2 text-center text-sm text-gray-400">
      Nifa is thinking...
    </div>
  )}
</form>
    </div>
  );
}
