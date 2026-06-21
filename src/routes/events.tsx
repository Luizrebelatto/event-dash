import { useQuery } from "@tanstack/react-query"
import { Link } from "@tanstack/react-router"

import { getEvents } from "../service/api"

export function EventsPage() {
  const eventsQuery = useQuery({
    queryKey: ["events"],
    queryFn: () => getEvents(),
  })

  if (eventsQuery.isLoading) {
    return <p>Carregando eventos...</p>
  }

  if (eventsQuery.isError) {
    return <p>Erro ao carregar eventos.</p>
  }

  return (
    <main>
      <h1>Eventos</h1>

      <ul>
        {eventsQuery.data?.map((event) => (
          <li key={event.id}>
            <Link
              to="/events/$eventId"
              params={{ eventId: event.id }}
            >
              {event.name}
            </Link>

            {" — "}

            <span>{event.status_label ?? event.status_id}</span>
          </li>
        ))}
      </ul>
    </main>
  )
}