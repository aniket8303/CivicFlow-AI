import { Incident, IncidentDetail } from "../types/incident";
import { fetchWithFallback } from "./apiClient";
import { DEMO_INCIDENTS, DEMO_INCIDENT_DETAILS } from "./demoData";

export async function getIncidents(): Promise<Incident[]> {
    return fetchWithFallback<Incident[]>("/incidents", { cache: "no-store" }, DEMO_INCIDENTS);
}

export async function getIncidentById(id: number): Promise<IncidentDetail> {
    const fallback = DEMO_INCIDENT_DETAILS.find(i => i.id === id) || DEMO_INCIDENT_DETAILS[0];
    return fetchWithFallback<IncidentDetail>(`/incidents/${id}`, { cache: "no-store" }, fallback);
}

export async function updateIncidentStatus(id: number, updates: { status?: string; assigned_to?: string; remarks?: string }): Promise<Incident> {
    const fallback = DEMO_INCIDENTS.find(i => i.id === id) || DEMO_INCIDENTS[0];
    const updatedFallback = { ...fallback, ...updates };
    
    return fetchWithFallback<Incident>(`/incidents/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates)
    }, updatedFallback);
}
