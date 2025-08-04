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
import { useEventById } from '../../usecases/useEventById'
import { CreateEventModal } from '../presentation/CreateEventModal'
import { EventDetailsForm } from '../presentation/EventDetailsForm'
import { TicketConfigurationForm } from '../presentation/TicketConfigurationForm'
import { PublicationSettingsForm } from '../presentation/PublicationSettingsForm'
import { EventFormStep } from '../../models/interfaces/eventForm'
import { useAuth } from '../../../(auth)/hooks/useAuth'
import { generateSlug } from '@/lib/utils/slug'
import { toast } from 'sonner'
import type { CreateEventInput } from '../../models/interfaces/event'

export function CreateEventModalContainer() {
  const router = useRouter()
  const { user } = useAuth()
  const {
    // Modal state
    isModalOpen,
    isEditMode,
    editingEventId,
    currentStep,

    // Actions
    closeModal,
    updateEventDetails,
    updateTicketConfiguration,
    updatePublicationSettings,
    getFormData
  } = useEventFormStore()

  // Mutations for creating and updating events
  const createEventMutation = useCreateEvent()
  const updateEventMutation = useUpdateEvent()

  // Fetch event data when in edit mode
  const { data: editingEvent, isLoading: isLoadingEvent } = useEventById(
    editingEventId || undefined,
    user?.tenantId || undefined
  )

  // Load existing event data into form when editing
  useEffect(() => {
    if (isEditMode && editingEvent && !isLoadingEvent) {
      console.log('Loading event data for editing:', editingEvent)

      // Convert ISO datetime to datetime-local format (YYYY-MM-DDTHH:mm)
      const formatDateTimeForInput = (isoString: string) => {
        const date = new Date(isoString)
        // Format as YYYY-MM-DDTHH:mm (datetime-local format)
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        const hours = String(date.getHours()).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')
        return `${year}-${month}-${day}T${hours}:${minutes}`
      }

      // Update event details
      updateEventDetails({
        name: editingEvent.name,
        description: editingEvent.description || '',
        dateTime: formatDateTimeForInput(editingEvent.dateTime),
        location: editingEvent.location,
        posterUrl: editingEvent.posterUrl || '',
      })

      // For now, populate with default ticket data
      // TODO: Load actual ticket types from event
      updateTicketConfiguration({
        ticketTypes: [{
          name: 'General Admission',
          price: 50000,
          quantity: 100,
          description: 'Standard event access'
        }]
      })

      // Update publication settings
      updatePublicationSettings({
        slug: `${editingEvent.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
        isPublished: editingEvent.status === 'published',
        publishDate: undefined,
        termsAccepted: true,
      })
    }
  }, [isEditMode, editingEvent, isLoadingEvent, updateEventDetails, updateTicketConfiguration, updatePublicationSettings])

  // Handle expand to full page
  const handleExpand = () => {
    // Save current form state and close modal
    closeModal()
    // Navigate to appropriate full page
    if (isEditMode && editingEventId) {
      router.push(`/events/${editingEventId}/edit`)
    } else {
      router.push('/events/create')
    }
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
        slug: generateSlug(formData.name), // Generate slug from event name
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

  // Note: Form reset is now handled by the store's closeModal function

  // Loading state
  const isLoading = createEventMutation.isPending || updateEventMutation.isPending || (isEditMode && isLoadingEvent)

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
