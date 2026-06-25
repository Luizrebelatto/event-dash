import { useQuery } from "@tanstack/react-query"
import { Link, useParams } from "@tanstack/react-router"
import { getEventById } from "../service/api"


export function EventDetailPage() {
  const { eventId } = useParams({
    from: "/events/$eventId",
  })

  const eventQuery = useQuery({
    queryKey: ["event", eventId],
    queryFn: () => getEventById(eventId),
  })

  if (eventQuery.isLoading) {
    return <p>Carregando evento...</p>
  }

  if (eventQuery.isError) {
    return <p>Erro ao carregar evento.</p>
  }

  const event = eventQuery.data

  return (
    <main>
      <h1>{event?.name}</h1>

      <p>Status: {event?.status_label}</p>
      <p>Data: {event?.date}</p>
      <p>Limit per guest: {event?.guests_limit}</p>
      <p>Photos per guests: {event?.photos_per_guest}</p>

      <div style={{ display: "flex", gap: 16 }}>
        <Link
          to="/events/$eventId/guests"
          params={{ eventId }}
        >
          see guests
        </Link>

        <Link
          to="/events/$eventId/photos"
          params={{ eventId }}
        >
          see photos
        </Link>
      </div>
    </main>
  )
}