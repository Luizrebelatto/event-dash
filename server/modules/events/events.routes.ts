import type { FastifyInstance } from "fastify"
import { eventsService } from "./events.service"

export async function eventsRoutes(app: FastifyInstance) {
  app.get("/events", async (request) => {
    const query = request.query as {
      status?: string
      search?: string
    }

    return eventsService.listEvents({
      status: query.status,
      search: query.search,
    })
  })

  app.get("/events/:eventId", async (request, reply) => {
    try {
      const { eventId } = request.params as {
        eventId: string
      }

      return await eventsService.getEventById(eventId)
    } catch (error) {
      if (error instanceof Error && error.message === "EVENT_NOT_FOUND") {
        return reply.status(404).send({
          message: "Event not found",
        })
      }

      throw error
    }
  })

  app.post("/events", async (request, reply) => {
    try {
      const body = request.body as {
        name: string
        date: string
        status_id: "draft" | "active" | "finished"
        guests_limit: number
        photos_per_guest: number
      }

      const event = await eventsService.createEvent(body)

      return reply.status(201).send(event)
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === "GUESTS_LIMIT_MUST_BE_POSITIVE"
      ) {
        return reply.status(400).send({
          message: "Guests limit must be positive",
        })
      }

      if (
        error instanceof Error &&
        error.message === "PHOTOS_PER_GUEST_MUST_BE_POSITIVE"
      ) {
        return reply.status(400).send({
          message: "Photos per guest must be positive",
        })
      }

      throw error
    }
  })

  app.patch("/events/:eventId/status", async (request, reply) => {
    try {
      const { eventId } = request.params as {
        eventId: string
      }

      const body = request.body as {
        status_id: "draft" | "active" | "finished"
      }

      return await eventsService.updateEventStatus({
        eventId,
        status_id: body.status_id,
      })
    } catch (error) {
      if (error instanceof Error && error.message === "EVENT_NOT_FOUND") {
        return reply.status(404).send({
          message: "Event not found",
        })
      }

      throw error
    }
  })
}