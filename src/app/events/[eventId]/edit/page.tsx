/**
 * Edit Event Page - Full Page Edit Mode
 * Location: app/events/[eventId]/edit/page.tsx
 */
'use client'

import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import { useEventFormStore } from '../../stores/eventFormStore'
import { CreateEventPageContainer } from '../../view/container/CreateEventPageContainer'
import { useEventById } from '../../usecases/useEventById'
import { useAuth } from '../../../(auth)/hooks/useAuth'
import { generateSlug } from '@/lib/utils/slug'
import { Skeleton } from '@/components/ui/skeleton'

export default function EditEventPage() {
  const params = useParams()
  const eventId = params.eventId as string
  const { user } = useAuth()
  const {
    openEditModal,
    updateEventDetails,
    updateTicketConfiguration,
    updatePublicationSettings
  } = useEventFormStore()

  // Fetch event data
  const { data: editingEvent, isLoading: isLoadingEvent, error } = useEventById(
    eventId || undefined,
    user?.tenantId || undefined
  )

  // Initialize edit mode when page loads
  useEffect(() => {
    if (eventId) {
      openEditModal(eventId)
    }
  }, [eventId, openEditModal])

  // Load existing event data into form when editing
  useEffect(() => {
    if (editingEvent && !isLoadingEvent) {
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
        slug: generateSlug(editingEvent.name),
        isPublished: editingEvent.status === 'published',
        publishDate: undefined,
        termsAccepted: true,
      })
    }
  }, [editingEvent, isLoadingEvent, updateEventDetails, updateTicketConfiguration, updatePublicationSettings])

  // Show loading state while fetching event data
  if (isLoadingEvent) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container max-w-4xl mx-auto py-8">
          <div className="space-y-6">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-96" />
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </div>
    )
  }

  // Show error state if event not found
  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container max-w-4xl mx-auto py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-destructive mb-2">Event Not Found</h1>
            <p className="text-muted-foreground">The event you&apos;re trying to edit doesn&apos;t exist or you don&apos;t have permission to edit it.</p>
          </div>
        </div>
      </div>
    )
  }

  return <CreateEventPageContainer isEditMode={true} />
}
