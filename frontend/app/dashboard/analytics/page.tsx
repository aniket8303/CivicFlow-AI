"use client";

import { useEffect, useState } from "react";
import AnalyticsCharts from "@/components/AnalyticsCharts";
import { getAnalyticsOverview } from "@/services/analyticsService";
import type { AnalyticsOverview } from "@/types/analytics";

export default function DashboardAnalyticsPage() {
    const [analytics, setAnalytics] = useState<AnalyticsOverview | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAnalyticsOverview().then(data => {
            setAnalytics(data);
            setLoading(false);
        }).catch(() => setLoading(false));
    }, []);

    if (loading) return <div className="p-10 text-slate-500">Loading analytics...</div>;

    return (
        <div className="p-10 max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Intelligence Analytics</h1>
                <p className="text-slate-500 mt-2">Deep dive into category distribution and operational metrics.</p>
            </div>

            {analytics && (
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <AnalyticsCharts analytics={analytics} />
                </div>
            )}
        </div>
    );
}
