
"use client";

import { useEffect, useMemo, useState } from "react";
import { getReports } from "@/services/reportService";
import type { Report } from "@/types/report";

export default function ReportsTable() {
    const [reports, setReports] = useState<Report[]>([]);
    const [search, setSearch] = useState("");
    const [severity, setSeverity] = useState("All");
    const [priority, setPriority] = useState("All");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let active = true;

        async function loadReports() {
            try {
                const data = await getReports();

                if (active) {
                    setReports(data);
                }
            } catch {
                if (active) {
                    setError("Failed to load reports.");
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        }

        loadReports();

        return () => {
            active = false;
        };
    }, []);

    const filteredReports = useMemo(() => {
        return reports.filter((report) => {
            const searchableText = [
                report.id,
                report.title,
                report.description,
                report.location,
                report.category,
            ]
                .join(" ")
                .toLowerCase();

            const matchesSearch = searchableText.includes(
                search.toLowerCase().trim()
            );

            const matchesSeverity =
                severity === "All" ||
                report.severity?.toLowerCase() ===
                severity.toLowerCase();

            const matchesPriority =
                priority === "All" ||
                report.priority?.toLowerCase() ===
                priority.toLowerCase();

            return (
                matchesSearch &&
                matchesSeverity &&
                matchesPriority
            );
        });
    }, [reports, search, severity, priority]);

    if (loading) {
        return <p>Loading reports...</p>;
    }

    if (error) {
        return <p role="alert">{error}</p>;
    }

    return (
        <section className="bg-white">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 border-b border-slate-100 pb-4">
                <div>
                    <h2 className="text-xl font-bold text-slate-900">Reports Management</h2>
                    <p className="text-sm text-slate-500">
                        Showing {filteredReports.length} of {reports.length} reports
                    </p>
                </div>

                <div className="flex flex-wrap gap-3 w-full md:w-auto">
                    <input
                        type="search"
                        placeholder="Search reports..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="rounded-xl border border-slate-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 min-w-[200px]"
                    />

                    <select
                        value={severity}
                        onChange={(e) => setSeverity(e.target.value)}
                        className="rounded-xl border border-slate-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    >
                        <option value="All">All Severities</option>
                        <option value="Critical">Critical</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>

                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="rounded-xl border border-slate-300 px-4 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    >
                        <option value="All">All Priorities</option>
                        <option value="Urgent">Urgent</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse whitespace-nowrap">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider font-semibold text-slate-500">
                            <th className="p-4">ID</th>
                            <th className="p-4">Title</th>
                            <th className="p-4">Category</th>
                            <th className="p-4">Severity</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Location</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredReports.map((report) => (
                            <tr key={report.id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                                <td className="p-4 font-mono text-sm text-slate-600">REP-{report.id}</td>
                                <td className="p-4">
                                    <span className="font-semibold text-slate-900 text-sm block truncate max-w-[250px]">{report.title}</span>
                                </td>
                                <td className="p-4 text-sm text-slate-600">{report.category ?? "—"}</td>
                                <td className="p-4">
                                    <span className={`px-2.5 py-1 rounded text-xs font-bold
                                        ${report.severity === 'Critical' ? 'bg-red-100 text-red-700' : 
                                          report.severity === 'High' ? 'bg-orange-100 text-orange-700' : 
                                          report.severity === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 
                                          report.severity === 'Low' ? 'bg-green-100 text-green-700' :
                                          'bg-slate-100 text-slate-700'}`}>
                                        {report.severity ?? "—"}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold tracking-wide
                                        ${report.status === 'OPEN' ? 'bg-amber-100 text-amber-800' : 
                                          report.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800' : 
                                          report.status === 'RESOLVED' ? 'bg-emerald-100 text-emerald-800' :
                                          'bg-slate-100 text-slate-700'}`}>
                                        {report.status ?? "OPEN"}
                                    </span>
                                </td>
                                <td className="p-4 text-sm text-slate-600 truncate max-w-[200px]">{report.location}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredReports.length === 0 && (
                    <div className="py-12 text-center text-slate-500">
                        No matching reports found.
                    </div>
                )}
            </div>
        </section>
    );
}