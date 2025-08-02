/**
 * Delete Event Use Case - Business Logic Hook
 * Location: app/events/usecases/useDeleteEvent.ts
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteEventAction } from '../actions/eventActions'
import { toast } from 'sonner'
import type { Event } from '../models/interfaces/event'

export function useDeleteEvent() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({ eventId, organizationId }: { eventId: string; organizationId: string }) => {
      console.log('UseCase: Deleting event:', eventId)
      return await deleteEventAction(eventId, organizationId)
    },
    
    onMutate: async ({ eventId, organizationId }) => {
      console.log('UseCase: Starting optimistic delete for event:', eventId)
      
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ 
        queryKey: ['events', 'organization', organizationId] 
      })
      
      // Snapshot the previous events list
      const previousEvents = queryClient.getQueryData<Event[]>([
        'events', 
        'organization', 
        organizationId
      ])
      
      // Optimistically remove the event from the list
      if (previousEvents) {
        const filteredEvents = previousEvents.filter(event => event.id !== eventId)
        queryClient.setQueryData(
          ['events', 'organization', organizationId],
          filteredEvents
        )
      }
      
      // Remove the single event from cache
      queryClient.removeQueries({ 
        queryKey: ['events', 'detail', eventId] 
      })
      
      return { previousEvents }
    },
    
    onError: (error, { organizationId }, context) => {
      console.error('UseCase: Event deletion failed:', error)
      
      // Rollback optimistic update
      if (context?.previousEvents) {
        queryClient.setQueryData(
          ['events', 'organization', organizationId],
          context.previousEvents
        )
      }
      
      // Show error toast
      toast.error('Failed to delete event', {
        description: error instanceof Error ? error.message : 'Please try again'
      })
    },
    
    onSuccess: (result, { eventId }) => {
      console.log('UseCase: Event deleted successfully')
      
      // Ensure the event is removed from all related queries
      queryClient.removeQueries({ 
        queryKey: ['events', 'detail', eventId] 
      })
      
      // Show success toast
      toast.success('Event deleted successfully!', {
        description: 'The event has been permanently removed.'
      })
    },
    
    onSettled: (data, error, { organizationId }) => {
      // Always refetch the events list to ensure consistency
      queryClient.invalidateQueries({ 
        queryKey: ['events', 'organization', organizationId] 
      })
    }
  })
}
