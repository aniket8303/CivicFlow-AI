import { Report } from "@/types/report";

const API_URL = "http://127.0.0.1:8000";

export async function getReports(): Promise<Report[]> {
    const response = await fetch(`${API_URL}/api/reports`, {
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch reports");
    }

    return response.json();
}

export async function updateReport(
    reportId: number,
    report: {
        title: string;
        description: string;
        location: string;
    }
) {
    const response = await fetch(
        `${API_URL}/api/reports/${reportId}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(report),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to update report");
    }

    return response.json();
}

export async function deleteReport(
    reportId: number
) {
    const response = await fetch(
        `${API_URL}/api/reports/${reportId}`,
        {
            method: "DELETE",
        }
    );

    if (!response.ok) {
        throw new Error("Failed to delete report");
    }

    return response.json();
}