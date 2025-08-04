/**
 * Create Event Use Case - Business Logic Hook
 * Location: app/events/usecases/useCreateEvent.ts
 * 
 * Following Clean Architecture principles:
 * - Use cases contain business logic
 * - Handle optimistic updates and error states
 * - Integrate with TanStack Query for server state management
 * - Update local stores as needed
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createEventAction } from '../actions/eventActions'
import type { CreateEventInput, Event } from '../actions/types'
import { toast } from 'sonner'
import { useEventFormStore } from '../stores/eventFormStore'

export function useCreateEvent() {
  const queryClient = useQueryClient()
  const { resetForm, closeModal } = useEventFormStore()

  return useMutation({
    mutationFn: async (data: CreateEventInput) => {
      console.log('UseCase: Creating event with data:', data)
      return await createEventAction(data)
    },

    onMutate: async (newEventData) => {
      console.log('UseCase: Starting optimistic update')

      // Cancel any outgoing refetches for events list
      await queryClient.cancelQueries({
        queryKey: ['events', 'organization', newEventData.tenantId]
      })

      // Snapshot the previous value
      const previousEvents = queryClient.getQueryData<Event[]>([
        'events',
        'organization',
        newEventData.tenantId
      ])

      // Optimistically update to the new value
      if (previousEvents) {
        const optimisticEvent: Event = {
          id: 'temp-' + Date.now(), // Temporary ID
          tenantId: newEventData.tenantId,
          name: newEventData.name,
          slug: newEventData.slug, // Include slug from input
          description: newEventData.description || '',
          dateTime: newEventData.dateTime,
          location: newEventData.location,
          posterUrl: newEventData.posterUrl || '',
          status: 'draft',
          totalTickets: 0,
          ticketsSold: 0,
          totalRevenue: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        }

        queryClient.setQueryData<Event[]>(
          ['events', 'organization', newEventData.tenantId],
          [optimisticEvent, ...previousEvents]
        )
      }

      return { previousEvents }
    },

    onError: (error, newEventData, context) => {
      console.error('UseCase: Event creation failed:', error)

      // Rollback optimistic update
      if (context?.previousEvents) {
        queryClient.setQueryData(
          ['events', 'organization', newEventData.tenantId],
          context.previousEvents
        )
      }

      // Show error toast
      toast.error('Failed to create event', {
        description: error instanceof Error ? error.message : 'Please try again'
      })
    },

    onSuccess: (newEvent, variables) => {
      console.log('UseCase: Event created successfully:', newEvent.name)

      // Update the events list with the real event data
      queryClient.setQueryData<Event[]>(
        ['events', 'organization', variables.tenantId],
        (old) => {
          if (!old) return [newEvent]

          // Replace the optimistic event with the real one
          const filteredEvents = old.filter(event => !event.id.startsWith('temp-'))
          return [newEvent, ...filteredEvents]
        }
      )

      // Invalidate related queries to ensure fresh data
      queryClient.invalidateQueries({
        queryKey: ['events', 'organization', variables.tenantId]
      })

      // Reset form and close modal
      resetForm()
      closeModal()

      // Show success toast
      toast.success('Event created successfully!', {
        description: `"${newEvent.name}" has been created as a draft.`
      })
    },

    onSettled: (data, error, variables) => {
      // Always refetch events data to ensure consistency
      queryClient.invalidateQueries({
        queryKey: ['events', 'organization', variables.tenantId]
      })
    }
  })
}
