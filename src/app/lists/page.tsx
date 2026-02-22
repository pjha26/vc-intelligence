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
        <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">My Lists</h1>
                    <p className="text-slate-500 mt-1">Manage and export your custom company lists.</p>
                </div>
            </div>

            <div className="grid gap-6">
                {lists.length === 0 ? (
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center flex flex-col items-center justify-center space-y-4">
                        <div className="w-16 h-16 bg-slate-50 rounded-full border border-slate-100 flex items-center justify-center">
                            <ListIcon className="w-6 h-6 text-slate-300" />
                        </div>
                        <div>
                            <p className="font-medium text-slate-700">No lists created yet</p>
                            <p className="text-sm text-slate-500 mt-1">Go to a company profile to create your first list.</p>
                        </div>
                        <Link href="/companies" className="px-4 py-2 mt-4 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
                            Browse Companies
                        </Link>
                    </div>
                ) : (
                    lists.map(list => {
                        const itemIds = listItems[list.id] || [];
                        const companies = mockCompanies.filter(c => itemIds.includes(c.id));

                        return (
                            <div key={list.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                                <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                                    <h2 className="font-semibold text-slate-900">{list.name} <span className="text-slate-500 text-sm font-normal ml-2">({companies.length} companies)</span></h2>
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => handleExport(list.id, 'csv')} className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 shadow-sm rounded-md text-sm font-medium hover:bg-slate-50 text-slate-700">
                                            <Download className="w-4 h-4" /> CSV
                                        </button>
                                        <button onClick={() => handleExport(list.id, 'json')} className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 shadow-sm rounded-md text-sm font-medium hover:bg-slate-50 text-slate-700">
                                            <Download className="w-4 h-4" /> JSON
                                        </button>
                                        <button onClick={() => removeList(list.id)} className="p-1.5 text-slate-400 hover:text-red-600 transition-colors ml-2">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                <div className="divide-y divide-slate-100">
                                    {companies.length === 0 ? (
                                        <div className="p-6 text-center text-sm text-slate-500">List is empty.</div>
                                    ) : (
                                        companies.map(c => (
                                            <div key={c.id} className="p-4 flex items-center justify-between hover:bg-slate-50/50">
                                                <div className="flex flex-col">
                                                    <Link href={`/companies/${c.id}`} className="font-medium text-slate-900 hover:text-blue-600 transition-colors">{c.name}</Link>
                                                    <span className="text-xs text-slate-500">{c.industry} &bull; {c.stage}</span>
                                                </div>
                                                <button
                                                    onClick={() => removeFromList(list.id, c.id)}
                                                    className="pt-1 px-2 text-xs text-slate-400 hover:text-red-500 font-medium"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
