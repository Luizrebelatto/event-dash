import { photosRepository } from "./photos.repository"
import type { CreatePhotoInput } from "./photos.types"

export const photosService = {
  async listPhotosByEvent(eventId: string) {
    return photosRepository.findByEventId(eventId)
  },

  async createPhoto(input: CreatePhotoInput) {
    if (!input.guest_name.trim()) {
      throw new Error("GUEST_NAME_REQUIRED")
    }

    if (!input.url.startsWith("http")) {
      throw new Error("INVALID_PHOTO_URL")
    }

    return photosRepository.create(input)
  },
}