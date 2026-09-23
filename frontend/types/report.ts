
export interface Report {
    id: number;
    title: string;
    description: string;
    location: string;
    latitude: number | null;
    longitude: number | null;

    category?: string | null;
    severity?: string | null;
    priority?: string | null;
    status?: string | null;
    created_at?: string | null;
    incident_id?: number | null;
}