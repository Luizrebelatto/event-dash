import {
  createRootRoute,
  createRoute,
  createRouter,
  Link,
  Outlet,
} from "@tanstack/react-router"

import { HomePage } from "./routes"
import { EventsPage } from "./routes/events"
import { EventDetailPage } from "./routes/event-detail"
import { EventGuestsPage } from "./routes/event-guests"
import { EventPhotosPage } from "./routes/event-photos"
import { NewEventPage } from "./routes/new-event"

const rootRoute = createRootRoute({
  component: () => (
    <div style={{ padding: 24 }}>
      <nav style={{ display: "flex", gap: 16, marginBottom: 24 }}>
        <Link to="/">Home</Link>
        <Link to="/events">Eventos</Link>
        <Link to="/events/new">Novo evento</Link>
      </nav>

      <Outlet />
    </div>
  ),
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
})

const eventsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/events",
  component: EventsPage,
})

const newEventRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/events/new",
  component: NewEventPage,
})

const eventDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/events/$eventId",
  component: EventDetailPage,
})

const eventGuestsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/events/$eventId/guests",
  component: EventGuestsPage,
})

const eventPhotosRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/events/$eventId/photos",
  component: EventPhotosPage,
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  eventsRoute,
  newEventRoute,
  eventDetailRoute,
  eventGuestsRoute,
  eventPhotosRoute,
])

export const router = createRouter({
  routeTree,
})

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}