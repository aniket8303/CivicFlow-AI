"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getIncidents } from "@/services/incidentService";
import type { Incident } from "@/types/incident";

const DEPARTMENTS = [
    { id: "water", name: "Water Supply Department", icon: "💧", head: "Rajesh Kumar" },
    { id: "road", name: "Road & Infrastructure Department", icon: "🚧", head: "Sunil Verma" },
    { id: "waste", name: "Solid Waste Management Department", icon: "🗑️", head: "Anita Desai" },
    { id: "drainage", name: "Drainage & Sewerage Department", icon: "🌊", head: "Vikram Singh" },
    { id: "lighting", name: "Street Lighting Department", icon: "💡", head: "Ramesh Patel" },
    { id: "health", name: "Public Health Department", icon: "🏥", head: "Dr. Smita Rao" },
    { id: "fire", name: "Fire & Emergency Services", icon: "🚒", head: "Captain Abhay" },
    { id: "parks", name: "Parks & Garden Department", icon: "🌳", head: "Meena Iyer" },
    { id: "building", name: "Building & Town Planning Department", icon: "🏗️", head: "Sanjay Gupta" },
    { id: "electrical", name: "Electrical Department", icon: "⚡", head: "Prakash Sharma" },
    { id: "sanitation", name: "Sanitation Department", icon: "🧹", head: "Kiran Joshi" },
    { id: "public-works", name: "Public Works Department", icon: "🛣️", head: "Anand Thakur" },
];

export default function DashboardDepartmentsPage() {
    const [incidents, setIncidents] = useState<Incident[]>([]);

    useEffect(() => {
        getIncidents().then(setIncidents).catch(console.error);
    }, []);

    const getStats = (deptName: string) => {
        const deptIncidents = incidents.filter(i => i.department === deptName);
        const active = deptIncidents.filter(i => i.status !== "RESOLVED").length;
        const p1 = deptIncidents.filter(i => i.priority === "Urgent" || i.severity === "Critical").length;
        return { active, p1 };
    };

    return (
        <div className="p-10 max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Municipal Departments</h1>
                <p className="text-slate-500 mt-2">Manage workloads, personnel, and civic routing across 12 primary municipal divisions.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {DEPARTMENTS.map(dept => {
                    const stats = getStats(dept.name);
                    return (
                        <Link href={`/dashboard/departments/${dept.id}`} key={dept.id} className="block group">
                            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm group-hover:shadow-lg group-hover:border-blue-300 transition-all h-full flex flex-col justify-between">
                                <div>
                                    <div className="text-4xl mb-4">{dept.icon}</div>
                                    <h2 className="text-lg font-bold text-slate-900 leading-tight mb-1">{dept.name}</h2>
                                    <p className="text-xs text-slate-500 font-medium mb-4">Head: {dept.head}</p>
                                </div>
                                
                                <div className="flex gap-3">
                                    <div className="flex-1 bg-slate-50 rounded-xl p-3 text-center border border-slate-100 group-hover:bg-blue-50 transition-colors">
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Active</p>
                                        <p className="text-xl font-black text-slate-800">{stats.active}</p>
                                    </div>
                                    <div className="flex-1 bg-rose-50 rounded-xl p-3 text-center border border-rose-100">
                                        <p className="text-[10px] font-bold text-rose-500 uppercase tracking-wider mb-1">Critical</p>
                                        <p className="text-xl font-black text-rose-700">{stats.p1}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
