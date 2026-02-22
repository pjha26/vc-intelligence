"use client";

import { useState, useMemo, useEffect } from "react";
import mockCompanies from "@/data/mock-companies.json";
import { Search, SlidersHorizontal, ChevronRight, BookmarkPlus } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

type Company = typeof mockCompanies[0];

export default function CompaniesPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get("q") || "";

    const [search, setSearch] = useState(initialQuery);
    const [stageFilter, setStageFilter] = useState("All");
    const [industryFilter, setIndustryFilter] = useState("All");
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

    const filteredCompanies = useMemo(() => {
        return mockCompanies.filter(c => {
            const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
                c.description.toLowerCase().includes(search.toLowerCase());
            const matchesStage = stageFilter === "All" || c.stage === stageFilter;
            const matchesIndustry = industryFilter === "All" || c.industry === industryFilter;

            return matchesSearch && matchesStage && matchesIndustry;
        });
    }, [search, stageFilter, industryFilter]);

    const handleSaveSearch = () => {
        const newSaved = {
            id: Date.now().toString(),
            name: `Search: ${search || 'All'} | ${stageFilter} | ${industryFilter}`,
            filters: { search, stageFilter, industryFilter }
        };
        const existing = JSON.parse(localStorage.getItem("vc_saved_searches") || "[]");
        localStorage.setItem("vc_saved_searches", JSON.stringify([...existing, newSaved]));
        alert("Search saved to your Saved Searches!");
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Discover Companies</h1>
                    <p className="text-slate-500 mt-1">Browse, filter, and enrich startup profiles.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleSaveSearch}
                        className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-md shadow-sm font-medium hover:bg-slate-50 transition-colors text-sm"
                    >
                        <BookmarkPlus className="w-4 h-4" />
                        <span>Save Search</span>
                    </button>
                </div>
            </div>

            <div className="flex gap-6">
                {/* Filters Sidebar */}
                <div className="w-64 shrink-0 space-y-6">
                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex items-center space-x-2 font-medium text-slate-900 mb-4 pb-4 border-b border-slate-100">
                            <SlidersHorizontal className="w-4 h-4" />
                            <span>Filters</span>
                        </div>

                        <div className="space-y-5 flex flex-col">
                            <div className="space-y-3 flex flex-col items-start w-full">
                                <label className="text-sm font-medium text-slate-700">Keyword</label>
                                <div className="relative w-full">
                                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Search terms..."
                                        className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-md text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-3 flex flex-col items-start w-full">
                                <label className="text-sm font-medium text-slate-700">Industry</label>
                                <select
                                    className="w-full p-2 border border-slate-200 rounded-md text-sm focus:border-blue-500 outline-none"
                                    value={industryFilter}
                                    onChange={(e) => setIndustryFilter(e.target.value)}
                                >
                                    {industries.map(i => <option key={i} value={i}>{i}</option>)}
                                </select>
                            </div>

                            <div className="space-y-3 flex flex-col items-start w-full">
                                <label className="text-sm font-medium text-slate-700">Stage</label>
                                <select
                                    className="w-full p-2 border border-slate-200 rounded-md text-sm focus:border-blue-500 outline-none"
                                    value={stageFilter}
                                    onChange={(e) => setStageFilter(e.target.value)}
                                >
                                    {stages.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>

                            <button
                                onClick={() => {
                                    setSearch("");
                                    setStageFilter("All");
                                    setIndustryFilter("All");
                                }}
                                className="text-sm text-blue-600 font-medium hover:text-blue-700 w-full text-left pt-2"
                            >
                                Clear Filters
                            </button>
                        </div>
                    </div>
                </div>

                {/* Results Table */}
                <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                    <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-white text-sm">
                        <span className="text-slate-500">Showing <strong className="text-slate-900">{filteredCompanies.length}</strong> companies</span>
                    </div>

                    <div className="overflow-x-auto flex-1">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                                    <th className="px-6 py-4 font-medium border-b border-slate-200">Company</th>
                                    <th className="px-6 py-4 font-medium border-b border-slate-200">Industry</th>
                                    <th className="px-6 py-4 font-medium border-b border-slate-200">Stage</th>
                                    <th className="px-6 py-4 font-medium border-b border-slate-200">Location</th>
                                    <th className="px-6 py-4 font-medium border-b border-slate-200">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 text-sm">
                                {filteredCompanies.map((company) => (
                                    <tr key={company.id} className="hover:bg-slate-50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <Link href={`/companies/${company.id}`} className="font-semibold text-slate-900 hover:text-blue-600 transition-colors flex items-center">
                                                    {company.name}
                                                </Link>
                                                <span className="text-slate-500 text-xs mt-1 truncate max-w-xs">{company.description}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700">
                                                {company.industry}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">{company.stage}</td>
                                        <td className="px-6 py-4 text-slate-600">{company.location}</td>
                                        <td className="px-6 py-4">
                                            <Link
                                                href={`/companies/${company.id}`}
                                                className="opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center justify-center p-2 bg-white border border-slate-200 rounded-md hover:bg-slate-50 text-slate-700 shadow-sm"
                                            >
                                                <ChevronRight className="w-4 h-4" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                                {filteredCompanies.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                                            No companies match your filters.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
