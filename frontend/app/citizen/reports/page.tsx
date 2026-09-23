"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReportCard from "@/components/ReportCard";
import { getReports } from "@/services/reportService";
import type { Report } from "@/types/report";
import Link from "next/link";

export default function MyReportsPage() {
    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchReports() {
            try {
                const data = await getReports();
                setReports(data);
            } catch (err) {
                setError("Unable to load reports.");
            } finally {
                setLoading(false);
            }
        }
        fetchReports();
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />
            
            <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12">
                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">My Reports</h1>
                        <p className="mt-2 text-slate-600">Track the status of civic issues you've reported.</p>
                    </div>
                    <Link href="/citizen/report" className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition">
                        + New Report
                    </Link>
                </div>

                {loading ? (
                    <div className="text-slate-500 py-20 text-center">Loading your reports...</div>
                ) : error ? (
                    <div className="text-red-500 py-20 text-center">{error}</div>
                ) : reports.length === 0 ? (
                    <div className="bg-white rounded-2xl p-16 text-center border border-slate-200">
                        <div className="text-4xl mb-4">📝</div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">No reports yet</h3>
                        <p className="text-slate-500 mb-6">You haven't reported any civic issues.</p>
                        <Link href="/citizen/report" className="text-blue-600 font-semibold hover:underline">
                            Report your first issue &rarr;
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {reports.map((report) => (
                            <Link href={`/citizen/reports/${report.id}`} key={report.id} className="block transition hover:scale-[1.02]">
                                <ReportCard report={report} />
                            </Link>
                        ))}
                    </div>
                )}
            </main>
            
            <Footer />
        </div>
    );
}
