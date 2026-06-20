import type { FastifyInstance } from "fastify"
import { guestsService } from "./guests.service"

export async function guestsRoutes(app: FastifyInstance) {
  app.get("/events/:eventId/guests", async (request) => {
    const { eventId } = request.params as {
      eventId: string
    }

    return guestsService.listGuestsByEvent(eventId)
  })

  app.post("/events/:eventId/guests", async (request, reply) => {
    try {
      const { eventId } = request.params as {
        eventId: string
      }

      const body = request.body as {
        name: string
        email: string
      }

      const guest = await guestsService.createGuest({
        eventId,
        name: body.name,
        email: body.email,
      })

      return reply.status(201).send(guest)
    } catch (error) {
      if (error instanceof Error && error.message === "GUEST_NAME_REQUIRED") {
        return reply.status(400).send({
          message: "Guest name is required",
        })
      }

      if (error instanceof Error && error.message === "INVALID_EMAIL") {
        return reply.status(400).send({
          message: "Invalid email",
        })
      }

      throw error
    }
  })
}