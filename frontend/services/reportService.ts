import { Report } from "@/types/report";
import { fetchWithFallback } from "./apiClient";
import { DEMO_REPORTS } from "./demoData";

export async function getReports(): Promise<Report[]> {
    return fetchWithFallback<Report[]>("/reports", { cache: "no-store" }, DEMO_REPORTS);
}

export async function createReport(reportData: { title: string; description: string; location: string; latitude: number; longitude: number; }): Promise<any> {
    try {
        return await fetchWithFallback("/reports", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(reportData)
        }, null);
    } catch (e) {
        // Fallback demo submission logic
        await new Promise(r => setTimeout(r, 2000));
        return {
            id: 999,
            ...reportData,
            category: "Water",
            severity: "High",
            priority: "P1",
            summary: "AI simulated summary for demo mode.",
            incident_id: 2048,
        };
    }
}

export async function updateReport(reportId: number, report: any) {
    return fetchWithFallback(`/reports/${reportId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(report)
    }, report);
}

export async function deleteReport(reportId: number) {
    return fetchWithFallback(`/reports/${reportId}`, { method: "DELETE" }, { success: true });
}