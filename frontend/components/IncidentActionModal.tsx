"use client";

import { useState } from "react";
import type { Incident } from "@/types/incident";
import { updateIncidentStatus } from "@/services/incidentService";

interface IncidentActionModalProps {
    incident: Incident;
    onClose: () => void;
    onUpdate: (updated: Incident) => void;
}

export default function IncidentActionModal({ incident, onClose, onUpdate }: IncidentActionModalProps) {
    const [status, setStatus] = useState(incident.status || "OPEN");
    const [assignedTo, setAssignedTo] = useState(incident.assigned_to || "");
    const [remarks, setRemarks] = useState(incident.remarks || "");
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const updated = await updateIncidentStatus(incident.id, {
                status,
                assigned_to: assignedTo,
                remarks
            });
            onUpdate(updated);
        } catch (error) {
            console.error("Failed to update incident", error);
            alert("Failed to save changes.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[999] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900">Manage Incident INC-{incident.id}</h2>
                        <p className="text-sm text-slate-500 mt-1">{incident.category} • {incident.department}</p>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-6 overflow-y-auto space-y-6">
                    <div>
                        <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2">Location & Details</h3>
                        <p className="text-sm text-slate-900 bg-slate-50 p-4 rounded-xl border border-slate-100">
                            <strong>Summary:</strong> {incident.summary}
                            <br/><br/>
                            <strong>Location:</strong> {incident.location}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Status</label>
                            <select 
                                value={status} 
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            >
                                <option value="OPEN">Open (New)</option>
                                <option value="IN_PROGRESS">In Progress</option>
                                <option value="RESOLVED">Resolved</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Assigned Officer</label>
                            <input 
                                type="text"
                                value={assignedTo} 
                                onChange={(e) => setAssignedTo(e.target.value)}
                                placeholder="e.g. Officer Sharma"
                                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Action Remarks</label>
                        <textarea 
                            value={remarks} 
                            onChange={(e) => setRemarks(e.target.value)}
                            placeholder="Enter resolution notes, equipment requested, or updates..."
                            rows={4}
                            className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>
                </div>

                <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                    <button 
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-xl font-semibold text-slate-600 hover:bg-slate-200 transition"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleSave}
                        disabled={isSaving}
                        className="px-8 py-2.5 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 transition shadow-sm disabled:opacity-50"
                    >
                        {isSaving ? "Saving..." : "Save Actions"}
                    </button>
                </div>
            </div>
        </div>
    );
}
