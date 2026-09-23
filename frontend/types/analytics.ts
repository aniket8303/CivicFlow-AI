export interface AnalyticsItem {
    name: string;
    count: number;
}

export interface AnalyticsOverview {
    categories: AnalyticsItem[];
    severity: AnalyticsItem[];
    priority: AnalyticsItem[];
    locations: AnalyticsItem[];
}

export interface Hotspot {
    latitude: number;
    longitude: number;
    count: number;
}