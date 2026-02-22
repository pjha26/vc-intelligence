"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, X, Send, Sparkles, ChevronDown } from "lucide-react";

import { useChat } from "@ai-sdk/react";

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
        api: '/api/chat',
        initialMessages: [
            {
                id: "1",
                role: "assistant",
                content: "Hello! I'm the Drishti Intelligence Engine. How can I help you discover the future of startups?",
            }
        ]
    } as any) as any;

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full flex items-center justify-center shadow-[0_0_30px_-5px_rgba(79,70,229,0.5)] hover:shadow-[0_0_40px_-5px_rgba(79,70,229,0.7)] transition-all z-50 group border border-indigo-400/20"
                aria-label="Open Intelligence Assistant"
            >
                <Bot className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span className="absolute top-0 right-0 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-slate-950"></span>
                </span>
            </button>
        );
    }

    return (
        <div className="fixed bottom-6 right-6 w-[350px] sm:w-[400px] h-[500px] max-h-[calc(100vh-48px)] bg-slate-900 border border-slate-700/50 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden backdrop-blur-xl">
            {/* Header */}
            <div className="px-4 py-3 bg-slate-800/80 border-b border-slate-700/50 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center relative">
                        <Bot className="w-4 h-4 text-indigo-400" />
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-800 rounded-full"></span>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-white leading-tight">Drishti AI</h3>
                        <p className="text-[10px] text-slate-400 font-medium tracking-wide flex items-center gap-1">
                            <Sparkles className="w-2.5 h-2.5 text-indigo-400" /> Intelligence Engine Online
                        </p>
                    </div>
                </div>
                <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
                >
                    <ChevronDown className="w-5 h-5" />
                </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/50 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                {messages.map((msg: any) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                        <div
                            className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${msg.role === "user"
                                ? "bg-indigo-600 text-white rounded-br-sm"
                                : "bg-slate-800 text-slate-200 border border-slate-700/50 rounded-bl-sm"
                                }`}
                        >
                            {msg.content}
                        </div>
                    </div>
                ))}
                {isLoading && messages[messages.length - 1]?.role === "user" && (
                    <div className="flex justify-start">
                        <div className="bg-slate-800 text-slate-200 border border-slate-700/50 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                            <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                            <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"></span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-slate-800/80 border-t border-slate-700/50 shrink-0">
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit(e); }} className="relative flex items-center">
                    <input
                        type="text"
                        placeholder="Ask about a startup or trend..."
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-4 pr-12 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-medium"
                        value={input}
                        onChange={handleInputChange}
                    />
                    <button
                        type="submit"
                        disabled={!input?.trim() || isLoading}
                        className="absolute right-2 p-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-lg transition-colors flex items-center justify-center"
                    >
                        <Send className="w-4 h-4 -ml-0.5" />
                    </button>
                </form>
            </div>
        </div>
    );
}
