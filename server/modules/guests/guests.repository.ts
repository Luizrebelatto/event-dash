import { database } from "../../db"
import type { CreateGuestInput } from "./guests.types"

export const guestsRepository = {
  async findByEventId(eventId: string) {
    const result = await database.query(
      `
      SELECT
        id,
        event_id,
        name,
        email,
        status,
        photos_count,
        joined_at
      FROM guests
      WHERE event_id = $1
      ORDER BY name ASC
      `,
      [eventId]
    )

    return result.rows
  },

  async create(input: CreateGuestInput) {
    const result = await database.query(
      `
      INSERT INTO guests (
        event_id,
        name,
        email,
        status
      )
      VALUES ($1, $2, $3, 'invited')
      RETURNING *
      `,
      [input.eventId, input.name, input.email]
    )

    return result.rows[0]
  },
}