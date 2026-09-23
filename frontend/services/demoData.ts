import type { Report } from "@/types/report";
import type { Incident, IncidentDetail } from "@/types/incident";
import type { DashboardStats } from "@/types/dashboard";

export const DEMO_REPORTS: Report[] = [
    {
        id: 101,
        title: "Major water pipe burst on Main St",
        description: "Water is flooding the road near the central school.",
        location: "Ward 14",
        latitude: 17.6599,
        longitude: 75.9064,
        category: "Water",
        severity: "Critical",
        priority: "P1",
        status: "OPEN",
        created_at: new Date(Date.now() - 3600000).toISOString(),
    },
    {
        id: 102,
        title: "Pothole on 5th Avenue",
        description: "Deep pothole causing traffic slowdown.",
        location: "Ward 8",
        latitude: 17.6620,
        longitude: 75.9100,
        category: "Road",
        severity: "Medium",
        priority: "P3",
        status: "OPEN",
        created_at: new Date(Date.now() - 7200000).toISOString(),
    },
    {
        id: 103,
        title: "Streetlight not working",
        description: "Street is pitch black near the park.",
        location: "Ward 5",
        latitude: 17.6580,
        longitude: 75.9120,
        category: "Lighting",
        severity: "High",
        priority: "P2",
        status: "RESOLVED",
        created_at: new Date(Date.now() - 86400000).toISOString(),
    },
];

export const DEMO_INCIDENTS: Incident[] = [
    {
        id: 2048,
        category: "Water",
        severity: "Critical",
        priority: "P1",
        summary: "Major water pipeline burst causing road flooding near school.",
        location: "Ward 14",
        latitude: 17.6599,
        longitude: 75.9064,
        department: "Water Department",
        status: "OPEN",
        created_at: new Date(Date.now() - 3600000).toISOString(),
        updated_at: new Date(Date.now() - 1800000).toISOString(),
        report_count: 12,
    },
    {
        id: 2049,
        category: "Road",
        severity: "Medium",
        priority: "P3",
        summary: "Multiple potholes reported along 5th Avenue.",
        location: "Ward 8",
        latitude: 17.6620,
        longitude: 75.9100,
        department: "Road Department",
        status: "IN PROGRESS",
        created_at: new Date(Date.now() - 7200000).toISOString(),
        updated_at: new Date(Date.now() - 3600000).toISOString(),
        report_count: 5,
    },
];

export const DEMO_INCIDENT_DETAILS: IncidentDetail[] = DEMO_INCIDENTS.map(inc => ({
    ...inc,
    reports: DEMO_REPORTS.filter(r => r.category === inc.category)
}));

export const DEMO_STATS: DashboardStats = {
    open_incidents: 42,
    p1_incidents: 5,
    resolved_today: 18,
    total_reports: 247,
};

export const DEMO_ANALYTICS = {
    categories: [
        { name: "Water", count: 85 },
        { name: "Road", count: 64 },
        { name: "Lighting", count: 42 },
        { name: "Waste", count: 31 },
        { name: "Drainage", count: 25 },
    ],
    severity: [
        { name: "CRITICAL", count: 12 },
        { name: "HIGH", count: 45 },
        { name: "MEDIUM", count: 120 },
        { name: "LOW", count: 70 },
    ],
    priority: [
        { name: "P1", count: 10 },
        { name: "P2", count: 50 },
        { name: "P3", count: 187 },
    ],
    locations: [
        { name: "Ward 14", count: 55 },
        { name: "Ward 8", count: 42 },
        { name: "Ward 5", count: 38 },
        { name: "Ward 22", count: 35 },
    ]
};

export const DEMO_HOTSPOTS = [
    { latitude: 17.6599, longitude: 75.9064, count: 12 },
    { latitude: 17.6620, longitude: 75.9100, count: 8 },
];
