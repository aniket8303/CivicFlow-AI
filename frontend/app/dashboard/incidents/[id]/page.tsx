"use client";

import { useEffect, useState, use } from "react";
import { getIncidentById, updateIncidentStatus } from "@/services/incidentService";
import type { IncidentDetail } from "@/types/incident";
import PriorityBadge from "@/components/PriorityBadge";
import StatusBadge from "@/components/StatusBadge";
import Link from "next/link";

export default function IncidentDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);
    const incidentId = parseInt(id, 10);

    const [incident, setIncident] = useState<IncidentDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        fetchIncident();
    }, [incidentId]);

    async function fetchIncident() {
        try {
            const data = await getIncidentById(incidentId);
            setIncident(data);
        } catch (err) {
            setError("Unable to load incident details.");
        } finally {
            setLoading(false);
        }
    }

    async function handleStatusChange(newStatus: string) {
        setUpdating(true);
        try {
            await updateIncidentStatus(incidentId, { status: newStatus });
            await fetchIncident();
        } catch (err) {
            alert("Failed to update status");
        } finally {
            setUpdating(false);
        }
    }

    if (loading) return <div className="p-10">Loading incident...</div>;
    if (error || !incident) return <div className="p-10 text-red-600">{error || "Incident not found"}</div>;

    return (
        <div className="p-10 max-w-5xl mx-auto">
            <div className="mb-6">
                <Link href="/dashboard/incidents" className="text-blue-600 hover:underline">
                    &larr; Back to Incidents
                </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-sm ring-1 ring-slate-200 p-8 mb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">INCIDENT #{incident.id}</h1>
                        <p className="text-slate-500 mt-1">{incident.category} &bull; {incident.location}</p>
                    </div>
                    <div className="flex gap-3">
                        <StatusBadge status={incident.status} />
                        <PriorityBadge priority={incident.priority} />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div>
                        <h3 className="text-sm font-semibold text-slate-500 uppercase mb-2">Details</h3>
                        <div className="space-y-3">
                            <div>
                                <span className="block text-slate-500 text-sm">Department</span>
                                <span className="font-medium text-slate-900">{incident.department}</span>
                            </div>
                            <div>
                                <span className="block text-slate-500 text-sm">Severity</span>
                                <span className="font-medium text-slate-900">{incident.severity}</span>
                            </div>
                            <div>
                                <span className="block text-slate-500 text-sm">AI Summary</span>
                                <p className="text-slate-700 bg-slate-50 p-3 rounded-lg text-sm mt-1 ring-1 ring-slate-200">
                                    {incident.summary}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-slate-500 uppercase mb-2">Actions</h3>
                        <div className="bg-slate-50 p-4 rounded-xl ring-1 ring-slate-200 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Update Status</label>
                                <select 
                                    className="w-full rounded-md border-slate-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                                    value={incident.status}
                                    onChange={(e) => handleStatusChange(e.target.value)}
                                    disabled={updating}
                                >
                                    <option value="OPEN">OPEN</option>
                                    <option value="ACKNOWLEDGED">ACKNOWLEDGED</option>
                                    <option value="IN PROGRESS">IN PROGRESS</option>
                                    <option value="RESOLVED">RESOLVED</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mb-6">Citizen Reports ({incident.reports.length})</h2>
            
            <div className="space-y-4">
                {incident.reports.map(report => (
                    <div key={report.id} className="bg-white rounded-xl shadow-sm ring-1 ring-slate-200 p-6">
                        <div className="flex justify-between mb-2">
                            <h4 className="font-semibold text-slate-900">{report.title}</h4>
                            <span className="text-sm text-slate-500">{report.location}</span>
                        </div>
                        <p className="text-slate-600 text-sm">{report.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
