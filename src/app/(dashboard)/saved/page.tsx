"use client";

import { useState, useEffect } from "react";
import { Bookmark, Search, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SavedSearchesPage() {
    const [searches, setSearches] = useState<{ id: string, name: string, filters: any }[]>([]);
    const router = useRouter();

    useEffect(() => {
        setSearches(JSON.parse(localStorage.getItem("vc_saved_searches") || "[]"));
    }, []);

    const removeSearch = (id: string) => {
        const updated = searches.filter(s => s.id !== id);
        setSearches(updated);
        localStorage.setItem("vc_saved_searches", JSON.stringify(updated));
    };

    const handleRunSearch = (filters: any) => {
        router.push(`/companies?q=${encodeURIComponent(filters.search || "")}`);
    };

    return (
        <div className="h-full flex flex-col bg-slate-50/50">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white shrink-0">
                <div>
                    <h1 className="text-xl font-bold text-slate-900 tracking-tight">Saved Searches</h1>
                    <p className="text-sm text-slate-500 mt-0.5">Quickly access past queries and filters.</p>
                </div>
            </div>

            <div className="flex-1 overflow-auto p-6">
                <div className="max-w-5xl mx-auto grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {searches.length === 0 ? (
                        <div className="col-span-full bg-white rounded border border-slate-200 shadow-sm p-12 text-center flex flex-col items-center justify-center space-y-3">
                            <div className="w-12 h-12 bg-slate-50 rounded-full border border-slate-100 flex items-center justify-center mb-1">
                                <Bookmark className="w-5 h-5 text-slate-300" />
                            </div>
                            <p className="font-medium text-slate-700 text-sm">No saved searches yet</p>
                            <p className="text-xs text-slate-500">Save a search from the Discovery page.</p>
                            <Link href="/companies" className="px-4 py-1.5 mt-2 bg-indigo-50 text-indigo-600 border border-indigo-100 rounded text-xs font-semibold hover:bg-indigo-100 transition-colors">
                                Go Discover
                            </Link>
                        </div>
                    ) : (
                        searches.map(search => (
                            <div key={search.id} className="bg-white border border-slate-200 rounded p-4 shadow-sm hover:border-indigo-200 transition-colors flex flex-col group">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="text-sm font-semibold text-slate-900 leading-snug line-clamp-2">{search.name}</h3>
                                    <button onClick={() => removeSearch(search.id)} className="text-slate-400 hover:text-red-500 transition-colors shrink-0 ml-2 opacity-0 group-hover:opacity-100">
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>

                                <div className="flex-1 space-y-1.5 mb-5 bg-slate-50/50 p-2.5 rounded border border-slate-100">
                                    <div className="text-[11px] flex items-center gap-2">
                                        <span className="text-slate-400 w-12 font-medium">Keyword</span>
                                        <span className="font-semibold text-slate-700 truncate">{search.filters.search || "All"}</span>
                                    </div>
                                    <div className="text-[11px] flex items-center gap-2">
                                        <span className="text-slate-400 w-12 font-medium">Stage</span>
                                        <span className="font-semibold text-slate-700 truncate">{search.filters.stageFilter || "All"}</span>
                                    </div>
                                    <div className="text-[11px] flex items-center gap-2">
                                        <span className="text-slate-400 w-12 font-medium">Industry</span>
                                        <span className="font-semibold text-slate-700 truncate">{search.filters.industryFilter || "All"}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleRunSearch(search.filters)}
                                    className="w-full py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-indigo-600 hover:border-indigo-200 rounded text-[11px] font-bold transition-colors flex justify-center items-center gap-1.5 shadow-sm"
                                >
                                    <Search className="w-3 h-3" />
                                    Run Search
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
