import Fastify from "fastify"
import cors from "@fastify/cors"
import { createHash } from "node:crypto"
import "dotenv/config"

import { eventsRoutes } from "./modules/events/events.routes"
import { guestsRoutes } from "./modules/guests/guests.routes"
import { photosRoutes } from "./modules/photos/photos.routes"

const app = Fastify({
  logger: true,
})

await app.register(cors, {
  origin: true,
  exposedHeaders: ["ETag"],
})

app.addHook("onSend", async (request, reply, payload) => {
  if (request.method !== "GET" || typeof payload !== "string") {
    return payload
  }

  const etag = `"${createHash("sha1").update(payload).digest("base64")}"`

  reply.header("ETag", etag)
  reply.header("Cache-Control", "no-cache")

  if (request.headers["if-none-match"] === etag) {
    reply.code(304)
    return ""
  }

  return payload
})

await app.register(eventsRoutes)
await app.register(guestsRoutes)
await app.register(photosRoutes)

const port = Number(process.env.PORT ?? 3333)

app.listen({ port, host: "0.0.0.0" }).then(() => {
  console.log(`HTTP server running on http://localhost:${port}`)
})