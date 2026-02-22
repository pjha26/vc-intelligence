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
        <div className="max-w-5xl mx-auto space-y-6">
            {/* Header Back Navigation */}
            <button
                onClick={() => router.back()}
                className="flex items-center text-sm text-slate-500 hover:text-slate-800 transition-colors"
            >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to Companies
            </button>

            {/* Main Profile Header */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="flex gap-5">
                    <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center text-blue-700 text-2xl font-bold shrink-0">
                        {company.name.charAt(0)}
                    </div>
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                            {company.name}
                            <a href={company.url} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-500">
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        </h1>
                        <p className="text-slate-600 max-w-xl">{company.description}</p>
                        <div className="flex flex-wrap gap-4 pt-2 text-sm text-slate-500">
                            <span className="flex items-center gap-1.5"><Building2 className="w-4 h-4" /> {company.industry}</span>
                            <span className="flex items-center gap-1.5"><Activity className="w-4 h-4" /> {company.stage}</span>
                            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {company.location}</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3 shrink-0">
                    <button
                        onClick={handleEnrich}
                        disabled={enriching}
                        className="flex items-center justify-center space-x-2 px-6 py-2.5 bg-slate-900 text-white rounded-md font-medium hover:bg-slate-800 transition-colors disabled:opacity-50"
                    >
                        {enriching ? (
                            <span className="animate-pulse flex items-center gap-2">Enriching...</span>
                        ) : (
                            <>
                                <Sparkles className="w-4 h-4 text-blue-400" />
                                <span>Live Enrich</span>
                            </>
                        )}
                    </button>

                    <div className="relative">
                        <button
                            onClick={() => setShowLists(!showLists)}
                            className="w-full flex items-center justify-center space-x-2 px-6 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-md shadow-sm font-medium hover:bg-slate-50 transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Add to List</span>
                        </button>

                        {showLists && (
                            <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-md shadow-lg z-10 py-1">
                                <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Your Lists</div>
                                {savedLists.map(list => (
                                    <button
                                        key={list.id}
                                        onClick={() => handleAddToList(list.id)}
                                        className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                                    >
                                        {list.name}
                                    </button>
                                ))}
                                <div className="h-px bg-slate-100 my-1"></div>
                                <button
                                    onClick={createListAndAdd}
                                    className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 font-medium"
                                >
                                    + Create new list
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-6 border-b border-slate-200">
                {["overview", "signals", "notes"].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-3 text-sm font-medium capitalize transition-colors relative ${activeTab === tab ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
                    >
                        {tab}
                        {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 min-h-[400px]">
                {enrichError && (
                    <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg text-sm border border-red-100">
                        Failed to enrich: {enrichError}
                    </div>
                )}

                {activeTab === "overview" && (
                    <div className="space-y-8">
                        {enrichedData ? (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                <div>
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">AI Summary</h3>
                                    <p className="text-slate-700 leading-relaxed text-lg">{enrichedData.summary}</p>
                                </div>

                                <div className="grid md:grid-cols-2 gap-8">
                                    <div>
                                        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">What they do</h3>
                                        <ul className="space-y-2">
                                            {enrichedData.whatTheyDo.map((item: string, i: number) => (
                                                <li key={i} className="flex gap-2 text-slate-700">
                                                    <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">Keywords</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {enrichedData.keywords.map((kw: string, i: number) => (
                                                <span key={i} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">
                                                    {kw}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-slate-100">
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">Sources</h3>
                                    <ul className="text-xs text-slate-400 space-y-1">
                                        {enrichedData.sources.map((src: any, i: number) => (
                                            <li key={i}>Scraped <a href={src.url} className="underline hover:text-slate-600">{src.url}</a> at {new Date(src.timestamp).toLocaleString()}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ) : (
                            <div className="h-48 flex flex-col items-center justify-center text-center text-slate-500 space-y-4">
                                <div className="w-16 h-16 bg-slate-50 rounded-full border border-slate-100 flex items-center justify-center">
                                    <Sparkles className="w-6 h-6 text-slate-300" />
                                </div>
                                <div>
                                    <p className="font-medium text-slate-700">No enriched data available</p>
                                    <p className="text-sm mt-1">Click Live Enrich to fetch real-time public data for this company.</p>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === "signals" && (
                    <div className="space-y-6">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">Derived Signals</h3>
                        {enrichedData?.signals ? (
                            <div className="space-y-4">
                                {enrichedData.signals.map((signal: string, i: number) => (
                                    <div key={i} className="flex gap-4 items-start p-4 rounded-lg bg-blue-50/50 border border-blue-100">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                                            <Activity className="w-4 h-4 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-900">{signal}</p>
                                            <p className="text-xs text-slate-500 mt-1">Found via Live Enrichment</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-slate-500 text-center py-12">Run Live Enrichment to generate signals.</p>
                        )}
                    </div>
                )}

                {activeTab === "notes" && (
                    <div className="space-y-4">
                        <textarea
                            className="w-full h-40 p-4 border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-sm resize-none"
                            placeholder="Write your thesis, questions, and meeting notes here..."
                        ></textarea>
                        <div className="flex justify-end">
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition">Save Note</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
