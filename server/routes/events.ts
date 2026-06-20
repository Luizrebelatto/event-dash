import type { FastifyInstance } from "fastify";
import { db } from "../db";

export async function eventsRoutes(app: FastifyInstance) {
    app.get("/events", async (request) => {
        const query = request.query as {
            status?: string
            search?: string
        }

        const values: string[] = []
        const where
    })
}