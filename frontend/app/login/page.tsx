"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />

            <main className="flex-1 flex items-center justify-center px-6 py-12">
                <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                    <div className="p-8 text-center bg-slate-900 text-white">
                        <h1 className="text-2xl font-bold mb-2">CivicFlow-AI Access</h1>
                        <p className="text-slate-400 text-sm">Select a role to enter demo mode.</p>
                    </div>

                    <div className="p-8 space-y-4">
                        <Link 
                            href="/citizen/report"
                            className="flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all group"
                        >
                            <div className="text-left">
                                <h3 className="font-bold text-slate-900 group-hover:text-blue-700">Citizen</h3>
                                <p className="text-xs text-slate-500">Report and track civic issues</p>
                            </div>
                            <span className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">&rarr;</span>
                        </Link>

                        <Link 
                            href="/dashboard"
                            className="flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all group"
                        >
                            <div className="text-left">
                                <h3 className="font-bold text-slate-900 group-hover:text-blue-700">Ward Officer</h3>
                                <p className="text-xs text-slate-500">Manage incident queues and map</p>
                            </div>
                            <span className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">&rarr;</span>
                        </Link>

                        <Link 
                            href="/dashboard/analytics"
                            className="flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all group"
                        >
                            <div className="text-left">
                                <h3 className="font-bold text-slate-900 group-hover:text-blue-700">Municipal Manager</h3>
                                <p className="text-xs text-slate-500">View city intelligence and analytics</p>
                            </div>
                            <span className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">&rarr;</span>
                        </Link>
                    </div>

                    <div className="p-4 bg-slate-50 border-t border-slate-100 text-center text-xs text-slate-500">
                        Authentication is currently simulated for portfolio demonstration.
                    </div>
                </div>
            </main>
            
            <Footer />
        </div>
    );
}
