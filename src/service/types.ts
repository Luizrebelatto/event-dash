export type EventStatus = "draft" | "active" | "finished";

export type Event = {
    id: string;
    name: string;
    date: string;
    status_id: EventStatus;
    status_label: string;
    guests_limit: number;
    photos_per_guest: number;
    created_at: string;
}

export type Guest = {
    id: string;
    event_id: string;
    name: string;
    email: string;
    status: "invited" | "joined";
    photos_count: number;
    joined_at?: string;
}

export type Photo = {
    id: string;
    event_id: string;
    guest_name: string;
    url: string;
    created_at: string;
}