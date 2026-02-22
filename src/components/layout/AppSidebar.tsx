import Link from "next/link";
import { Building2, List, Bookmark, Search } from "lucide-react";

export function AppSidebar() {
  return (
    <aside className="w-64 border-r bg-slate-50 min-h-screen flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-slate-200">
        <div className="font-bold text-lg tracking-tight text-slate-900 flex items-center space-x-2">
          <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center">
            <span className="text-white text-xs font-bold">VC</span>
          </div>
          <span>Intelligence</span>
        </div>
      </div>
      
      <div className="p-4 flex-1">
        <nav className="space-y-1">
          <Link href="/companies" className="flex items-center space-x-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-slate-100 text-slate-700">
            <Building2 className="w-4 h-4" />
            <span>Companies</span>
          </Link>
          <Link href="/lists" className="flex items-center space-x-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-slate-100 text-slate-700">
            <List className="w-4 h-4" />
            <span>My Lists</span>
          </Link>
          <Link href="/saved" className="flex items-center space-x-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-slate-100 text-slate-700">
            <Bookmark className="w-4 h-4" />
            <span>Saved Searches</span>
          </Link>
        </nav>
      </div>
      
      <div className="p-4 border-t border-slate-200">
        <div className="flex items-center space-x-3 text-sm text-slate-500">
          <div className="w-8 h-8 rounded-full bg-slate-300 flex items-center justify-center text-slate-700 font-bold">
            U
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-slate-900">User</span>
            <span className="text-xs">Investor</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
