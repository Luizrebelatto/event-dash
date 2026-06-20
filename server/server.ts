import Fastify from "fastify"
import cors from "@fastify/cors"
import "dotenv/config"

import { eventsRoutes } from "./modules/events/events.routes"
import { guestsRoutes } from "./modules/guests/guests.routes"
import { photosRoutes } from "./modules/photos/photos.routes"

const app = Fastify({
  logger: true,
})

await app.register(cors, {
  origin: true,
})

await app.register(eventsRoutes)
await app.register(guestsRoutes)
await app.register(photosRoutes)

const port = Number(process.env.PORT ?? 3333)

app.listen({ port, host: "0.0.0.0" }).then(() => {
  console.log(`HTTP server running on http://localhost:${port}`)
})