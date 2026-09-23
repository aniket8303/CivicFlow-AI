"use client";

import { useState } from "react";
import { askAssistant } from "@/services/ragService";

export default function AssistantPage() {
    const [query, setQuery] = useState("");
    const [chat, setChat] = useState<{ role: "user" | "ai", text: string }[]>([
        { role: "ai", text: "Hello. I am the CivicFlow Intelligence Assistant. You can ask me about recent incidents, historical resolutions, or standard operating procedures." }
    ]);
    const [loading, setLoading] = useState(false);

    const handleAsk = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        const userText = query.trim();
        setChat(prev => [...prev, { role: "user", text: userText }]);
        setQuery("");
        setLoading(true);

        try {
            const answer = await askAssistant(userText);
            setChat(prev => [...prev, { role: "ai", text: answer }]);
        } catch (err) {
            setChat(prev => [...prev, { role: "ai", text: "Sorry, I am currently unavailable." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-10 max-w-4xl mx-auto h-full flex flex-col">
            <div className="mb-8 flex-shrink-0">
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Intelligence Assistant</h1>
                <p className="text-slate-500 mt-2">Query historical reports, SOPs, and current active incidents using natural language.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
                    {chat.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                            <div className={`max-w-[80%] rounded-2xl p-4 ${
                                msg.role === "user" 
                                ? "bg-blue-600 text-white rounded-br-none" 
                                : "bg-white border border-slate-200 text-slate-700 rounded-bl-none shadow-sm"
                            }`}>
                                {msg.role === "ai" && <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1 flex items-center gap-1"><span>🤖</span> AI ASSISTANT</div>}
                                <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                            </div>
                        </div>
                    ))}
                    {loading && (
                        <div className="flex justify-start">
                            <div className="bg-white border border-slate-200 text-slate-500 rounded-2xl p-4 rounded-bl-none shadow-sm flex items-center gap-2">
                                <span className="flex gap-1">
                                    <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"></span>
                                    <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                                    <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                                </span>
                                Analyzing...
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-4 bg-white border-t border-slate-200">
                    <form onSubmit={handleAsk} className="flex gap-2 relative">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            disabled={loading}
                            placeholder="Ask about active water issues..."
                            className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                        <button 
                            type="submit"
                            disabled={loading}
                            className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-semibold transition-all disabled:opacity-50"
                        >
                            Send
                        </button>
                    </form>
                    <div className="mt-2 flex gap-2">
                        <span className="text-xs text-slate-400">Suggested:</span>
                        <button onClick={() => setQuery("Are there any active water issues?")} className="text-xs text-blue-600 hover:underline">Water issues</button>
                        <button onClick={() => setQuery("What is the status of potholes on 5th Ave?")} className="text-xs text-blue-600 hover:underline">Potholes status</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
