import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function SignupPage() {
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
                    Already have an account? <Link href="/login" className="text-indigo-400 hover:text-indigo-300 transition-colors">Log in</Link>
                </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-6 relative z-10 w-full max-w-md mx-auto">
                <div className="w-full bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-2xl relative">
                    {/* Glow line */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>

                    <div className="text-center space-y-2 mb-8">
                        <h1 className="text-3xl font-extrabold tracking-tight text-white">Create Account</h1>
                        <p className="text-sm text-slate-400">Join intelligence framework for venture teams.</p>
                    </div>

                    <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">First Name</label>
                                <input
                                    type="text"
                                    placeholder="Jane"
                                    className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder:text-slate-600 font-medium"
                                    required
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Last Name</label>
                                <input
                                    type="text"
                                    placeholder="Doe"
                                    className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder:text-slate-600 font-medium"
                                    required
                                />
                            </div>
                        </div>

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
                            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder:text-slate-600 font-medium"
                                required
                                minLength={8}
                            />
                        </div>

                        <Link href="/companies" className="w-full mt-4 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold shadow-[0_0_20px_-5px_rgba(79,70,229,0.3)] transition-all flex items-center justify-center gap-2">
                            Create Account
                        </Link>
                    </form>

                    <p className="mt-6 text-center text-xs text-slate-500 leading-relaxed">
                        By creating an account, you agree to our <a href="#" className="text-indigo-400 hover:underline">Terms of Service</a> and <a href="#" className="text-indigo-400 hover:underline">Privacy Policy</a>.
                    </p>
                </div>
            </div>
        </div>
    );
}
