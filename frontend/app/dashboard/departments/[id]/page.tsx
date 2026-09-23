"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getIncidents } from "@/services/incidentService";
import type { Incident } from "@/types/incident";
import IncidentActionModal from "@/components/IncidentActionModal";

const DEPARTMENTS = {
    "water": { name: "Water Supply Department", icon: "💧", head: "Rajesh Kumar" },
    "road": { name: "Road & Infrastructure Department", icon: "🚧", head: "Sunil Verma" },
    "waste": { name: "Solid Waste Management Department", icon: "🗑️", head: "Anita Desai" },
    "drainage": { name: "Drainage & Sewerage Department", icon: "🌊", head: "Vikram Singh" },
    "lighting": { name: "Street Lighting Department", icon: "💡", head: "Ramesh Patel" },
    "health": { name: "Public Health Department", icon: "🏥", head: "Dr. Smita Rao" },
    "fire": { name: "Fire & Emergency Services", icon: "🚒", head: "Captain Abhay" },
    "parks": { name: "Parks & Garden Department", icon: "🌳", head: "Meena Iyer" },
    "building": { name: "Building & Town Planning Department", icon: "🏗️", head: "Sanjay Gupta" },
    "electrical": { name: "Electrical Department", icon: "⚡", head: "Prakash Sharma" },
    "sanitation": { name: "Sanitation Department", icon: "🧹", head: "Kiran Joshi" },
    "public-works": { name: "Public Works Department", icon: "🛣️", head: "Anand Thakur" },
};

export default function DepartmentHeadPage() {
    const params = useParams();
    const router = useRouter();
    const deptId = params.id as string;
    
    const [incidents, setIncidents] = useState<Incident[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);

    const deptInfo = DEPARTMENTS[deptId as keyof typeof DEPARTMENTS];

    useEffect(() => {
        if (!deptInfo) {
            router.push("/dashboard/departments");
            return;
        }

        getIncidents().then(data => {
            const filtered = data.filter(i => i.department === deptInfo.name);
            setIncidents(filtered);
            setLoading(false);
        }).catch(err => {
            console.error(err);
            setLoading(false);
        });
    }, [deptId, deptInfo, router]);

    if (!deptInfo) return null;

    const handleUpdate = (updated: Incident) => {
        setIncidents(prev => prev.map(i => i.id === updated.id ? updated : i));
        setSelectedIncident(null);
    };

    return (
        <div className="p-10 max-w-7xl mx-auto">
            <button onClick={() => router.push("/dashboard/departments")} className="text-blue-600 font-semibold mb-6 flex items-center hover:underline">
                &larr; Back to Departments
            </button>
            
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm mb-8 flex items-center justify-between">
                <div>
                    <div className="text-4xl mb-2">{deptInfo.icon}</div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{deptInfo.name}</h1>
                    <p className="text-slate-500 mt-1">Department Head: <strong>{deptInfo.head}</strong></p>
                </div>
                <div className="text-right flex gap-6">
                    <div>
                        <p className="text-sm font-bold text-slate-500 uppercase">Assigned Incidents</p>
                        <p className="text-4xl font-black text-slate-800">{incidents.length}</p>
                    </div>
                    <div>
                        <p className="text-sm font-bold text-red-500 uppercase">Critical Priority</p>
                        <p className="text-4xl font-black text-red-600">{incidents.filter(i => i.severity === 'Critical' && i.status !== 'RESOLVED').length}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-200 bg-slate-50">
                    <h2 className="text-lg font-bold text-slate-900">Incident Queue</h2>
                </div>
                
                {loading ? (
                    <div className="p-10 text-center text-slate-500">Loading assignments...</div>
                ) : incidents.length === 0 ? (
                    <div className="p-10 text-center text-slate-500">No incidents assigned to this department.</div>
                ) : (
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider font-semibold text-slate-500">
                                <th className="p-4">ID</th>
                                <th className="p-4">Summary</th>
                                <th className="p-4">Location</th>
                                <th className="p-4">Severity</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {incidents.map(incident => (
                                <tr key={incident.id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                                    <td className="p-4 font-mono text-sm text-slate-600">INC-{incident.id}</td>
                                    <td className="p-4">
                                        <p className="text-sm font-semibold text-slate-900 line-clamp-1">{incident.summary}</p>
                                        <p className="text-xs text-slate-500">{incident.category}</p>
                                    </td>
                                    <td className="p-4 text-sm text-slate-600 truncate max-w-[200px]">{incident.location}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold
                                            ${incident.severity === 'Critical' ? 'bg-red-100 text-red-700' : 
                                              incident.severity === 'High' ? 'bg-orange-100 text-orange-700' : 
                                              incident.severity === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 
                                              'bg-green-100 text-green-700'}`}>
                                            {incident.severity}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold
                                            ${incident.status === 'OPEN' ? 'bg-amber-100 text-amber-800' : 
                                              incident.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800' : 
                                              'bg-emerald-100 text-emerald-800'}`}>
                                            {incident.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <button 
                                            onClick={() => setSelectedIncident(incident)}
                                            className="text-blue-600 hover:text-blue-800 font-semibold text-sm transition"
                                        >
                                            Manage &rarr;
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {selectedIncident && (
                <IncidentActionModal 
                    incident={selectedIncident} 
                    onClose={() => setSelectedIncident(null)} 
                    onUpdate={handleUpdate} 
                />
            )}
        </div>
    );
}
