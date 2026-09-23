"use client";

import { useState, useMemo } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

import type { Report } from "@/types/report";
import type { Hotspot } from "@/types/analytics";

interface ReportsMapProps {
    reports: Report[];
    hotspots: Hotspot[];
}

const markerIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

const hotspotIcon = L.divIcon({
    className: "hotspot-marker bg-rose-100 border-2 border-rose-500 rounded-full flex items-center justify-center text-lg shadow-lg",
    html: `🔥`,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -18],
});

export default function ReportsMap({
    reports,
    hotspots,
}: ReportsMapProps) {

    const [severityFilter, setSeverityFilter] = useState("All");
    const [priorityFilter, setPriorityFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("All");

    const mappedReports = useMemo(() => {
        return reports.filter((report) => {
            if (report.latitude === null || report.latitude === undefined || report.longitude === null || report.longitude === undefined) {
                return false;
            }
            if (severityFilter !== "All" && report.severity !== severityFilter) return false;
            if (priorityFilter !== "All" && report.priority !== priorityFilter) return false;
            if (statusFilter !== "All" && report.status !== statusFilter) return false;
            return true;
        });
    }, [reports, severityFilter, priorityFilter, statusFilter]);

    return (
        <div className="relative w-full h-[600px] rounded-2xl overflow-hidden border border-slate-200 shadow-sm z-0">
            
            {/* Floating Filters */}
            <div className="absolute top-4 right-4 z-[400] bg-white/90 backdrop-blur p-4 rounded-xl shadow-lg border border-slate-200 flex flex-col gap-3 w-64">
                <h3 className="text-sm font-bold text-slate-800">Map Filters</h3>
                
                <select value={severityFilter} onChange={e => setSeverityFilter(e.target.value)} className="w-full text-sm rounded-lg border-slate-300 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500">
                    <option value="All">All Severities</option>
                    <option value="Critical">Critical</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>

                <select value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)} className="w-full text-sm rounded-lg border-slate-300 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500">
                    <option value="All">All Priorities</option>
                    <option value="Urgent">Urgent</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>

                <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="w-full text-sm rounded-lg border-slate-300 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500">
                    <option value="All">All Statuses</option>
                    <option value="OPEN">Open</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="RESOLVED">Resolved</option>
                </select>

                <div className="text-xs text-slate-500 mt-2">
                    Showing {mappedReports.length} reports
                </div>
            </div>

            <MapContainer
                center={[17.6605, 75.9072]}
                zoom={13}
                scrollWheelZoom={true}
                style={{ height: "100%", width: "100%", zIndex: 0 }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Individual Report Markers */}
                {mappedReports.map((report) => (
                    <Marker
                        key={report.id}
                        position={[report.latitude!, report.longitude!]}
                        icon={markerIcon}
                    >
                        <Popup className="civic-popup">
                            <div className="p-1 max-w-xs">
                                <div className="text-xs font-bold text-slate-500 mb-1">REP-{report.id} {report.incident_id && `• INC-${report.incident_id}`}</div>
                                <h4 className="text-sm font-bold text-slate-900 leading-tight mb-2">{report.title}</h4>
                                
                                <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                                    <div>
                                        <span className="block text-slate-500">Category</span>
                                        <span className="font-semibold text-slate-700">{report.category || 'Uncategorized'}</span>
                                    </div>
                                    <div>
                                        <span className="block text-slate-500">Severity</span>
                                        <span className={`font-bold ${report.severity === 'Critical' ? 'text-red-600' : report.severity === 'High' ? 'text-orange-500' : 'text-slate-700'}`}>{report.severity || 'N/A'}</span>
                                    </div>
                                    <div>
                                        <span className="block text-slate-500">Status</span>
                                        <span className="font-semibold text-slate-700">{report.status || 'OPEN'}</span>
                                    </div>
                                    <div>
                                        <span className="block text-slate-500">Priority</span>
                                        <span className="font-semibold text-slate-700">{report.priority || 'N/A'}</span>
                                    </div>
                                </div>
                                
                                <div className="text-xs text-slate-600 border-t pt-2">
                                    <strong>📍 Location:</strong> {report.location}
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                ))}

                {/* Hotspot Markers */}
                {hotspots.map((hotspot, index) => (
                    <Marker
                        key={`hotspot-${index}`}
                        position={[hotspot.latitude, hotspot.longitude]}
                        icon={hotspotIcon}
                    >
                        <Popup>
                            <div className="p-2 text-center">
                                <h4 className="text-sm font-bold text-rose-600 mb-1">🔥 Civic Hotspot</h4>
                                <p className="text-xs text-slate-600">
                                    <strong>{hotspot.count}</strong> related incidents in this area.
                                </p>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}