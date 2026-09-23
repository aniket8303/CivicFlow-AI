import { Report } from "./report";

export interface Incident {
    id: number;
    category: string;
    severity: string;
    priority: string;
    summary: string;
    location: string;
    latitude: number | null;
    longitude: number | null;
    department: string;
    status: string;
    assigned_to?: string | null;
    remarks?: string | null;
    created_at: string;
    updated_at: string | null;
    report_count: number;
}

export interface IncidentDetail extends Incident {
    reports: Report[];
}

export interface IncidentStatusUpdate {
    status: string;
}
