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
        <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Saved Searches</h1>
                    <p className="text-slate-500 mt-1">Quickly access your past queries and filter combinations.</p>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {searches.length === 0 ? (
                    <div className="col-span-full bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center flex flex-col items-center justify-center space-y-4">
                        <div className="w-16 h-16 bg-slate-50 rounded-full border border-slate-100 flex items-center justify-center">
                            <Bookmark className="w-6 h-6 text-slate-300" />
                        </div>
                        <div>
                            <p className="font-medium text-slate-700">No saved searches yet</p>
                            <p className="text-sm text-slate-500 mt-1">Save a search from the discovery page.</p>
                        </div>
                        <Link href="/companies" className="px-4 py-2 mt-4 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
                            Go Discover
                        </Link>
                    </div>
                ) : (
                    searches.map(search => (
                        <div key={search.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="font-semibold text-slate-900 border-b border-transparent leading-tight line-clamp-2">{search.name}</h3>
                                <button onClick={() => removeSearch(search.id)} className="text-slate-400 hover:text-red-500 transition-colors shrink-0 ml-2">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="flex-1 space-y-2 mb-6">
                                <div className="text-xs flex gap-2">
                                    <span className="text-slate-500 w-16">Keyword:</span>
                                    <span className="font-medium text-slate-700">{search.filters.search || "All"}</span>
                                </div>
                                <div className="text-xs flex gap-2">
                                    <span className="text-slate-500 w-16">Stage:</span>
                                    <span className="font-medium text-slate-700">{search.filters.stageFilter || "All"}</span>
                                </div>
                                <div className="text-xs flex gap-2">
                                    <span className="text-slate-500 w-16">Industry:</span>
                                    <span className="font-medium text-slate-700">{search.filters.industryFilter || "All"}</span>
                                </div>
                            </div>

                            <button
                                onClick={() => handleRunSearch(search.filters)}
                                className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-md text-sm font-medium transition-colors flex justify-center items-center gap-2"
                            >
                                <Search className="w-3.5 h-3.5" />
                                Run Search
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
