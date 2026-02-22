import Link from "next/link";
import { Building2, List, Bookmark, Search, ChevronsUpDown, Home, Settings, HelpCircle } from "lucide-react";

export function AppSidebar() {
  return (
    <aside className="w-60 border-r border-slate-200 bg-white min-h-screen flex flex-col text-sm">
      {/* Workspace Selector */}
      <Link href="/" className="h-14 flex items-center px-4 border-b border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
        <div className="flex-1 flex items-center space-x-3">
          <div className="w-7 h-7 bg-indigo-600 rounded flex items-center justify-center shadow-sm">
            <span className="text-white text-xs font-bold leading-none">VC</span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-slate-900 leading-tight">Acme Capital</span>
            <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Workspace</span>
          </div>
        </div>
        <ChevronsUpDown className="w-4 h-4 text-slate-400" />
      </Link>

      {/* Main Navigation */}
      <div className="p-3 flex-1 overflow-y-auto">
        <div className="mb-6">
          <div className="px-3 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Discovery</div>
          <nav className="space-y-0.5">
            <Link href="/companies" className="flex items-center space-x-2.5 px-3 py-2 text-slate-700 font-medium rounded hover:bg-slate-100 transition-colors">
              <Building2 className="w-4 h-4 text-slate-500" />
              <span>Companies</span>
            </Link>
          </nav>
        </div>

        <div className="mb-6">
          <div className="px-3 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Your Work</div>
          <nav className="space-y-0.5">
            <Link href="/lists" className="flex items-center space-x-2.5 px-3 py-2 text-slate-700 font-medium rounded hover:bg-slate-100 transition-colors">
              <List className="w-4 h-4 text-slate-500" />
              <span>My Lists</span>
            </Link>
            <Link href="/saved" className="flex items-center space-x-2.5 px-3 py-2 text-slate-700 font-medium rounded hover:bg-slate-100 transition-colors">
              <Bookmark className="w-4 h-4 text-slate-500" />
              <span>Saved Searches</span>
            </Link>
          </nav>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="p-3 border-t border-slate-200">
        <nav className="space-y-0.5 mb-3">
          <button className="w-full flex items-center space-x-2.5 px-3 py-2 text-slate-600 font-medium rounded hover:bg-slate-100 transition-colors">
            <Settings className="w-4 h-4 text-slate-400" />
            <span>Settings</span>
          </button>
          <button className="w-full flex items-center space-x-2.5 px-3 py-2 text-slate-600 font-medium rounded hover:bg-slate-100 transition-colors">
            <HelpCircle className="w-4 h-4 text-slate-400" />
            <span>Support</span>
          </button>
        </nav>

        <div className="flex items-center space-x-3 px-3 py-2 rounded hover:bg-slate-50 cursor-pointer">
          <div className="w-7 h-7 rounded-sm bg-gradient-to-tr from-slate-200 to-slate-300 flex items-center justify-center text-slate-700 font-bold text-xs ring-1 ring-slate-200">
            JD
          </div>
          <div className="flex flex-col flex-1">
            <span className="font-medium text-slate-900 leading-tight">Jane Doe</span>
            <span className="text-[11px] text-slate-500 leading-tight">jane@acmecap.com</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
