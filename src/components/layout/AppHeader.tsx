"use client";

import { Search, Bell } from "lucide-react";
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
        <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-6">
            <div className="flex-1 flex max-w-xl">
                <form onSubmit={handleSearch} className="w-full relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search companies, people, or signals... (Press /)"
                        className="w-full pl-10 pr-4 py-2 bg-slate-100 border-transparent rounded-md text-sm focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </form>
            </div>

            <div className="flex items-center space-x-4">
                <button className="text-slate-400 hover:text-slate-600 transition-colors relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>
            </div>
        </header>
    );
}
