/**
 * Update Event Use Case - Business Logic Hook
 * Location: app/events/usecases/useUpdateEvent.ts
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateEventAction } from '../actions/eventActions'
import type { UpdateEventInput, Event } from '../actions/types'
import { toast } from 'sonner'
import { useEventFormStore } from '../stores/eventFormStore'

export function useUpdateEvent() {
  const queryClient = useQueryClient()
  const { resetForm, closeModal } = useEventFormStore()
  
  return useMutation({
    mutationFn: async (data: UpdateEventInput) => {
      console.log('UseCase: Updating event with data:', data)
      return await updateEventAction(data)
    },
    
    onMutate: async (updateData) => {
      console.log('UseCase: Starting optimistic update for event:', updateData.id)
      
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ 
        queryKey: ['events', 'organization', updateData.tenantId] 
      })
      await queryClient.cancelQueries({ 
        queryKey: ['events', 'detail', updateData.id] 
      })
      
      // Snapshot the previous values
      const previousEvents = queryClient.getQueryData<Event[]>([
        'events', 
        'organization', 
        updateData.tenantId
      ])
      
      const previousEvent = queryClient.getQueryData<Event>([
        'events', 
        'detail', 
        updateData.id
      ])
      
      // Optimistically update the events list
      if (previousEvents) {
        const updatedEvents = previousEvents.map(event => {
          if (event.id === updateData.id) {
            return {
              ...event,
              ...updateData,
              updatedAt: new Date(),
            }
          }
          return event
        })
        
        queryClient.setQueryData(
          ['events', 'organization', updateData.tenantId],
          updatedEvents
        )
      }
      
      // Optimistically update the single event
      if (previousEvent) {
        const updatedEvent = {
          ...previousEvent,
          ...updateData,
          updatedAt: new Date(),
        }
        
        queryClient.setQueryData(
          ['events', 'detail', updateData.id],
          updatedEvent
        )
      }
      
      return { previousEvents, previousEvent }
    },
    
    onError: (error, updateData, context) => {
      console.error('UseCase: Event update failed:', error)
      
      // Rollback optimistic updates
      if (context?.previousEvents) {
        queryClient.setQueryData(
          ['events', 'organization', updateData.tenantId],
          context.previousEvents
        )
      }
      
      if (context?.previousEvent) {
        queryClient.setQueryData(
          ['events', 'detail', updateData.id],
          context.previousEvent
        )
      }
      
      // Show error toast
      toast.error('Failed to update event', {
        description: error instanceof Error ? error.message : 'Please try again'
      })
    },
    
    onSuccess: (updatedEvent, variables) => {
      console.log('UseCase: Event updated successfully:', updatedEvent.name)
      
      // Update the events list with the real updated data
      queryClient.setQueryData<Event[]>(
        ['events', 'organization', variables.tenantId],
        (old) => {
          if (!old) return [updatedEvent]
          
          return old.map(event => 
            event.id === updatedEvent.id ? updatedEvent : event
          )
        }
      )
      
      // Update the single event cache
      queryClient.setQueryData(
        ['events', 'detail', updatedEvent.id],
        updatedEvent
      )
      
      // Reset form and close modal
      resetForm()
      closeModal()
      
      // Show success toast
      toast.success('Event updated successfully!', {
        description: `"${updatedEvent.name}" has been updated.`
      })
    },
    
    onSettled: (data, error, variables) => {
      // Always refetch to ensure consistency
      queryClient.invalidateQueries({ 
        queryKey: ['events', 'organization', variables.tenantId] 
      })
      
      if (data) {
        queryClient.invalidateQueries({ 
          queryKey: ['events', 'detail', data.id] 
        })
      }
    }
  })
}
