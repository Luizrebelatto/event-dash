import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { Providers } from './app/providers.tsx'
import { RouterProvider } from '@tanstack/react-router'
import { router } from './router.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <RouterProvider router={router}/>
    </Providers>
  </StrictMode>,
)
