import { database } from "../../db"
import type {
  CreateEventInput,
  ListEventsFilters,
  UpdateEventStatusInput,
} from "./events.types"

export const eventsRepository = {
  async findMany(filters: ListEventsFilters) {
    const values: unknown[] = []
    const where: string[] = []

    if (filters.status) {
      values.push(filters.status)
      where.push(`e.status_id = $${values.length}`)
    }

    if (filters.search) {
      values.push(`%${filters.search}%`)
      where.push(`e.name ILIKE $${values.length}`)
    }

    const whereSql = where.length > 0 ? `WHERE ${where.join(" AND ")}` : ""

    const result = await database.query(
      `
      SELECT
        e.id,
        e.name,
        e.date,
        e.status_id,
        s.label AS status_label,
        e.guests_limit,
        e.photos_per_guest,
        e.created_at
      FROM events e
      JOIN event_statuses s ON s.id = e.status_id
      ${whereSql}
      ORDER BY e.created_at DESC
      `,
      values
    )

    return result.rows
  },

  async findById(eventId: string) {
    const result = await database.query(
      `
      SELECT
        e.id,
        e.name,
        e.date,
        e.status_id,
        s.label AS status_label,
        e.guests_limit,
        e.photos_per_guest,
        e.created_at
      FROM events e
      JOIN event_statuses s ON s.id = e.status_id
      WHERE e.id = $1
      `,
      [eventId]
    )

    return result.rows[0]
  },

  async create(input: CreateEventInput) {
    const result = await database.query(
      `
      INSERT INTO events (
        name,
        date,
        status_id,
        guests_limit,
        photos_per_guest
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
      `,
      [
        input.name,
        input.date,
        input.status_id,
        input.guests_limit,
        input.photos_per_guest,
      ]
    )

    return result.rows[0]
  },

  async updateStatus(input: UpdateEventStatusInput) {
    const result = await database.query(
      `
      UPDATE events
      SET status_id = $1
      WHERE id = $2
      RETURNING *
      `,
      [input.status_id, input.eventId]
    )

    return result.rows[0]
  },
}