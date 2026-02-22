"use client";

import { useState, useEffect } from "react";
import mockCompanies from "@/data/mock-companies.json";
import { Download, Trash2, List as ListIcon } from "lucide-react";
import Link from "next/link";

export default function ListsPage() {
    const [lists, setLists] = useState<{ id: string, name: string }[]>([]);
    const [listItems, setListItems] = useState<Record<string, string[]>>({});

    useEffect(() => {
        setLists(JSON.parse(localStorage.getItem("vc_lists") || "[]"));
        setListItems(JSON.parse(localStorage.getItem("vc_list_items") || "{}"));
    }, []);

    const handleExport = (listId: string, format: 'json' | 'csv') => {
        const itemIds = listItems[listId] || [];
        const companiesToExport = mockCompanies.filter(c => itemIds.includes(c.id));

        if (format === 'json') {
            const blob = new Blob([JSON.stringify(companiesToExport, null, 2)], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `list-${listId}.json`;
            a.click();
        } else {
            const headers = ["ID", "Name", "Industry", "Stage", "Location"];
            const rows = companiesToExport.map(c => [c.id, c.name, c.industry, c.stage, c.location]);
            const csvContent = [headers.join(","), ...rows.map(e => e.join(","))].join("\n");

            const blob = new Blob([csvContent], { type: "text/csv" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `list-${listId}.csv`;
            a.click();
        }
    };

    const removeList = (id: string) => {
        const updatedLists = lists.filter(l => l.id !== id);
        setLists(updatedLists);
        localStorage.setItem("vc_lists", JSON.stringify(updatedLists));

        const upItems = { ...listItems };
        delete upItems[id];
        setListItems(upItems);
        localStorage.setItem("vc_list_items", JSON.stringify(upItems));
    };

    const removeFromList = (listId: string, companyId: string) => {
        const upItems = { ...listItems };
        if (upItems[listId]) {
            upItems[listId] = upItems[listId].filter(id => id !== companyId);
            setListItems(upItems);
            localStorage.setItem("vc_list_items", JSON.stringify(upItems));
        }
    };

    return (
        <div className="h-full flex flex-col bg-slate-50/50">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white shrink-0">
                <div>
                    <h1 className="text-xl font-bold text-slate-900 tracking-tight">My Lists</h1>
                    <p className="text-sm text-slate-500 mt-0.5">Manage and export your custom company lists.</p>
                </div>
            </div>

            <div className="flex-1 overflow-auto p-6">
                <div className="max-w-5xl mx-auto space-y-6">
                    {lists.length === 0 ? (
                        <div className="bg-white rounded border border-slate-200 shadow-sm p-12 text-center flex flex-col items-center justify-center space-y-3">
                            <div className="w-12 h-12 bg-slate-50 rounded-full border border-slate-100 flex items-center justify-center mb-1">
                                <ListIcon className="w-5 h-5 text-slate-300" />
                            </div>
                            <p className="font-medium text-slate-700 text-sm">No lists created yet</p>
                            <p className="text-xs text-slate-500">Save a company to a list from its profile page.</p>
                            <Link href="/companies" className="px-4 py-1.5 mt-2 bg-indigo-50 text-indigo-600 border border-indigo-100 rounded text-xs font-semibold hover:bg-indigo-100 transition-colors">
                                Browse Companies
                            </Link>
                        </div>
                    ) : (
                        lists.map(list => {
                            const itemIds = listItems[list.id] || [];
                            const companies = mockCompanies.filter(c => itemIds.includes(c.id));

                            return (
                                <div key={list.id} className="bg-white rounded border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                                    <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
                                        <div className="flex items-center gap-3">
                                            <h2 className="text-sm font-semibold text-slate-900">{list.name}</h2>
                                            <span className="px-2 py-0.5 bg-slate-200 text-slate-600 rounded text-[10px] font-bold">{companies.length}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => handleExport(list.id, 'csv')} className="flex items-center gap-1.5 px-2 py-1 bg-white border border-slate-200 shadow-sm rounded text-[11px] font-medium hover:bg-slate-50 text-slate-600 transition-colors">
                                                <Download className="w-3 h-3 text-slate-400" /> CSV
                                            </button>
                                            <button onClick={() => handleExport(list.id, 'json')} className="flex items-center gap-1.5 px-2 py-1 bg-white border border-slate-200 shadow-sm rounded text-[11px] font-medium hover:bg-slate-50 text-slate-600 transition-colors">
                                                <Download className="w-3 h-3 text-slate-400" /> JSON
                                            </button>
                                            <div className="w-px h-4 bg-slate-200 mx-1"></div>
                                            <button onClick={() => removeList(list.id)} className="p-1 text-slate-400 hover:text-red-600 transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse whitespace-nowrap">
                                            <thead className="bg-slate-50/30">
                                                <tr className="text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                                                    <th className="px-4 py-2 w-6"></th>
                                                    <th className="px-4 py-2">Company</th>
                                                    <th className="px-4 py-2">Industry</th>
                                                    <th className="px-4 py-2">Stage</th>
                                                    <th className="px-4 py-2 w-10 text-right">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100 text-sm">
                                                {companies.length === 0 && (
                                                    <tr>
                                                        <td colSpan={5} className="p-8 text-center bg-slate-50/30">
                                                            <div className="flex flex-col items-center justify-center space-y-2">
                                                                <ListIcon className="w-6 h-6 text-slate-300" />
                                                                <p className="text-sm font-medium text-slate-600">This list is empty</p>
                                                                <p className="text-xs text-slate-400">Add companies from their profile page.</p>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}
                                                {companies.map((c, idx) => (
                                                    <tr key={c.id} className="hover:bg-slate-50/80 transition-colors group">
                                                        <td className="px-4 py-2 text-xs text-slate-400 font-medium w-6 text-center">{idx + 1}</td>
                                                        <td className="px-4 py-2 flex items-center gap-2">
                                                            <Link href={`/companies/${c.id}`} className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors text-xs">
                                                                {c.name}
                                                            </Link>
                                                        </td>
                                                        <td className="px-4 py-2">
                                                            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
                                                                {c.industry}
                                                            </span>
                                                        </td>
                                                        <td className="px-4 py-2 text-slate-600 text-xs">{c.stage}</td>
                                                        <td className="px-4 py-2 text-right">
                                                            <button
                                                                onClick={() => removeFromList(list.id, c.id)}
                                                                className="text-[11px] text-slate-400 hover:text-red-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                                                            >
                                                                Remove
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}
