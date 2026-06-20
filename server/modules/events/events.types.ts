export type EventStatus = "draft" | "active" | "finished"

export type CreateEventInput = {
  name: string
  date: string
  status_id: EventStatus
  guests_limit: number
  photos_per_guest: number
}

export type UpdateEventStatusInput = {
  eventId: string
  status_id: EventStatus
}

export type ListEventsFilters = {
  status?: string
  search?: string
}