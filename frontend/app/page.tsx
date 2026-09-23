import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Home() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />

            <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20 relative overflow-hidden">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100 via-slate-50 to-slate-50 opacity-50"></div>

                <div className="max-w-4xl">
                    <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/50 text-blue-700 text-sm font-semibold tracking-wide border border-blue-200">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        CIVIC INTELLIGENCE PLATFORM
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-8">
                        Turn citizen reports into <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">actionable city intelligence.</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                        CivicFlow-AI uses AI, semantic similarity and operational analytics to transform unstructured civic reports into prioritized, deduplicated and actionable incidents.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link 
                            href="/citizen/report" 
                            className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all active:scale-95 text-lg"
                        >
                            Report an Issue
                        </Link>
                        <Link 
                            href="/login" 
                            className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-900 font-bold rounded-xl shadow-sm border border-slate-200 transition-all active:scale-95 text-lg"
                        >
                            Explore Dashboard
                        </Link>
                    </div>
                </div>

                <div className="mt-20 w-full max-w-5xl">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-left">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                            <div className="text-2xl mb-3">📝</div>
                            <h3 className="font-bold text-slate-900 text-lg mb-2">Citizen Report</h3>
                            <p className="text-slate-600 text-sm">Citizens report issues with descriptions and locations.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 relative">
                            <div className="text-2xl mb-3">🧠</div>
                            <h3 className="font-bold text-slate-900 text-lg mb-2">AI Analysis</h3>
                            <p className="text-slate-600 text-sm">AI classifies, summarizes, and detects semantic duplicates.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                            <div className="text-2xl mb-3">⚡</div>
                            <h3 className="font-bold text-slate-900 text-lg mb-2">Incident Intelligence</h3>
                            <p className="text-slate-600 text-sm">Reports are clustered into prioritized operational incidents.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                            <div className="text-2xl mb-3">🏢</div>
                            <h3 className="font-bold text-slate-900 text-lg mb-2">Municipal Action</h3>
                            <p className="text-slate-600 text-sm">Routed directly to the correct department for resolution.</p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}