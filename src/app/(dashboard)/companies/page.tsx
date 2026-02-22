"use client";

import { Suspense, useState, useMemo, useEffect } from "react";
import mockCompanies from "@/data/mock-companies.json";
import { Search, SlidersHorizontal, ChevronRight, BookmarkPlus } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

type Company = typeof mockCompanies[0];

function CompaniesContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get("q") || "";

    const [search, setSearch] = useState(initialQuery);
    const [stageFilter, setStageFilter] = useState("All");
    const [industryFilter, setIndustryFilter] = useState("All");
    const [locationFilter, setLocationFilter] = useState("All");
    const [savedLists, setSavedLists] = useState<{ id: string, name: string }[]>([]);

    // Update search when URL param changes
    useEffect(() => {
        setSearch(initialQuery);
    }, [initialQuery]);

    useEffect(() => {
        const lists = JSON.parse(localStorage.getItem("vc_lists") || "[]");
        setSavedLists(lists);
    }, []);

    const stages = ["All", ...Array.from(new Set(mockCompanies.map(c => c.stage)))];
    const industries = ["All", ...Array.from(new Set(mockCompanies.map(c => c.industry)))];
    const locations = ["All", ...Array.from(new Set(mockCompanies.map(c => c.location)))].sort();

    const filteredCompanies = useMemo(() => {
        return mockCompanies.filter(c => {
            const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
                c.description.toLowerCase().includes(search.toLowerCase());
            const matchesStage = stageFilter === "All" || c.stage === stageFilter;
            const matchesIndustry = industryFilter === "All" || c.industry === industryFilter;
            const matchesLocation = locationFilter === "All" || c.location === locationFilter;

            return matchesSearch && matchesStage && matchesIndustry && matchesLocation;
        });
    }, [search, stageFilter, industryFilter, locationFilter]);

    const handleSaveSearch = () => {
        const newSaved = {
            id: Date.now().toString(),
            name: `Search: ${search || 'All'} | ${stageFilter} | ${industryFilter} | Loc: ${locationFilter}`,
            filters: { search, stageFilter, industryFilter, locationFilter }
        };
        const existing = JSON.parse(localStorage.getItem("vc_saved_searches") || "[]");
        localStorage.setItem("vc_saved_searches", JSON.stringify([...existing, newSaved]));
        alert("Search saved to your Saved Searches!");
    };

    return (
        <div className="flex flex-col min-h-full">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 shrink-0">
                <div>
                    <h1 className="text-xl font-bold text-slate-900 tracking-tight">Companies</h1>
                    <p className="text-sm text-slate-500 mt-0.5">Showing {filteredCompanies.length} result{filteredCompanies.length === 1 ? '' : 's'}</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={handleSaveSearch}
                        className="flex items-center space-x-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded shadow-sm font-medium hover:bg-slate-50 transition-colors text-xs"
                    >
                        <BookmarkPlus className="w-3.5 h-3.5" />
                        <span>Save Search</span>
                    </button>
                </div>
            </div>

            {/* Top Filters Bar */}
            <div className="flex items-center gap-3 py-3 border-b border-rose-100/60 bg-gradient-to-r from-rose-50/30 to-transparent shrink-0 px-2 rounded-t-xl mt-4">
                <div className="relative w-64">
                    <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Keyword search..."
                        className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded text-xs focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="h-4 w-px bg-slate-200 mx-1"></div>
                <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-slate-500">Industry:</span>
                    <select
                        className="py-1.5 pl-2 pr-6 bg-white border border-slate-200 rounded text-xs focus:border-indigo-500 outline-none cursor-pointer"
                        value={industryFilter}
                        onChange={(e) => setIndustryFilter(e.target.value)}
                    >
                        {industries.map(i => <option key={i} value={i}>{i}</option>)}
                    </select>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-slate-500">Stage:</span>
                    <select
                        className="py-1.5 pl-2 pr-6 bg-white border border-slate-200 rounded text-xs focus:border-indigo-500 outline-none cursor-pointer"
                        value={stageFilter}
                        onChange={(e) => setStageFilter(e.target.value)}
                    >
                        {stages.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-slate-500">Location:</span>
                    <select
                        className="py-1.5 pl-2 pr-6 bg-white border border-slate-200 rounded text-xs focus:border-indigo-500 outline-none cursor-pointer max-w-[140px] truncate"
                        value={locationFilter}
                        onChange={(e) => setLocationFilter(e.target.value)}
                    >
                        {locations.map(l => <option key={l} value={l}>{l.split(',')[0]}</option>)}
                    </select>
                </div>
                {(search || industryFilter !== "All" || stageFilter !== "All" || locationFilter !== "All") && (
                    <button
                        onClick={() => {
                            setSearch("");
                            setStageFilter("All");
                            setIndustryFilter("All");
                            setLocationFilter("All");
                        }}
                        className="text-xs text-indigo-600 font-medium hover:text-indigo-700 ml-auto px-2"
                    >
                        Clear Filters
                    </button>
                )}
            </div>

            {/* Dense Data Grid */}
            <div className="flex-1 bg-gradient-to-br from-white via-rose-50/40 to-orange-50/20 rounded-b-xl shadow-sm border border-t-0 border-rose-100/50">
                <table className="w-full text-left border-collapse whitespace-nowrap">
                    <thead className="bg-white/60 backdrop-blur-md border-b border-rose-200/60 shadow-sm">
                        <tr className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            <th className="px-4 py-2.5 w-6"></th>
                            <th className="px-4 py-2.5">Company</th>
                            <th className="px-4 py-2.5">Industry</th>
                            <th className="px-4 py-2.5">Stage</th>
                            <th className="px-4 py-2.5">Location</th>
                            <th className="px-4 py-2.5 flex-1 w-full">Description</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                        {filteredCompanies.map((company, idx) => (
                            <tr key={company.id} className="group hover:bg-rose-50/60 transition-colors">
                                <td className="px-4 py-2 text-xs text-rose-400/80 font-medium w-6 text-center">{idx + 1}</td>
                                <td className="px-4 py-2 flex items-center gap-2">
                                    <div className="w-6 h-6 rounded bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-[10px] shrink-0 border border-indigo-100">
                                        {company.name.charAt(0)}
                                    </div>
                                    <Link href={`/companies/${company.id}`} className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                                        {company.name}
                                    </Link>
                                </td>
                                <td className="px-4 py-2">
                                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
                                        {company.industry}
                                    </span>
                                </td>
                                <td className="px-4 py-2 text-slate-600 text-xs">{company.stage}</td>
                                <td className="px-4 py-2 text-slate-600 text-xs flex items-center gap-1.5">
                                    {company.location}
                                </td>
                                <td className="px-4 py-2 text-slate-500 text-xs truncate max-w-[300px] xl:max-w-[500px] relative">
                                    {company.description}
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 shadow-sm border border-slate-200 rounded px-2 py-1 flex items-center gap-2">
                                        <Link href={`/companies/${company.id}`} className="text-[11px] font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                                            Open Profile <ChevronRight className="w-3 h-3" />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {filteredCompanies.length === 0 && (
                            <tr>
                                <td colSpan={6} className="px-6 py-16 text-center">
                                    <div className="flex flex-col items-center justify-center text-slate-500">
                                        <Search className="w-8 h-8 md text-slate-300 mb-3" />
                                        <p className="font-medium text-slate-900">No companies found</p>
                                        <p className="text-sm mt-1">Adjust your filters to see more results.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default function CompaniesPage() {
    return (
        <Suspense fallback={<div className="p-8 text-center">Loading companies...</div>}>
            <CompaniesContent />
        </Suspense>
    );
}
