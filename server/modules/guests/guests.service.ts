import { guestsRepository } from "./guests.repository"
import type { CreateGuestInput } from "./guests.types"

export const guestsService = {
  async listGuestsByEvent(eventId: string) {
    return guestsRepository.findByEventId(eventId)
  },

  async createGuest(input: CreateGuestInput) {
    if (!input.name.trim()) {
      throw new Error("GUEST_NAME_REQUIRED")
    }

    if (!input.email.includes("@")) {
      throw new Error("INVALID_EMAIL")
    }

    return guestsRepository.create(input)
  },
}