import type { FastifyInstance } from "fastify"
import { photosService } from "./photos.service"

export async function photosRoutes(app: FastifyInstance) {
  app.get("/events/:eventId/photos", async (request) => {
    const { eventId } = request.params as {
      eventId: string
    }

    return photosService.listPhotosByEvent(eventId)
  })

  app.post("/events/:eventId/photos", async (request, reply) => {
    try {
      const { eventId } = request.params as {
        eventId: string
      }

      const body = request.body as {
        guest_name: string
        url: string
      }

      const photo = await photosService.createPhoto({
        eventId,
        guest_name: body.guest_name,
        url: body.url,
      })

      return reply.status(201).send(photo)
    } catch (error) {
      if (error instanceof Error && error.message === "GUEST_NAME_REQUIRED") {
        return reply.status(400).send({
          message: "Guest name is required",
        })
      }

      if (error instanceof Error && error.message === "INVALID_PHOTO_URL") {
        return reply.status(400).send({
          message: "Invalid photo URL",
        })
      }

      throw error
    }
  })
}