export type EventStatus = "draft" | "active" | "finished";

export type Event = {
    id: string;
    name: string;
    date: string;
    status: EventStatus;
    guestLimit: number;
    photosPerGuest: number;
    createdAt: string;
}

export type Guest = {
    id: string;
    eventId: string;
    name: string;
    email: string;
    status: "invited" | "joined";
    photosCounr: number;
    joinedAt?: string;
}

export type Photo = {
    id: string;
    eventId: string;
    guestName: string;
    url: string;
    createdAt: string;
}