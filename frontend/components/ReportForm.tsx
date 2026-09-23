"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

import { getIncidentById } from "../services/incidentService";
import type { IncidentDetail } from "../types/incident";
import { createReport } from "../services/reportService";

const LocationPickerMap = dynamic(() => import("./LocationPickerMap"), { ssr: false, loading: () => <div className="h-64 w-full bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">Loading map...</div> });

const DEFAULT_LAT = 17.6605;
const DEFAULT_LNG = 75.9072;

export default function ReportForm() {
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    
    const [latitude, setLatitude] = useState(DEFAULT_LAT);
    const [longitude, setLongitude] = useState(DEFAULT_LNG);
    
    const [message, setMessage] = useState("");
    const [createdIncident, setCreatedIncident] = useState<IncidentDetail | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleUseCurrentLocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
                setLocation(`Detected Location: ${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`);
            },
            (error) => {
                alert("Unable to retrieve your location. Please check your browser permissions.");
                console.error(error);
            }
        );
    };

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setMessage("Analyzing report...");
        setCreatedIncident(null);
        setIsSubmitting(true);

        try {
            const reportData = await createReport({
                title,
                description,
                location,
                latitude,
                longitude
            });

            setMessage("Report submitted successfully!");

            // Fetch the clustered incident
            if (reportData.incident_id) {
                const incidentData = await getIncidentById(reportData.incident_id);
                setCreatedIncident(incidentData);
            }

            setTitle("");
            setDescription("");
            setLocation("");
            setLatitude(DEFAULT_LAT);
            setLongitude(DEFAULT_LNG);
            router.refresh();
        } catch (error) {
            setMessage("Failed to submit report.");
        } finally {
            setIsSubmitting(false);
        }
    }

    if (createdIncident) {
        return (
            <div className="bg-emerald-50 p-6 rounded-2xl ring-1 ring-emerald-200">
                <h3 className="text-xl font-bold text-emerald-900 mb-2">Report submitted successfully!</h3>
                <p className="text-emerald-800 mb-6">Our AI has analyzed your report and routed it to the correct department.</p>
                
                <div className="bg-white p-5 rounded-xl shadow-sm mb-4">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">AI Analysis</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <span className="block text-slate-500">Category</span>
                            <span className="font-semibold text-slate-900">{createdIncident.category}</span>
                        </div>
                        <div>
                            <span className="block text-slate-500">Severity</span>
                            <span className="font-semibold text-slate-900">{createdIncident.severity}</span>
                        </div>
                        <div>
                            <span className="block text-slate-500">Priority</span>
                            <span className="font-semibold text-slate-900">{createdIncident.priority}</span>
                        </div>
                        <div>
                            <span className="block text-slate-500">Department</span>
                            <span className="font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{createdIncident.department}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-sm">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Tracking Details</h4>
                    <div className="flex justify-between items-center">
                        <div>
                            <span className="block text-slate-500 text-xs">Incident ID</span>
                            <span className="font-bold text-slate-900 text-lg">INC-{createdIncident.id}</span>
                        </div>
                        <div className="text-right">
                            <span className="block text-slate-500 text-xs mb-1">Current Status</span>
                            <span className="inline-block bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-bold tracking-wide">{createdIncident.status}</span>
                        </div>
                    </div>
                </div>

                <button 
                    onClick={() => setCreatedIncident(null)}
                    className="mt-6 w-full bg-white border border-slate-300 text-slate-700 font-semibold py-3 rounded-xl hover:bg-slate-50 transition"
                >
                    Submit Another Report
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="title" className="mb-2 block text-sm font-semibold text-slate-700">Issue Title</label>
                <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Example: Broken streetlight on 5th Ave" className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100" required />
            </div>
            <div>
                <label htmlFor="description" className="mb-2 block text-sm font-semibold text-slate-700">Description</label>
                <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the civic issue in detail to help our AI route it correctly..." rows={5} className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100" required />
            </div>
            
            <div className="pt-4 border-t border-slate-100">
                <div className="flex justify-between items-end mb-2">
                    <label className="block text-sm font-semibold text-slate-700">Location</label>
                    <button 
                        type="button" 
                        onClick={handleUseCurrentLocation}
                        className="text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition"
                    >
                        📍 Use Current Location
                    </button>
                </div>
                <LocationPickerMap 
                    latitude={latitude} 
                    longitude={longitude} 
                    onLocationChange={(lat, lng) => {
                        setLatitude(lat);
                        setLongitude(lng);
                        setLocation(`Map Selection: ${lat.toFixed(4)}, ${lng.toFixed(4)}`);
                    }} 
                />
                <input id="location" type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Or enter nearby landmark (e.g. Ward 5, Pune)" className="mt-3 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100" required />
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pt-4">
                <p className="text-xs text-slate-500 max-w-sm">By submitting, you agree to allow CivicFlow AI to process this data for municipal routing.</p>
                <button type="submit" disabled={isSubmitting} className="rounded-xl bg-blue-600 px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed">
                    {isSubmitting ? "Processing..." : "Submit Report"}
                </button>
            </div>
            {message && !isSubmitting && <div className="rounded-xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 text-center">{message}</div>}
        </form>
    );
}