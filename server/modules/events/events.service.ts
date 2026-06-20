import { eventsRepository } from "./events.repository"
import type {
  CreateEventInput,
  ListEventsFilters,
  UpdateEventStatusInput,
} from "./events.types"

export const eventsService = {
  async listEvents(filters: ListEventsFilters) {
    return eventsRepository.findMany(filters)
  },

  async getEventById(eventId: string) {
    const event = await eventsRepository.findById(eventId)

    if (!event) {
      throw new Error("EVENT_NOT_FOUND")
    }

    return event
  },

  async createEvent(input: CreateEventInput) {
    if (input.guests_limit <= 0) {
      throw new Error("GUESTS_LIMIT_MUST_BE_POSITIVE")
    }

    if (input.photos_per_guest <= 0) {
      throw new Error("PHOTOS_PER_GUEST_MUST_BE_POSITIVE")
    }

    return eventsRepository.create(input)
  },

  async updateEventStatus(input: UpdateEventStatusInput) {
    const event = await eventsRepository.updateStatus(input)

    if (!event) {
      throw new Error("EVENT_NOT_FOUND")
    }

    return event
  },
}