"use client";

import { useEffect, useState } from "react";
import IncidentTable from "@/components/IncidentTable";
import { getIncidents } from "@/services/incidentService";
import type { Incident } from "@/types/incident";

export default function IncidentsPage() {
    const [incidents, setIncidents] = useState<Incident[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchIncidents() {
            try {
                const data = await getIncidents();
                setIncidents(data);
            } catch (err) {
                setError("Unable to load incidents.");
            } finally {
                setLoading(false);
            }
        }
        fetchIncidents();
    }, []);

    if (loading) {
        return (
            <div className="p-10">
                <h1 className="text-2xl font-bold text-slate-900 mb-6">Incident Queue</h1>
                <p>Loading incidents...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-10">
                <h1 className="text-2xl font-bold text-slate-900 mb-6">Incident Queue</h1>
                <p className="text-red-600">{error}</p>
            </div>
        );
    }

    return (
        <div className="p-10 max-w-7xl mx-auto">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Incident Queue</h1>
                    <p className="mt-2 text-slate-500">
                        Manage operational incidents clustered from citizen reports.
                    </p>
                </div>
                <div className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-800">
                    {incidents.length} Total Incidents
                </div>
            </div>

            <IncidentTable incidents={incidents} />
        </div>
    );
}
