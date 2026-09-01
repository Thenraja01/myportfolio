"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Sparkles, User } from "lucide-react";

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showToast, setShowToast] = useState(true);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "1",
      sender: "sakura",
      text: "Hello! 👋 I'm **Sakura**, Thenraja's AI Assistant. Ask me anything about his projects, skills, experience, or background!",
      time: "Just now",
    },
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  // Re-trigger toast popup every 5 minutes (300,000 ms)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isOpen) {
        setShowToast(true);
      }
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setShowToast(false);
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const handleSendMessage = async (textToSend) => {
    const text = (textToSend || inputMessage).trim();
    if (!text) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: "user",
      text: text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputMessage("");
    setIsTyping(true);

    try {
      const apiPayload = {
        userMessage: text,
        messages: updatedMessages.map((m) => ({
          role: m.sender === "user" ? "user" : "assistant",
          content: m.text,
        })),
      };

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(apiPayload),
      });

      if (!res.ok) throw new Error(`Server returned status ${res.status}`);

      const data = await res.json();
      const botMsg = {
        id: (Date.now() + 1).toString(),
        sender: "sakura",
        text: data.reply || "I am Sakura, here to answer questions about Thenraja's portfolio!",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.warn("Chat API call failed:", err);
      const botMsg = {
        id: (Date.now() + 1).toString(),
        sender: "sakura",
        text: "I am Sakura, here to help answer any questions about Thenraja's portfolio, skills, and projects!",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Trigger Button Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {/* Recurring toast popup every 5 mins */}
        <AnimatePresence>
          {!isOpen && showToast && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              onClick={() => {
                setIsOpen(true);
                setShowToast(false);
              }}
              className="mb-3 cursor-pointer select-none whitespace-nowrap"
            >
              <div className="relative px-3.5 py-2.5 rounded-2xl bg-white/90 dark:bg-slate-900/95 border border-indigo-200/80 dark:border-indigo-500/50 text-slate-900 dark:text-slate-100 font-sans text-xs font-bold shadow-2xl shadow-indigo-100/60 dark:shadow-indigo-950/80 backdrop-blur-xl flex items-center gap-2 group hover:border-indigo-400 transition-all">
                <Sparkles size={14} className="text-amber-500 dark:text-amber-400 animate-pulse" />
                <span>Hey! I can help you — Sakura</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowToast(false);
                  }}
                  className="ml-1 text-slate-400 hover:text-slate-900 dark:hover:text-white p-0.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  aria-label="Close toast"
                >
                  <X size={12} />
                </button>

                {/* Speech Bubble Tail */}
                <div className="absolute -bottom-1.5 right-7 w-3 h-3 bg-white dark:bg-slate-900 border-r border-b border-indigo-200/80 dark:border-indigo-500/50 rotate-45" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setIsOpen(!isOpen);
            if (!isOpen) setShowToast(false);
          }}
          aria-label="Toggle Sakura AI Assistant"
          className="relative group p-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-2xl shadow-indigo-500/30 border border-indigo-400/40 flex items-center justify-center backdrop-blur-xl cursor-pointer"
        >
          {/* Ambient Glow */}
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 opacity-50 blur-lg group-hover:opacity-100 transition-opacity" />

          <div className="relative z-10 flex items-center gap-2 font-mono text-xs font-bold">
            {isOpen ? (
              <X size={24} />
            ) : (
              <>
                <Bot size={24} className="animate-pulse" />
                <span className="hidden sm:inline tracking-wider">ASK SAKURA</span>
              </>
            )}
          </div>
        </motion.button>
      </div>

      {/* Chat Modal Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[94vw] sm:w-[420px] h-[540px] max-h-[80vh] flex flex-col rounded-3xl border border-indigo-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 shadow-2xl backdrop-blur-2xl overflow-hidden text-slate-900 dark:text-slate-100 transition-colors"
          >
            {/* Chat Window Header */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-indigo-50/90 via-slate-100 to-purple-50/90 dark:from-indigo-950/80 dark:via-slate-900 dark:to-purple-950/80 border-b border-indigo-100 dark:border-slate-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-mono text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <span>Sakura AI Assistant</span>
                    <Sparkles size={14} className="text-amber-500 dark:text-amber-400" />
                  </h3>
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono font-bold flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    <span>Online & Ready</span>
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/60 transition-colors"
                aria-label="Close Chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Message History List */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 font-sans text-xs sm:text-sm">
              {messages.map((msg) => {
                const isBot = msg.sender === "sakura" || msg.sender === "bot" || msg.sender === "assistant";
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isBot ? "items-start" : "items-end"}`}
                  >
                    <div
                      className={`flex items-start gap-2.5 max-w-[88%] ${
                        isBot ? "flex-row" : "flex-row-reverse"
                      }`}
                    >
                      <div
                        className={`p-1.5 rounded-xl text-xs shrink-0 ${
                          isBot
                            ? "bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30"
                            : "bg-purple-500/20 text-purple-600 dark:text-purple-400 border border-purple-500/30"
                        }`}
                      >
                        {isBot ? <Bot size={16} /> : <User size={16} />}
                      </div>

                      <div
                        className={`p-3.5 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                          isBot
                            ? "bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none shadow-md font-medium"
                            : "bg-indigo-600 text-white rounded-tr-none shadow-lg shadow-indigo-600/20 font-medium"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>

                    <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 mt-1 px-1 font-semibold">
                      {msg.time}
                    </span>
                  </div>
                );
              })}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-mono p-2 font-bold">
                  <Bot size={16} className="animate-spin-slow" />
                  <span className="animate-pulse">Sakura is typing...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Box */}
            <div className="p-3 sm:p-4 bg-slate-50/90 dark:bg-slate-950 border-t border-indigo-100 dark:border-slate-800 flex items-center gap-2 shrink-0">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask Sakura about projects, skills, experience..."
                className="flex-1 px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-indigo-200/80 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500/60 font-sans shadow-sm"
              />

              <button
                onClick={() => handleSendMessage()}
                disabled={!inputMessage.trim()}
                className="p-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-mono text-xs font-bold shadow-lg shadow-indigo-600/20 transition-all cursor-pointer"
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
