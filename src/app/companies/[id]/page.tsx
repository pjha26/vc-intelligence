"use client";

import { useState, useEffect } from "react";
import mockCompanies from "@/data/mock-companies.json";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, ExternalLink, Sparkles, Building2, MapPin, Activity, Check, Plus } from "lucide-react";

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
                throw new Error(data.error || "Failed to enrich");
            }

            setEnrichedData(data);
            localStorage.setItem(`enriched_${id}`, JSON.stringify(data));
        } catch (err: any) {
            setEnrichError(err.message);
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
        <div className="h-full flex flex-col bg-slate-50/50">
            {/* Top Navigation Bar */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-slate-200 bg-white shrink-0">
                <button
                    onClick={() => router.back()}
                    className="flex items-center text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors"
                >
                    <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
                    Back to Directory
                </button>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleEnrich}
                        disabled={enriching}
                        className="flex items-center space-x-1.5 px-3 py-1.5 bg-indigo-600 text-white rounded shadow-sm font-medium hover:bg-indigo-700 transition-colors text-xs disabled:opacity-70"
                    >
                        {enriching ? (
                            <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 animate-pulse" /> Enriching...</span>
                        ) : (
                            <><Sparkles className="w-3.5 h-3.5 text-indigo-200" /> <span>Live Enrich</span></>
                        )}
                    </button>

                    <div className="relative">
                        <button
                            onClick={() => setShowLists(!showLists)}
                            className="flex items-center space-x-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded shadow-sm font-medium hover:bg-slate-50 transition-colors text-xs"
                        >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Save</span>
                        </button>
                        {showLists && (
                            <div className="absolute right-0 mt-1 w-48 bg-white border border-slate-200 rounded shadow-lg z-20 py-1">
                                <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Your Lists</div>
                                {savedLists.map(list => (
                                    <button
                                        key={list.id}
                                        onClick={() => handleAddToList(list.id)}
                                        className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 font-medium"
                                    >
                                        {list.name}
                                    </button>
                                ))}
                                <div className="h-px bg-slate-100 my-1"></div>
                                <button
                                    onClick={createListAndAdd}
                                    className="w-full text-left px-3 py-1.5 text-xs text-indigo-600 hover:bg-indigo-50 font-medium"
                                >
                                    + Create List
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Profile Header Banner */}
            <div className="bg-white border-b border-slate-200 px-6 py-6 shrink-0">
                <div className="max-w-6xl mx-auto flex items-start gap-5">
                    <div className="w-16 h-16 rounded flex items-center justify-center text-indigo-600 font-bold text-2xl border-2 border-slate-100 shadow-sm shrink-0 bg-indigo-50/50">
                        {company.name.charAt(0)}
                    </div>
                    <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{company.name}</h1>
                            <a href={company.url} target="_blank" rel="noreferrer" className="text-xs font-medium text-slate-500 hover:text-indigo-600 flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded transition-colors">
                                {new URL(company.url).hostname.replace('www.', '')} <ExternalLink className="w-3 h-3" />
                            </a>
                        </div>
                        <p className="text-sm text-slate-600 max-w-2xl">{company.description}</p>
                        <div className="flex flex-wrap gap-2 pt-1">
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                                {company.industry}
                            </span>
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-white border border-slate-200 text-slate-600">
                                <Activity className="w-3.5 h-3.5 mr-1 text-slate-400" /> {company.stage}
                            </span>
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-white border border-slate-200 text-slate-600">
                                <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" /> {company.location}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Grid Layout Content */}
            <div className="flex-1 overflow-auto p-6">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Left Column (Main Info & Summary) */}
                    <div className="lg:col-span-2 space-y-6">
                        {enrichError && (
                            <div className="p-3 bg-red-50 text-red-700 rounded border border-red-100 text-xs font-medium">
                                Enrichment failed: {enrichError}
                            </div>
                        )}

                        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                            <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                                <h2 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-indigo-500" /> Intelligence Summary
                                </h2>
                                {!enrichedData && (
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                                        Not Enriched
                                    </span>
                                )}
                            </div>
                            <div className="p-5">
                                {enrichedData ? (
                                    <div className="space-y-5 animate-in fade-in duration-500">
                                        <p className="text-sm text-slate-700 leading-relaxed font-medium">
                                            {enrichedData.summary}
                                        </p>

                                        <div>
                                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">What They Do</h3>
                                            <ul className="space-y-2">
                                                {enrichedData.whatTheyDo.map((item: string, i: number) => (
                                                    <li key={i} className="flex gap-2.5 text-sm text-slate-600 items-start">
                                                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                                        <span className="leading-snug">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="pt-4 border-t border-slate-100">
                                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Keywords & Tags</h3>
                                            <div className="flex flex-wrap gap-1.5">
                                                {enrichedData.keywords.map((kw: string, i: number) => (
                                                    <span key={i} className="px-2 py-1 bg-indigo-50 text-indigo-700 border border-indigo-100 hover:bg-indigo-100 transition-colors rounded text-xs font-medium cursor-default">
                                                        {kw}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="py-8 text-center flex flex-col items-center">
                                        <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-3 border border-slate-100">
                                            <Building2 className="w-5 h-5 text-slate-300" />
                                        </div>
                                        <p className="text-sm font-medium text-slate-900">Unlock deeper insights</p>
                                        <p className="text-xs text-slate-500 mt-1 mb-4">Click Live Enrich to fetch real-time public data instantly.</p>
                                        <button onClick={handleEnrich} className="text-xs font-semibold text-indigo-600 hover:text-indigo-700">
                                            Run Enrichment &rarr;
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Financials / Rounds Mock Card */}
                        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                            <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/50">
                                <h2 className="text-sm font-semibold text-slate-900">Recent Rounds</h2>
                            </div>
                            <div className="p-0">
                                <table className="w-full text-left text-sm whitespace-nowrap">
                                    <thead className="bg-slate-50/50">
                                        <tr className="text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                                            <th className="px-5 py-2">Date</th>
                                            <th className="px-5 py-2">Stage</th>
                                            <th className="px-5 py-2">Amount</th>
                                            <th className="px-5 py-2">Lead Investors</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        <tr className="hover:bg-slate-50">
                                            <td className="px-5 py-2.5 text-xs text-slate-500">Oct 2023</td>
                                            <td className="px-5 py-2.5 font-medium text-slate-900">{company.stage}</td>
                                            <td className="px-5 py-2.5 text-slate-600">—</td>
                                            <td className="px-5 py-2.5 text-indigo-600 text-xs font-medium hover:underline cursor-pointer">Acme Capital</td>
                                        </tr>
                                        <tr className="hover:bg-slate-50 bg-slate-50/30">
                                            <td className="px-5 py-2.5 text-xs text-slate-500">Jan 2022</td>
                                            <td className="px-5 py-2.5 font-medium text-slate-900">Seed</td>
                                            <td className="px-5 py-2.5 text-slate-600">$3.2M</td>
                                            <td className="px-5 py-2.5 text-indigo-600 text-xs font-medium hover:underline cursor-pointer">Sequoia</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Right Column (Signals & Notes) */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                            <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                                <h2 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                                    <Activity className="w-4 h-4 text-emerald-500" /> Live Signals
                                </h2>
                            </div>
                            <div className="p-4">
                                {enrichedData?.signals ? (
                                    <div className="space-y-3">
                                        {enrichedData.signals.map((signal: string, i: number) => (
                                            <div key={i} className="flex gap-3 items-start p-3 rounded bg-emerald-50/50 border border-emerald-100/50">
                                                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                                                    <Activity className="w-3 h-3 text-emerald-600" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-slate-800 leading-snug">{signal}</p>
                                                    <p className="text-[10px] text-slate-400 mt-0.5">Scraped via API</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-xs text-slate-500 text-center py-6">Signals will populate after running Live Enrich.</p>
                                )}
                            </div>
                        </div>

                        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden flex flex-col h-64">
                            <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                                <h2 className="text-sm font-semibold text-slate-900">Private Notes</h2>
                            </div>
                            <div className="p-4 flex-1 flex flex-col">
                                <textarea
                                    className="flex-1 w-full bg-slate-50/50 p-3 border border-slate-200 rounded focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500 outline-none text-xs resize-none transition-colors"
                                    placeholder="Draft investment thesis..."
                                    defaultValue={""}
                                ></textarea>
                                <div className="mt-3 flex justify-end">
                                    <button className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded text-xs font-semibold hover:bg-slate-50 transition shadow-sm">
                                        Save Note
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Data Sources Footnote */}
                        {enrichedData?.sources && (
                            <div className="px-2">
                                <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Data Sources</h3>
                                <ul className="text-[10px] text-slate-400 space-y-1">
                                    {enrichedData.sources.map((src: any, i: number) => (
                                        <li key={i} className="truncate">Source: <a href={src.url} className="underline hover:text-slate-600">{src.url}</a> <br /><span className="text-slate-300">({new Date(src.timestamp).toLocaleDateString()})</span></li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}
