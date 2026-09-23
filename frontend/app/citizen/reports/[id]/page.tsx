"use client";

import { useEffect, useState, use } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getReports } from "@/services/reportService";
import type { Report } from "@/types/report";
import Link from "next/link";
import PriorityBadge from "@/components/PriorityBadge";

export default function ReportDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);
    const reportId = parseInt(id, 10);
    const [report, setReport] = useState<Report | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchReport() {
            try {
                // Fetch all and find (simulating GET /reports/:id for demo if needed)
                const data = await getReports();
                const found = data.find(r => r.id === reportId) || null;
                setReport(found);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchReport();
    }, [reportId]);

    if (loading) return <div className="min-h-screen p-20 text-center">Loading report details...</div>;
    if (!report) return <div className="min-h-screen p-20 text-center text-red-600">Report not found.</div>;

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />
            
            <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12">
                <div className="mb-6">
                    <Link href="/citizen/reports" className="text-blue-600 font-semibold hover:underline">
                        &larr; Back to My Reports
                    </Link>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="bg-slate-900 p-8 text-white">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                            <span className="bg-blue-600/30 text-blue-300 border border-blue-500/50 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide inline-block w-max">
                                {report.category}
                            </span>
                            <span className="text-slate-400 text-sm">
                                {new Date(report.created_at || Date.now()).toLocaleString()}
                            </span>
                        </div>
                        <h1 className="text-3xl font-bold mb-2">{report.title}</h1>
                        <p className="text-slate-400 flex items-center gap-2">
                            📍 {report.location}
                        </p>
                    </div>

                    <div className="p-8">
                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Description</h3>
                        <p className="text-slate-700 whitespace-pre-wrap mb-8 bg-slate-50 p-4 rounded-xl">
                            {report.description}
                        </p>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">AI Analysis</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                                        <span className="text-slate-600">Severity</span>
                                        <span className="font-semibold text-slate-900">{report.severity}</span>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                                        <span className="text-slate-600">Priority</span>
                                        <PriorityBadge priority={report.priority || "UNKNOWN"} />
                                    </div>
                                    <div className="flex justify-between items-center pb-3">
                                        <span className="text-slate-600">Clustered Incident</span>
                                        {report.incident_id ? (
                                            <span className="font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">INC-{report.incident_id}</span>
                                        ) : (
                                            <span className="text-slate-400 italic">Processing...</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            
                            <div>
                                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Tracking Timeline</h3>
                                <div className="relative border-l-2 border-blue-200 ml-3 space-y-6">
                                    <div className="relative pl-6">
                                        <div className="absolute w-3 h-3 bg-blue-600 rounded-full -left-[7px] top-1.5"></div>
                                        <p className="font-bold text-slate-900 text-sm">Report Submitted</p>
                                        <p className="text-xs text-slate-500">You submitted the civic issue.</p>
                                    </div>
                                    <div className="relative pl-6">
                                        <div className="absolute w-3 h-3 bg-blue-600 rounded-full -left-[7px] top-1.5"></div>
                                        <p className="font-bold text-slate-900 text-sm">AI Analysis Complete</p>
                                        <p className="text-xs text-slate-500">Categorized as {report.category} ({report.severity})</p>
                                    </div>
                                    {report.incident_id && (
                                        <div className="relative pl-6">
                                            <div className="absolute w-3 h-3 bg-amber-500 rounded-full -left-[7px] top-1.5 ring-4 ring-amber-100"></div>
                                            <p className="font-bold text-amber-600 text-sm">Routed to Department</p>
                                            <p className="text-xs text-slate-500">Incident INC-{report.incident_id} is awaiting officer action.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
