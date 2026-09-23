"use client";

import { useEffect, useState } from "react";
import { getDashboardStats } from "@/services/dashboardService";
import type { DashboardStats } from "@/types/dashboard";
import Link from "next/link";

export default function DashboardOverviewPage() {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getDashboardStats().then(data => {
            setStats(data);
            setLoading(false);
        }).catch(() => setLoading(false));
    }, []);

    if (loading) {
        return <div className="p-10 text-slate-500">Loading overview...</div>;
    }

    return (
        <div className="p-10 max-w-7xl mx-auto">
            <div className="mb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Command Overview</h1>
                    <p className="text-slate-500 mt-2">Real-time pulse of city operations and open incidents.</p>
                </div>
                <div className="text-right">
                    <p className="text-sm text-slate-400">Last updated</p>
                    <p className="font-bold text-slate-700">{new Date().toLocaleTimeString()}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-2">Total Reports</h3>
                    <p className="text-4xl font-black text-slate-900">{stats?.total_reports || 0}</p>
                </div>
                <div className="bg-red-50 p-6 rounded-2xl border border-red-100 shadow-sm">
                    <h3 className="text-red-600 text-sm font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                        </span>
                        P1 Critical
                    </h3>
                    <p className="text-4xl font-black text-red-700">{stats?.p1_incidents || 0}</p>
                </div>
                <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100 shadow-sm">
                    <h3 className="text-amber-700 text-sm font-bold uppercase tracking-wider mb-2">Open Incidents</h3>
                    <p className="text-4xl font-black text-amber-800">{stats?.open_incidents || 0}</p>
                </div>
                <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 shadow-sm">
                    <h3 className="text-emerald-700 text-sm font-bold uppercase tracking-wider mb-2">Resolved Today</h3>
                    <p className="text-4xl font-black text-emerald-800">{stats?.resolved_today || 0}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                    <h2 className="text-xl font-bold text-slate-900 mb-4">Quick Actions</h2>
                    <div className="space-y-4">
                        <Link href="/dashboard/incidents" className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition">
                            <span className="font-semibold text-slate-700">Review Open Incidents</span>
                            <span className="text-slate-400">&rarr;</span>
                        </Link>
                        <Link href="/dashboard/map" className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition">
                            <span className="font-semibold text-slate-700">View Active Hotspots</span>
                            <span className="text-slate-400">&rarr;</span>
                        </Link>
                        <Link href="/dashboard/assistant" className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition">
                            <span className="font-semibold text-slate-700">Ask Intelligence Assistant</span>
                            <span className="text-slate-400">&rarr;</span>
                        </Link>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm bg-gradient-to-br from-blue-600 to-cyan-500 text-white">
                    <h2 className="text-xl font-bold mb-4">System Status</h2>
                    <p className="text-blue-100 mb-6">CivicFlow AI engine is fully operational. Real-time clustering and semantic deduplication are active.</p>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center border-b border-blue-500/50 pb-2">
                            <span className="text-blue-200">Incident Clustering</span>
                            <span className="font-bold text-emerald-300">ONLINE</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-blue-500/50 pb-2">
                            <span className="text-blue-200">Priority Engine</span>
                            <span className="font-bold text-emerald-300">ONLINE</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-blue-200">Department Routing</span>
                            <span className="font-bold text-emerald-300">ONLINE</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}