"use client";

import { useEffect, useState } from "react";
import { getReports } from "@/services/reportService";
import type { Report } from "@/types/report";
import ReportsTable from "@/components/ReportsTable";

export default function DashboardReportsPage() {
    return (
        <div className="p-10 max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Raw Citizen Reports</h1>
                <p className="text-slate-500 mt-2">Incoming unstructured complaints before AI clustering.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden p-6">
                <ReportsTable />
            </div>
        </div>
    );
}
