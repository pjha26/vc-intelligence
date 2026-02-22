"use client";

import Link from "next/link";
import { Sparkles, ArrowRight, Building2, Bookmark, Activity, Search, Bot } from "lucide-react";

export default function LoginPage() {
    return (
        <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 overflow-hidden relative">
            {/* Radiant Background Effects */}
            <div className="absolute top-0 inset-x-0 h-[600px] pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-transparent"></div>
                <div className="absolute top-[-20%] left-1/4 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse duration-10000"></div>
                <div className="absolute top-[-10%] right-1/4 w-[500px] h-[500px] bg-fuchsia-600/10 rounded-full blur-[100px] mix-blend-screen"></div>
            </div>

            <div className="w-full flex items-center justify-between p-6 relative z-20">
                <Link href="/" className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors">
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    <span className="text-xs font-semibold tracking-wider uppercase text-indigo-300">Acme Capital</span>
                </Link>
                <div className="text-sm font-medium text-slate-400">
                    Don't have an account? <Link href="/signup" className="text-indigo-400 hover:text-indigo-300 transition-colors">Sign up</Link>
                </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-6 relative z-10 w-full max-w-md mx-auto">
                <div className="w-full bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-2xl relative">
                    {/* Glow line */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>

                    <div className="text-center space-y-2 mb-8">
                        <h1 className="text-3xl font-extrabold tracking-tight text-white">Welcome back</h1>
                        <p className="text-sm text-slate-400">Log in to your intelligence workspace.</p>
                    </div>

                    <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Work Email</label>
                            <input
                                type="email"
                                placeholder="jane@acmecap.com"
                                className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder:text-slate-600 font-medium"
                                required
                            />
                        </div>
                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Password</label>
                                <a href="#" className="text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors">Forgot password?</a>
                            </div>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder:text-slate-600 font-medium"
                                required
                            />
                        </div>

                        <Link href="/companies" className="w-full mt-2 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold shadow-[0_0_20px_-5px_rgba(79,70,229,0.3)] transition-all flex items-center justify-center gap-2">
                            Sign In to Workspace
                        </Link>
                    </form>

                    <div className="mt-8 flex items-center justify-center gap-2">
                        <div className="h-px bg-white/10 w-full"></div>
                        <span className="text-xs font-medium text-slate-500 shrink-0 uppercase tracking-wider px-2">Secure SSO</span>
                        <div className="h-px bg-white/10 w-full"></div>
                    </div>

                    <button className="w-full mt-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-3 text-slate-300 hover:text-white">
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            <path d="M1 1h22v22H1z" fill="none" />
                        </svg>
                        Continue with Google
                    </button>

                    {/* Bottom Status / AI Agent mock */}
                    <div className="flex items-center justify-center gap-2 mt-8">
                        <div className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </div>
                        <span className="text-[10px] font-medium text-slate-500 flex items-center gap-1.5 uppercase tracking-wider">
                            Intelligence Engine Active
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
