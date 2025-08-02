/**
 * Get Events by Organization Use Case - Business Logic Hook
 * Location: app/events/usecases/useEventsByOrganization.ts
 */

import { useQuery } from '@tanstack/react-query'
import { getEventsByOrganizationAction } from '../actions/eventActions'
import type { Event } from '../actions/types'

export function useEventsByOrganization(organizationId: string | undefined) {
  return useQuery({
    queryKey: ['events', 'organization', organizationId],
    queryFn: async (): Promise<Event[]> => {
      if (!organizationId) {
        throw new Error('Organization ID is required')
      }
      
      console.log('UseCase: Fetching events for organization:', organizationId)
      return await getEventsByOrganizationAction(organizationId)
    },
    enabled: !!organizationId, // Only run query if organizationId is available
    staleTime: 5 * 60 * 1000, // 5 minutes - events don't change frequently
    gcTime: 10 * 60 * 1000, // 10 minutes - keep in cache for a while
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}
