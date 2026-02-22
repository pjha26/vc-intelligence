"use client";

import { Search, Bell, Command, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function AppHeader() {
    const [query, setQuery] = useState("");
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/companies?q=${encodeURIComponent(query)}`);
        }
    };

    return (
        <header className="h-14 border-b border-slate-200 bg-white flex items-center justify-between px-6 shrink-0">
            <div className="flex-1 flex max-w-2xl">
                <form onSubmit={handleSearch} className="w-full relative group">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search for companies, investors, or signals..."
                        className="w-full pl-10 pr-12 py-1.5 bg-slate-50 border border-slate-200 rounded text-sm focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-400"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                        <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-slate-200 bg-white text-[10px] font-medium text-slate-400">
                            <Command className="w-3 h-3" /> K
                        </kbd>
                    </div>
                </form>
            </div>

            <div className="flex items-center space-x-5 ml-6">
                <button className="text-slate-400 hover:text-slate-700 transition-colors relative">
                    <Bell className="w-4 h-4" />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>
                <div className="h-4 w-px bg-slate-200"></div>
                <button className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                    <span>Help</span>
                </button>
            </div>
        </header>
    );
}
