import { useRef } from "react"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "@tanstack/react-router"
import { useVirtualizer } from "@tanstack/react-virtual"
import { getPhotosByEventId } from "../service/api"

export function EventPhotosPage() {
  const { eventId } = useParams({
    from: "/events/$eventId/photos",
  })

  const parentRef = useRef<HTMLDivElement>(null)

  const photosQuery = useQuery({
    queryKey: ["photos", eventId],
    queryFn: () => getPhotosByEventId(eventId),
  })

  const photos = photosQuery.data ?? []

  const virtualizer = useVirtualizer({
    count: photos.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 220,
    overscan: 5,
  })

  if (photosQuery.isLoading) {
    return <p>Carregando fotos...</p>
  }

  if (photosQuery.isError) {
    return <p>Erro ao carregar fotos.</p>
  }

  return (
    <main>
      <h1>Fotos</h1>

      <p>Total de fotos: {photos.length}</p>

      <div
        ref={parentRef}
        style={{
          height: 600,
          overflow: "auto",
          border: "1px solid #ddd",
        }}
      >
        <div
          style={{
            height: virtualizer.getTotalSize(),
            width: "100%",
            position: "relative",
          }}
        >
          {virtualizer.getVirtualItems().map((virtualItem) => {
            const photo = photos[virtualItem.index]

            return (
              <div
                key={photo.id}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  transform: `translateY(${virtualItem.start}px)`,
                  padding: 12,
                  boxSizing: "border-box",
                }}
              >
                <div
                  style={{
                    border: "1px solid #ddd",
                    padding: 12,
                    borderRadius: 8,
                  }}
                >
                  <img
                    src={photo.url}
                    alt=""
                    width={240}
                    height={160}
                    style={{ objectFit: "cover" }}
                  />

                  <p>{photo?.guest_name}</p>
                  <small>{photo?.created_at}</small>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </main>
  )
}