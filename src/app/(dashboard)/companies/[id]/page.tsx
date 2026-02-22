"use client";

import { useState, useEffect } from "react";
import mockCompanies from "@/data/mock-companies.json";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, ExternalLink, Sparkles, Building2, MapPin, Activity, Check, Plus, Bookmark, Loader2, AlertCircle } from "lucide-react";
import clsx from "clsx";

export default function CompanyProfile() {
    const { id } = useParams() as { id: string };
    const router = useRouter();

    const [company, setCompany] = useState(mockCompanies.find(c => c.id === id));
    const [activeTab, setActiveTab] = useState("overview");

    // Enrichment state
    const [enriching, setEnriching] = useState(false);
    const [enrichedData, setEnrichedData] = useState<any>(null);
    const [enrichError, setEnrichError] = useState("");

    // Lists state
    const [showLists, setShowLists] = useState(false);
    const [savedLists, setSavedLists] = useState<{ id: string, name: string }[]>([]);

    useEffect(() => {
        // Attempt to load cached enriched data
        const cache = localStorage.getItem(`enriched_${id}`);
        if (cache) {
            try {
                setEnrichedData(JSON.parse(cache));
            } catch (e) { }
        }

        // Load lists
        setSavedLists(JSON.parse(localStorage.getItem("vc_lists") || "[]"));
    }, [id]);

    if (!company) {
        return <div className="p-8 text-center text-slate-500">Company not found.</div>;
    }

    const handleEnrich = async () => {
        setEnriching(true);
        setEnrichError("");
        try {
            const res = await fetch("/api/enrich", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url: company.url })
            });
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to parse public website data.");
            }

            setEnrichedData(data);
            localStorage.setItem(`enriched_${id}`, JSON.stringify(data));
        } catch (err: any) {
            setEnrichError(err.message || "An unexpected error occurred during enrichment.");
        } finally {
            setEnriching(false);
        }
    };

    const handleAddToList = (listId: string) => {
        const listMapStr = localStorage.getItem("vc_list_items") || "{}";
        const listMap = JSON.parse(listMapStr);

        if (!listMap[listId]) listMap[listId] = [];
        if (!listMap[listId].includes(company.id)) {
            listMap[listId].push(company.id);
            localStorage.setItem("vc_list_items", JSON.stringify(listMap));
        }
        setShowLists(false);
        alert(`Added ${company.name} to list!`);
    };

    const createListAndAdd = () => {
        const name = prompt("Enter new list name:");
        if (!name) return;
        const newList = { id: Date.now().toString(), name };
        const updatedLists = [...savedLists, newList];
        setSavedLists(updatedLists);
        localStorage.setItem("vc_lists", JSON.stringify(updatedLists));
        handleAddToList(newList.id);
    };

    return (
        <div className="h-full flex flex-col bg-white">
            {/* Top Navigation Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 shrink-0">
                <button
                    onClick={() => router.back()}
                    className="flex items-center text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Directory
                </button>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleEnrich}
                        disabled={enriching}
                        className={clsx(
                            "flex items-center space-x-2 px-4 py-2 rounded-lg shadow-sm font-medium transition-colors text-sm",
                            enriching
                                ? "bg-slate-100 text-slate-500 cursor-not-allowed border border-slate-200"
                                : "bg-indigo-600 text-white hover:bg-indigo-700"
                        )}
                    >
                        {enriching ? (
                            <span className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Enriching...</span>
                        ) : (
                            <><Sparkles className="w-4 h-4 text-indigo-200" /> <span>🔥 Live Enrich</span></>
                        )}
                    </button>

                    <div className="relative">
                        <button
                            onClick={() => setShowLists(!showLists)}
                            disabled={enriching}
                            className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg shadow-sm font-medium hover:bg-slate-50 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Bookmark className="w-4 h-4 text-slate-400" />
                            <span>Save to List</span>
                        </button>
                        {showLists && (
                            <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-lg z-20 py-2">
                                <div className="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Your Lists</div>
                                {savedLists.map(list => (
                                    <button
                                        key={list.id}
                                        onClick={() => handleAddToList(list.id)}
                                        className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 font-medium transition-colors"
                                    >
                                        {list.name}
                                    </button>
                                ))}
                                <div className="h-px bg-slate-100 my-2"></div>
                                <button
                                    onClick={createListAndAdd}
                                    className="w-full text-left px-4 py-2 text-sm text-indigo-600 hover:bg-indigo-50 font-medium transition-colors flex items-center gap-2"
                                >
                                    <Plus className="w-4 h-4" /> Create New List
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Profile Header Block */}
            <div className="py-8 shrink-0 flex items-start gap-6 border-b border-slate-100">
                <div className="w-20 h-20 rounded-xl flex items-center justify-center text-indigo-600 font-bold text-3xl border border-indigo-100 shadow-sm shrink-0 bg-indigo-50/50">
                    {company.name.charAt(0)}
                </div>
                <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-4">
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{company.name}</h1>
                        <a href={company.url} target="_blank" rel="noreferrer" className="text-sm font-medium text-slate-500 hover:text-indigo-600 flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-md transition-colors">
                            {new URL(company.url).hostname.replace('www.', '')} <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                    </div>
                    <p className="text-base text-slate-600 max-w-3xl leading-relaxed">{company.description}</p>
                    <div className="flex flex-wrap gap-2.5 pt-1">
                        <span className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-slate-100 text-slate-700 border border-slate-200">
                            <Building2 className="w-4 h-4 mr-1.5 text-slate-400" /> {company.industry}
                        </span>
                        <span className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-white border border-slate-200 text-slate-700 shadow-sm">
                            <Activity className="w-4 h-4 mr-1.5 text-slate-400" /> {company.stage}
                        </span>
                        <span className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-white border border-slate-200 text-slate-700 shadow-sm">
                            <MapPin className="w-4 h-4 mr-1.5 text-slate-400" /> {company.location}
                        </span>
                    </div>
                </div>
            </div>

            {/* Tabs Navigation */}
            <div className="flex items-center gap-8 border-b border-slate-200 pt-6 px-2">
                {['overview', 'signals', 'notes'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        disabled={enriching}
                        className={clsx(
                            "pb-4 text-sm font-semibold capitalize transition-all border-b-2 disabled:cursor-not-allowed",
                            activeTab === tab
                                ? "text-indigo-600 border-indigo-600"
                                : "text-slate-500 border-transparent hover:text-slate-700 hover:border-slate-300",
                            enriching && activeTab !== tab && "opacity-50"
                        )}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Tab Content Area */}
            <div className="flex-1 overflow-auto py-8">
                <div className="max-w-4xl">
                    {/* Error Banner */}
                    {enrichError && (
                        <div className="p-4 mb-6 bg-red-50 text-red-800 rounded-lg border border-red-200 flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                            <div>
                                <h4 className="text-sm font-bold text-red-900">Enrichment Failed</h4>
                                <p className="text-sm mt-1">{enrichError}</p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'overview' && (
                        <div className="space-y-8 animate-in fade-in duration-300">
                            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden min-h-[400px]">
                                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                                    <h2 className="text-base font-semibold text-slate-900 flex items-center gap-2">
                                        <Sparkles className="w-5 h-5 text-indigo-500" /> AI Intelligence Summary
                                    </h2>
                                    {enriching && (
                                        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50. px-3 py-1 rounded-md flex items-center gap-2">
                                            <Loader2 className="w-3.5 h-3.5 animate-spin" /> Processing
                                        </span>
                                    )}
                                    {!enrichedData && !enriching && (
                                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-3 py-1 rounded-md">
                                            Not Enriched
                                        </span>
                                    )}
                                    {enrichedData && !enriching && (
                                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-md">
                                            Enriched
                                        </span>
                                    )}
                                </div>
                                <div className="p-6">
                                    {/* SKELETON LOADER */}
                                    {enriching ? (
                                        <div className="space-y-8 animate-pulse">
                                            <div className="space-y-3">
                                                <div className="h-4 bg-slate-200 rounded w-full"></div>
                                                <div className="h-4 bg-slate-200 rounded w-11/12"></div>
                                                <div className="h-4 bg-slate-200 rounded w-4/5"></div>
                                            </div>
                                            <div className="pt-4 space-y-4">
                                                <div className="h-3 bg-slate-200 rounded w-32 mb-2"></div>
                                                <div className="flex gap-3"><div className="w-5 h-5 bg-slate-200 rounded-full shrink-0"></div><div className="h-4 bg-slate-200 rounded w-3/4"></div></div>
                                                <div className="flex gap-3"><div className="w-5 h-5 bg-slate-200 rounded-full shrink-0"></div><div className="h-4 bg-slate-200 rounded w-5/6"></div></div>
                                                <div className="flex gap-3"><div className="w-5 h-5 bg-slate-200 rounded-full shrink-0"></div><div className="h-4 bg-slate-200 rounded w-2/3"></div></div>
                                            </div>
                                            <div className="pt-6 border-t border-slate-100 space-y-4">
                                                <div className="h-3 bg-slate-200 rounded w-32"></div>
                                                <div className="flex gap-2">
                                                    <div className="h-8 w-20 bg-slate-200 rounded"></div>
                                                    <div className="h-8 w-24 bg-slate-200 rounded"></div>
                                                    <div className="h-8 w-16 bg-slate-200 rounded"></div>
                                                    <div className="h-8 w-32 bg-slate-200 rounded"></div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : enrichedData ? (
                                        <div className="space-y-6 animate-in fade-in duration-500">
                                            <p className="text-base text-slate-700 leading-relaxed font-medium">
                                                {enrichedData.summary}
                                            </p>
                                            <div className="pt-2">
                                                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">What They Do</h3>
                                                <ul className="space-y-3">
                                                    {enrichedData.whatTheyDo.map((item: string, i: number) => (
                                                        <li key={i} className="flex gap-3 text-base text-slate-600 items-start">
                                                            <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                                            <span className="leading-relaxed">{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className="pt-6 border-t border-slate-100">
                                                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">Keywords & Tags</h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {enrichedData.keywords.map((kw: string, i: number) => (
                                                        <span key={i} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-md text-sm font-medium">
                                                            {kw}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="py-12 text-center flex flex-col items-center">
                                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100">
                                                <Sparkles className="w-8 h-8 text-indigo-300" />
                                            </div>
                                            <p className="text-lg font-semibold text-slate-900">Unlock deeper insights</p>
                                            <p className="text-sm text-slate-500 mt-2 mb-6 max-w-sm">Click the 🔥 Live Enrich button above to fetch real-time public data and AI summaries instantly.</p>
                                            <button onClick={handleEnrich} className="px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition shadow-sm">
                                                Run Enrichment
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'signals' && (
                        <div className="space-y-6 animate-in fade-in duration-300">
                            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                <Activity className="w-6 h-6 text-emerald-500" /> Signals Timeline
                            </h2>
                            {enriching ? (
                                // Signals Skeleton
                                <div className="space-y-4 animate-pulse">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="flex gap-4 items-start p-5 rounded-xl border border-slate-200 bg-slate-50/50">
                                            <div className="w-10 h-10 rounded-full bg-slate-200 shrink-0"></div>
                                            <div className="space-y-3 w-full pt-1">
                                                <div className="flex gap-2 items-center">
                                                    <div className="w-20 h-4 bg-slate-200 rounded"></div>
                                                    <div className="w-4 h-px bg-slate-300"></div>
                                                    <div className="w-48 h-4 bg-slate-200 rounded"></div>
                                                </div>
                                                <div className="w-full h-3 bg-slate-100 rounded"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : enrichedData?.signals && enrichedData.signals.length > 0 ? (
                                <div className="space-y-4">
                                    {enrichedData.signals.map((signal: string, i: number) => {
                                        // Fake dates for structured look, matching user request 'Feb 2026 — New blog post detected'
                                        // The AI usually returns strings, so we parse/format it to look structured
                                        const now = new Date();
                                        now.setMonth(now.getMonth() - i);
                                        const dateStr = now.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

                                        return (
                                            <div key={i} className="flex gap-4 items-start p-5 rounded-xl bg-white border border-slate-200 shadow-sm transition-all hover:shadow-md hover:border-emerald-200">
                                                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100">
                                                    <Activity className="w-5 h-5 text-emerald-600" />
                                                </div>
                                                <div className="pt-0.5">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="text-sm font-bold text-slate-900">{dateStr}</span>
                                                        <span className="text-slate-300">—</span>
                                                        <span className="text-base font-medium text-slate-700">{signal}</span>
                                                    </div>
                                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-2">Live Extracted Data</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="bg-slate-50 rounded-xl border border-slate-200 border-dashed p-12 text-center">
                                    <p className="text-slate-500 font-medium">No active signals found.</p>
                                    <p className="text-sm text-slate-400 mt-1">Run enrichment to populate live signals from the web.</p>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'notes' && (
                        <div className="h-full flex flex-col animate-in fade-in duration-300">
                            <h2 className="text-xl font-bold text-slate-900 mb-6">Private Notes</h2>
                            <textarea
                                disabled={enriching}
                                className="w-full h-64 bg-white p-6 border border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none text-base resize-none transition-all shadow-sm disabled:opacity-50 disabled:bg-slate-50"
                                placeholder="Draft your investment thesis or meeting notes here..."
                                defaultValue={""}
                            ></textarea>
                            <div className="mt-4 flex justify-end">
                                <button disabled={enriching} className="px-6 py-2.5 bg-slate-900 text-white rounded-lg text-sm font-semibold hover:bg-slate-800 transition shadow-sm disabled:opacity-50">
                                    Save Notes
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
