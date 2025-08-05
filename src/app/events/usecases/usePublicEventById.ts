/**
 * Get Public Event by ID Use Case - Business Logic Hook
 * Location: app/events/usecases/usePublicEventById.ts
 * 
 * Public hook to fetch event details without authentication
 * Only returns published events
 */

import { useQuery } from '@tanstack/react-query'
import { getPublicEventByIdAction } from '../actions/eventActions'
import type { Event } from '../models/interfaces/event'

export function usePublicEventById(eventId: string | undefined) {
  return useQuery({
    queryKey: ['events', 'public', eventId],
    queryFn: async (): Promise<Event | null> => {
      if (!eventId) {
        throw new Error('Event ID is required')
      }
      
      console.log('UseCase: Fetching public event by ID:', eventId)
      return await getPublicEventByIdAction(eventId)
    },
    enabled: !!eventId, // Only run query if eventId is available
    staleTime: 5 * 60 * 1000, // 5 minutes - public event details are more stable
    gcTime: 10 * 60 * 1000, // 10 minutes cache time
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}
