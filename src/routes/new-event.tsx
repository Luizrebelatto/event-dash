import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "@tanstack/react-form"
import { useNavigate } from "@tanstack/react-router"
import { createEvent } from "../service/api"


export function NewEventPage() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const createEventMutation = useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
      })

      navigate({
        to: "/events",
      })
    },
  })

  const form = useForm({
    defaultValues: {
      name: "",
      date: "",
      status_id: "draft" as const,
      guests_limit: 50,
      photos_per_guest: 20,
    },
    onSubmit: async ({ value }) => {
      await createEventMutation.mutateAsync(value)
    },
  })

  return (
    <main>
      <h1>Novo evento</h1>

      <form
        onSubmit={(event) => {
          event.preventDefault()
          form.handleSubmit()
        }}
      >
        <form.Field
          name="name"
          validators={{
            onChange: ({ value }) =>
              value.length < 3
                ? "Nome precisa ter pelo menos 3 letras"
                : undefined,
          }}
        >
          {(field) => (
            <div>
              <label>Nome</label>

              <input
                value={field.state.value}
                onChange={(event) => field.handleChange(event.target.value)}
              />

              {field.state.meta.errors.length > 0 && (
                <small>{field.state.meta.errors.join(", ")}</small>
              )}
            </div>
          )}
        </form.Field>

        <form.Field name="date">
          {(field) => (
            <div>
              <label>Data</label>

              <input
                type="date"
                value={field.state.value}
                onChange={(event) => field.handleChange(event.target.value)}
              />
            </div>
          )}
        </form.Field>

        <form.Field name="guests_limit">
          {(field) => (
            <div>
              <label>Limite de convidados</label>

              <input
                type="number"
                value={field.state.value}
                onChange={(event) =>
                  field.handleChange(Number(event.target.value))
                }
              />
            </div>
          )}
        </form.Field>

        <form.Field name="photos_per_guest">
          {(field) => (
            <div>
              <label>Fotos por convidado</label>

              <input
                type="number"
                value={field.state.value}
                onChange={(event) =>
                  field.handleChange(Number(event.target.value))
                }
              />
            </div>
          )}
        </form.Field>

        <button type="submit" disabled={createEventMutation.isPending}>
          {createEventMutation.isPending ? "Criando..." : "Criar evento"}
        </button>
      </form>
    </main>
  )
}