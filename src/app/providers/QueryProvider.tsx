/**
 * React Query Provider - Global TanStack Query Configuration
 * Location: app/providers/QueryProvider.tsx
 */

'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState, type ReactNode } from 'react'

export function QueryProvider({ children }: { children: ReactNode }) {
  // Create a stable QueryClient instance
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Global query options
            staleTime: 60 * 1000, // 1 minute default stale time
            gcTime: 5 * 60 * 1000, // 5 minutes garbage collection time
            retry: (failureCount, error) => {
              // Don't retry on 4xx errors (client errors)
              if (error instanceof Error && error.message.includes('4')) {
                return false
              }
              // Retry up to 3 times for other errors
              return failureCount < 3
            },
            refetchOnWindowFocus: false, // Don't refetch on window focus by default
            refetchOnReconnect: true, // Refetch when reconnecting to internet
          },
          mutations: {
            // Global mutation options
            onError: (error) => {
              console.error('Mutation error:', error)
            },
            retry: 1, // Retry mutations once on failure
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
