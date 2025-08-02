/**
 * Create Event Modal Container
 * Location: app/events/view/container/CreateEventModalContainer.tsx
 */
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useEventFormStore } from '../../stores/eventFormStore'
import { CreateEventModal } from '../presentation/CreateEventModal'
import { EventDetailsForm } from '../presentation/EventDetailsForm'
import { TicketConfigurationForm } from '../presentation/TicketConfigurationForm'
import { PublicationSettingsForm } from '../presentation/PublicationSettingsForm'
import { EventFormStep } from '../../models/interfaces/eventForm'
import { useAuth } from '../../../(auth)/hooks/useAuth'

export function CreateEventModalContainer() {
  const router = useRouter()
  const { user } = useAuth()
  const {
    isModalOpen,
    isEditMode,
    currentStep,
    isLoading,
    closeModal,
    resetForm,
    getFormData,
    setLoading
  } = useEventFormStore()

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
      console.error('No tenant ID found')
      return
    }

    setLoading(true)

    try {
      const formData = getFormData()
      formData.organizationId = user.tenantId

      // TODO: Implement actual event creation via usecase
      console.log('Creating event:', formData)

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Close modal and reset form on success
      closeModal()

      // TODO: Show success toast
      // TODO: Refresh events list

    } catch (error) {
      console.error('Error creating event:', error)
      // TODO: Show error toast
    } finally {
      setLoading(false)
    }
  }

  // Handle modal close
  const handleClose = () => {
    if (!isLoading) {
      closeModal()
    }
  }

  // Reset form when modal closes
  useEffect(() => {
    if (!isModalOpen) {
      resetForm()
    }
  }, [isModalOpen, resetForm])

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
