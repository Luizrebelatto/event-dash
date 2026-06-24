import { useMemo, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "@tanstack/react-router"
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from "@tanstack/react-table"
import type { Guest } from "../service/types"
import { getGuestsByEventId } from "../service/api"


const columnHelper = createColumnHelper<Guest>()

export function EventGuestsPage() {
  const { eventId } = useParams({
    from: "/events/$eventId/guests",
  })

  const [sorting, setSorting] = useState<SortingState>([])

  const guestsQuery = useQuery({
    queryKey: ["guests", eventId],
    queryFn: () => getGuestsByEventId(eventId),
  })

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "Nome",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("email", {
        header: "Email",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("status", {
        header: "Status",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("photos_count", {
        header: "Fotos",
        cell: (info) => info.getValue(),
      }),
    ],
    []
  )

  const table = useReactTable({
    data: guestsQuery.data ?? [],
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  if (guestsQuery.isLoading) {
    return <p>Carregando convidados...</p>
  }

  if (guestsQuery.isError) {
    return <p>Erro ao carregar convidados.</p>
  }

  return (
    <main>
      <h1>Convidados</h1>

      <table border={1} cellPadding={8}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  style={{ cursor: "pointer" }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}

                  {{
                    asc: " ↑",
                    desc: " ↓",
                  }[header.column.getIsSorted() as string] ?? null}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}