## Config cache on frontend
```
import { QueryClient } from "@tanstack/react-query"

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2, // 2 minutes
      gcTime: 1000 * 60 * 10,   // 10 minutes
      retry: 1,
    },
  },
})
```
- `staleTime`: long is the data considered up-to-date/recent
- `gcTime(gc -> garbage collector)`: the amount of time the data remains in the cache until no one is using it anymore
- `retry`: if the request fail, you can define how much times the api will be called

```
Componente
  ↓
useQuery
  ↓
QueryObserver
  ↓
QueryClient
  ↓
QueryCache
  ↓
API
```

- `QueryObserver`: connects the React component to a specific query
- `QueryClient`: Management center
- `QueryCache`: is where query data is stored.
