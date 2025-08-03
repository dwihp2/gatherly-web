/**
 * Update Event Status Use Case - Business Logic Hook
 * Location: app/events/usecases/useUpdateEventStatus.ts
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateEventStatusAction } from '../actions/eventActions'
import { toast } from 'sonner'
import type { EventStatus } from '../models/types/event-filters'
import type { Event } from '../models/interfaces/event'

interface UpdateEventStatusParams {
  eventId: string
  organizationId: string
  status: EventStatus
}

export function useUpdateEventStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ eventId, organizationId, status }: UpdateEventStatusParams) => {
      console.log('UseCase: Updating event status:', { eventId, organizationId, status })
      return await updateEventStatusAction(eventId, organizationId, status)
    },

    onSuccess: (updatedEvent, variables) => {
      // Invalidate and refetch related queries
      queryClient.invalidateQueries({
        queryKey: ['events', 'organization', variables.organizationId]
      })
      queryClient.invalidateQueries({
        queryKey: ['events', 'detail', variables.eventId]
      })
      queryClient.invalidateQueries({
        queryKey: ['dashboard', 'stats']
      })

      // Show success toast
      const statusText = variables.status === 'published' ? 'published' : 'saved as draft'
      toast.success('Event Updated', {
        description: `Event has been ${statusText} successfully.`
      })

      console.log('UseCase: Event status updated successfully:', updatedEvent)
    },

    onError: (error) => {
      console.error('UseCase: Failed to update event status:', error)

      toast.error('Update Failed', {
        description: error instanceof Error ? error.message : 'Failed to update event status. Please try again.'
      })
    },

    // Optimistic updates for better UX
    onMutate: async (variables) => {
      // Cancel outgoing refetches so they don't overwrite our optimistic update
      await queryClient.cancelQueries({
        queryKey: ['events', 'organization', variables.organizationId]
      })

      // Snapshot the previous value
      const previousEvents = queryClient.getQueryData(['events', 'organization', variables.organizationId])

      // Optimistically update to the new value
      queryClient.setQueryData(['events', 'organization', variables.organizationId], (old: Event[]) => {
        if (!old) return old
        return old.map((event: Event) =>
          event.id === variables.eventId
            ? { ...event, status: variables.status }
            : event
        )
      })

      // Return a context object with the snapshotted value
      return { previousEvents }
    },

    onSettled: (data, error, variables) => {
      // Always refetch after error or success
      queryClient.invalidateQueries({
        queryKey: ['events', 'organization', variables.organizationId]
      })
    }
  })
}
