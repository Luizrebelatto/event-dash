import type { Event, Guest, Photo, EventStatus } from "./types"

const API_URL = "http://localhost:3333"

export type CreateEventInput = {
  name: string
  date: string
  status_id: EventStatus
  guests_limit: number
  photos_per_guest: number
}

export async function getEvents(filters?: {
  status?: string
  search?: string
}) {
  const params = new URLSearchParams()

  if (filters?.status) {
    params.set("status", filters.status)
  }

  if (filters?.search) {
    params.set("search", filters.search)
  }

  const response = await fetch(`${API_URL}/events?${params.toString()}`)

  if (!response.ok) {
    throw new Error("Erro ao buscar eventos")
  }

  return response.json() as Promise<Event[]>
}

export async function getEventById(eventId: string) {
  const response = await fetch(`${API_URL}/events/${eventId}`)

  if (!response.ok) {
    throw new Error("Erro ao buscar evento")
  }

  return response.json() as Promise<Event>
}

export async function createEvent(input: CreateEventInput) {
  const response = await fetch(`${API_URL}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  })

  if (!response.ok) {
    throw new Error("Erro ao criar evento")
  }

  return response.json() as Promise<Event>
}

export async function getGuestsByEventId(eventId: string) {
  const response = await fetch(`${API_URL}/events/${eventId}/guests`)

  if (!response.ok) {
    throw new Error("Erro ao buscar convidados")
  }

  return response.json() as Promise<Guest[]>
}

export async function getPhotosByEventId(eventId: string) {
  const response = await fetch(`${API_URL}/events/${eventId}/photos`)

  if (!response.ok) {
    throw new Error("Erro ao buscar fotos")
  }

  return response.json() as Promise<Photo[]>
}