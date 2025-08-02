/**
 * Get Event by ID Use Case - Business Logic Hook
 * Location: app/events/usecases/useEventById.ts
 */

import { useQuery } from '@tanstack/react-query'
import { getEventByIdAction } from '../actions/eventActions'
import type { Event } from '../actions/types'

export function useEventById(eventId: string | undefined, organizationId: string | undefined) {
  return useQuery({
    queryKey: ['events', 'detail', eventId, organizationId],
    queryFn: async (): Promise<Event | null> => {
      if (!eventId || !organizationId) {
        throw new Error('Event ID and Organization ID are required')
      }
      
      console.log('UseCase: Fetching event by ID:', eventId)
      return await getEventByIdAction(eventId, organizationId)
    },
    enabled: !!(eventId && organizationId), // Only run query if both IDs are available
    staleTime: 2 * 60 * 1000, // 2 minutes - event details might change more frequently
    gcTime: 5 * 60 * 1000, // 5 minutes cache time
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}
