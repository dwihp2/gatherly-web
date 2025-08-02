/**
 * Create Event Modal Container
 * Location: app/events/view/container/CreateEventModalContainer.tsx
 */
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useEventFormStore } from '../../stores/eventFormStore'
import { useCreateEvent } from '../../usecases/useCreateEvent'
import { useUpdateEvent } from '../../usecases/useUpdateEvent'
import { CreateEventModal } from '../presentation/CreateEventModal'
import { EventDetailsForm } from '../presentation/EventDetailsForm'
import { TicketConfigurationForm } from '../presentation/TicketConfigurationForm'
import { PublicationSettingsForm } from '../presentation/PublicationSettingsForm'
import { EventFormStep } from '../../models/interfaces/eventForm'
import { useAuth } from '../../../(auth)/hooks/useAuth'
import { toast } from 'sonner'
import type { CreateEventInput } from '../../models/interfaces/event'

export function CreateEventModalContainer() {
  const router = useRouter()
  const { user } = useAuth()
  const {
    isModalOpen,
    isEditMode,
    editingEventId,
    currentStep,
    closeModal,
    resetForm,
    getFormData,
  } = useEventFormStore()

  // Mutations for creating and updating events
  const createEventMutation = useCreateEvent()
  const updateEventMutation = useUpdateEvent()

  // Handle expand to full page
  const handleExpand = () => {
    // Save current form state and close modal
    closeModal()
    // Navigate to full page
    router.push('/events/create')
  }

  // Handle form submission
  const handleSubmit = async () => {
    if (!user?.tenantId) {
      toast.error('Authentication Error', {
        description: 'Please sign in to continue'
      })
      return
    }

    try {
      const formData = getFormData()
      
      // Prepare data for API
      const eventData: CreateEventInput = {
        tenantId: user.tenantId,
        name: formData.name,
        description: formData.description,
        dateTime: formData.dateTime,
        location: formData.location,
        posterUrl: formData.posterUrl,
      }

      console.log('Submitting event data:', eventData)

      if (isEditMode && editingEventId) {
        // Update existing event
        await updateEventMutation.mutateAsync({
          id: editingEventId,
          ...eventData,
        })
      } else {
        // Create new event
        await createEventMutation.mutateAsync(eventData)
      }

      // Success is handled in the mutation hooks (toast, modal close, etc.)

    } catch (error) {
      console.error('Error submitting event:', error)
      
      // Show error toast if mutations didn't handle it
      toast.error('Submission failed', {
        description: error instanceof Error ? error.message : 'Please try again'
      })
    }
  }

  // Handle modal close
  const handleClose = () => {
    const isSubmitting = createEventMutation.isPending || updateEventMutation.isPending
    
    if (!isSubmitting) {
      closeModal()
    }
  }

  // Reset form when modal closes
  useEffect(() => {
    if (!isModalOpen) {
      resetForm()
    }
  }, [isModalOpen, resetForm])

  // Loading state
  const isLoading = createEventMutation.isPending || updateEventMutation.isPending

  // Render step content
  const renderStepContent = () => {
    switch (currentStep) {
      case EventFormStep.DETAILS:
        return <EventDetailsForm />
      case EventFormStep.TICKETS:
        return <TicketConfigurationForm />
      case EventFormStep.PUBLICATION:
        return <PublicationSettingsForm />
      default:
        return <EventDetailsForm />
    }
  }

  if (!isModalOpen) {
    return null
  }

  return (
    <CreateEventModal
      isOpen={isModalOpen}
      onClose={handleClose}
      onExpand={handleExpand}
      isEditMode={isEditMode}
      currentStep={currentStep}
      isLoading={isLoading}
      onSubmit={handleSubmit}
    >
      {renderStepContent()}
    </CreateEventModal>
  )
}
