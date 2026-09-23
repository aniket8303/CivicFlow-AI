import { fetchWithFallback } from "./apiClient";
import { DEMO_ANALYTICS, DEMO_HOTSPOTS } from "./demoData";

export async function getAnalyticsCategories() {
    return fetchWithFallback("/analytics/categories", { cache: "no-store" }, DEMO_ANALYTICS.categories);
}

export async function getAnalyticsSeverity() {
    return fetchWithFallback("/analytics/severity", { cache: "no-store" }, DEMO_ANALYTICS.severity);
}

export async function getAnalyticsPriority() {
    return fetchWithFallback("/analytics/priority", { cache: "no-store" }, DEMO_ANALYTICS.priority);
}

export async function getAnalyticsOverview() {
    return fetchWithFallback("/analytics/overview", { cache: "no-store" }, DEMO_ANALYTICS);
}

export async function getHotspots() {
    return fetchWithFallback("/analytics/hotspots", { cache: "no-store" }, DEMO_HOTSPOTS);
}