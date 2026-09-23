"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { getReports } from "@/services/reportService";
import { getHotspots } from "@/services/analyticsService";

const ReportsMap = dynamic(() => import("@/components/ReportsMap"), { ssr: false });

export default function DashboardMapPage() {
    const [reports, setReports] = useState([]);
    const [hotspots, setHotspots] = useState([]);

    useEffect(() => {
        Promise.all([getReports(), getHotspots()]).then(([rep, hot]) => {
            setReports(rep as any);
            setHotspots(hot as any);
        });
    }, []);

    return (
        <div className="h-full flex flex-col">
            <div className="p-6 bg-white border-b border-slate-200 shadow-sm z-10 flex-shrink-0">
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight mb-1">Intelligence Map</h1>
                <p className="text-sm text-slate-500">Geospatial overview of civic issues and predicted hotspots.</p>
            </div>

            <div className="flex-1 relative z-0">
                <ReportsMap reports={reports} hotspots={hotspots} />
            </div>
        </div>
    );
}
