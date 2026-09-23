import { DashboardStats } from "@/types/dashboard";
import { fetchWithFallback } from "./apiClient";
import { DEMO_STATS } from "./demoData";

export async function getDashboardStats(): Promise<DashboardStats> {
    return fetchWithFallback<DashboardStats>("/dashboard/stats", { cache: "no-store" }, DEMO_STATS);
}