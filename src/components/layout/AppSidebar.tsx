import Link from "next/link";
import { Building2, List, Bookmark, Search, ChevronsUpDown, Home, Settings, HelpCircle } from "lucide-react";

export function AppSidebar() {
  return (
    <aside className="w-60 border-r border-slate-800 bg-slate-900 min-h-screen flex flex-col text-sm shadow-xl z-20">
      {/* Workspace Selector */}
      <Link href="/" className="h-14 flex items-center px-4 border-b border-slate-800 hover:bg-slate-800/80 cursor-pointer transition-colors relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="flex-1 flex items-center space-x-3 relative z-10">
          <div className="w-7 h-7 bg-indigo-500 rounded flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <span className="text-white text-xs font-bold leading-none">VC</span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-white leading-tight">Acme Capital</span>
            <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Workspace</span>
          </div>
        </div>
        <ChevronsUpDown className="w-4 h-4 text-slate-500 relative z-10" />
      </Link>

      {/* Main Navigation */}
      <div className="p-3 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
        <div className="mb-6">
          <div className="px-3 mb-2 text-xs font-bold text-slate-500 uppercase tracking-widest">Discovery</div>
          <nav className="space-y-1">
            <Link href="/companies" className="flex items-center space-x-2.5 px-3 py-2.5 text-slate-300 font-medium rounded-lg hover:text-white hover:bg-slate-800 transition-all group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Building2 className="w-4 h-4 text-slate-400 group-hover:text-indigo-400 transition-colors relative z-10" />
              <span className="relative z-10">Companies</span>
            </Link>
          </nav>
        </div>

        <div className="mb-6">
          <div className="px-3 mb-2 text-xs font-bold text-slate-500 uppercase tracking-widest">Your Work</div>
          <nav className="space-y-1">
            <Link href="/lists" className="flex items-center space-x-2.5 px-3 py-2.5 text-slate-300 font-medium rounded-lg hover:text-white hover:bg-slate-800 transition-all group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <List className="w-4 h-4 text-slate-400 group-hover:text-indigo-400 transition-colors relative z-10" />
              <span className="relative z-10">My Lists</span>
            </Link>
            <Link href="/saved" className="flex items-center space-x-2.5 px-3 py-2.5 text-slate-300 font-medium rounded-lg hover:text-white hover:bg-slate-800 transition-all group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Bookmark className="w-4 h-4 text-slate-400 group-hover:text-indigo-400 transition-colors relative z-10" />
              <span className="relative z-10">Saved Searches</span>
            </Link>
          </nav>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="p-3 border-t border-slate-800 bg-slate-900/50">
        <nav className="space-y-1 mb-3">
          <button className="w-full flex items-center space-x-2.5 px-3 py-2.5 text-slate-400 font-medium rounded-lg hover:text-white hover:bg-slate-800 transition-all">
            <Settings className="w-4 h-4 text-slate-500" />
            <span>Settings</span>
          </button>
          <button className="w-full flex items-center space-x-2.5 px-3 py-2.5 text-slate-400 font-medium rounded-lg hover:text-white hover:bg-slate-800 transition-all">
            <HelpCircle className="w-4 h-4 text-slate-500" />
            <span>Support</span>
          </button>
        </nav>

        <div className="flex items-center space-x-3 px-3 py-2.5 rounded-lg hover:bg-slate-800/80 cursor-pointer transition-colors border border-transparent hover:border-slate-700">
          <div className="w-8 h-8 rounded bg-gradient-to-tr from-slate-700 to-slate-600 flex items-center justify-center text-white font-bold text-xs shadow-inner">
            JD
          </div>
          <div className="flex flex-col flex-1">
            <span className="font-semibold text-white leading-tight">Jane Doe</span>
            <span className="text-[11px] text-slate-400 leading-tight mt-0.5">jane@acmecap.com</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
