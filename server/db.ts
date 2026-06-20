import pg from "pg"
import "dotenv/config"

export const database = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
})