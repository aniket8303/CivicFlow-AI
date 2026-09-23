import { DEMO_REPORTS, DEMO_INCIDENTS, DEMO_INCIDENT_DETAILS, DEMO_STATS, DEMO_ANALYTICS, DEMO_HOTSPOTS } from "./demoData";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export async function fetchWithFallback<T>(
    endpoint: string,
    options: RequestInit = {},
    fallbackData: T
): Promise<T> {
    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            // Timeout after 3 seconds so we don't hang if backend is down
            signal: AbortSignal.timeout(3000),
        });

        if (!response.ok) {
            throw new Error(`API returned ${response.status}`);
        }

        // We succeeded, clear demo mode flag
        if (typeof window !== "undefined") {
            if (localStorage.getItem("demo_mode") === "true") {
                localStorage.removeItem("demo_mode");
                window.dispatchEvent(new Event("demo_mode_changed"));
            }
        }

        return await response.json();
    } catch (error) {
        console.warn(`[API Client] Failed to fetch ${endpoint}, falling back to demo data.`, error);
        
        // Trigger Demo Mode UI
        if (typeof window !== "undefined") {
            if (localStorage.getItem("demo_mode") !== "true") {
                localStorage.setItem("demo_mode", "true");
                window.dispatchEvent(new Event("demo_mode_changed"));
            }
        }
        
        return fallbackData;
    }
}
