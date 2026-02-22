"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Sparkles, ArrowRight, Building2, Bookmark, Activity, Search, Bot } from "lucide-react";
import ChatBot from "@/components/ui/ChatBot";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        router.push("/companies?focus=true");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  return (
    <div className="h-full flex flex-col bg-slate-950 text-slate-100 overflow-hidden relative">
      {/* Top Auth Navigation */}
      <div className="absolute top-0 inset-x-0 p-6 flex items-center justify-end z-30 gap-4">
        <Link href="/login" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">
          Log in
        </Link>
        <Link href="/signup" className="px-4 py-2 bg-white/10 hover:bg-white/15 border border-white/5 rounded-full text-sm font-semibold text-white backdrop-blur-md transition-all">
          Sign up
        </Link>
      </div>

      {/* Radiant Background Effects */}
      <div className="absolute top-0 inset-x-0 h-[500px] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/20 via-purple-500/5 to-transparent"></div>
        <div className="absolute top-[-20%] left-1/4 w-[600px] h-[600px] bg-indigo-600/30 rounded-full blur-[120px] mix-blend-screen animate-pulse duration-10000"></div>
        <div className="absolute top-[-10%] right-1/4 w-[500px] h-[500px] bg-fuchsia-600/20 rounded-full blur-[100px] mix-blend-screen"></div>
      </div>

      <div className="flex-1 overflow-auto relative z-10 p-8 md:p-12 lg:p-16 flex flex-col items-center justify-center min-h-0 pt-24">
        <div className="w-full max-w-5xl mx-auto space-y-16">

          {/* Hero Section */}
          <div className="text-center space-y-6 flex flex-col items-center">

            {/* Drishti Logo */}
            <div className="flex flex-col items-center justify-center space-y-5 mb-2 relative">
              {/* Outer glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl"></div>

              <div className="relative flex items-center justify-center w-20 h-20">
                {/* Orbital rings */}
                <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-indigo-400/40 animate-[spin_8s_linear_infinite]"></div>
                <div className="absolute inset-2 rounded-full border-b-2 border-l-2 border-purple-400/40 animate-[spin_12s_linear_infinite_reverse]"></div>
                <div className="absolute inset-4 rounded-full border border-fuchsia-400/30 border-dashed animate-[spin_20s_linear_infinite]"></div>

                {/* Hindi/Sanskrit focal point */}
                <div className="absolute inset-0 flex items-center justify-center text-4xl font-serif text-indigo-100 drop-shadow-[0_0_15px_rgba(129,140,248,0.8)]">
                  दृ
                </div>
              </div>

              <div className="flex flex-col items-center space-y-1 relative z-10">
                <h2 className="text-2xl font-extrabold tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-white to-indigo-200 uppercase font-sans">
                  Drishti
                </h2>
                <div className="flex items-center gap-2 opacity-80">
                  <div className="h-px w-6 bg-gradient-to-r from-transparent to-indigo-500"></div>
                  <span className="text-[9px] font-bold tracking-[0.3em] text-indigo-300 uppercase">Intelligence</span>
                  <div className="h-px w-6 bg-gradient-to-l from-transparent to-indigo-500"></div>
                </div>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-100 to-slate-400 drop-shadow-sm">
              Discover the Future.
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Your AI-driven operating system for venture intelligence. Surface hidden signals, enrich company profiles instantly, and build your conviction faster.
            </p>

            <div className="pt-8 flex flex-wrap items-center justify-center gap-4">
              <Link href="/companies" className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold shadow-[0_0_40px_-10px_rgba(79,70,229,0.5)] hover:shadow-[0_0_60px_-10px_rgba(79,70,229,0.7)] transition-all flex items-center gap-2 group">
                Start Exploring
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/companies?focus=true" className="px-8 py-3.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-semibold backdrop-blur-md transition-all flex items-center gap-2">
                <Search className="w-4 h-4 text-slate-400" />
                Global Search
                <span className="ml-2 px-2 py-0.5 bg-white/10 rounded text-[10px] text-slate-400 border border-white/5">⌘K</span>
              </Link>
              <button className="px-8 py-3.5 bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 hover:from-purple-500/30 hover:to-fuchsia-500/30 text-white border border-purple-500/30 hover:border-fuchsia-500/50 rounded-xl font-semibold backdrop-blur-md transition-all flex items-center gap-2">
                <Bot className="w-4 h-4 text-purple-300" />
                Book Demo
              </button>
            </div>
          </div>

          {/* Quick Access Cards */}
          <div className="grid md:grid-cols-3 gap-6 pt-12 border-t border-white/5 relative">
            {/* Glow line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>

            <Link href="/companies" className="group p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-indigo-500/30 transition-all backdrop-blur-md">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 mb-4 group-hover:scale-110 transition-transform">
                <Building2 className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-indigo-300 transition-colors">Directory</h3>
              <p className="text-sm text-slate-400 leading-relaxed">Access our global database of startups, filter by stage, and run live intelligent enrichments.</p>
            </Link>

            <Link href="/lists" className="group p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-purple-500/30 transition-all backdrop-blur-md">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 mb-4 group-hover:scale-110 transition-transform">
                <Activity className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">My Lists</h3>
              <p className="text-sm text-slate-400 leading-relaxed">Manage your curated watchlists, track movement, and export data directly to CSV or JSON.</p>
            </Link>

            <Link href="/saved" className="group p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-fuchsia-500/30 transition-all backdrop-blur-md">
              <div className="w-12 h-12 rounded-xl bg-fuchsia-500/10 flex items-center justify-center border border-fuchsia-500/20 mb-4 group-hover:scale-110 transition-transform">
                <Bookmark className="w-6 h-6 text-fuchsia-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-fuchsia-300 transition-colors">Saved Searches</h3>
              <p className="text-sm text-slate-400 leading-relaxed">Instantly recall complex queries and filters. Re-run your thesis parameters with one click.</p>
            </Link>
          </div>

          {/* Bottom Status / AI Agent mock */}
          <div className="flex items-center justify-center gap-3 pt-8 pb-4">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </div>
            <span className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
              <Bot className="w-3.5 h-3.5 text-slate-500" /> Intelligence Engine Online. Ready for live enrichment.
            </span>
          </div>

        </div>
      </div>

      <ChatBot />
    </div>
  );
}
