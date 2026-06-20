import { database } from "../../db.ts"
import type { CreatePhotoInput } from "./photos.types.ts"

export const photosRepository = {
  async findByEventId(eventId: string) {
    const result = await database.query(
      `
      SELECT
        id,
        event_id,
        guest_name,
        url,
        created_at
      FROM photos
      WHERE event_id = $1
      ORDER BY created_at DESC
      `,
      [eventId]
    )

    return result.rows
  },

  async create(input: CreatePhotoInput) {
    const result = await database.query(
      `
      INSERT INTO photos (
        event_id,
        guest_name,
        url
      )
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [input.eventId, input.guest_name, input.url]
    )

    return result.rows[0]
  },
}