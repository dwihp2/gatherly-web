/**
 * My Events Section Component
 * Location: app/(dashboard)/view/presentation/MyEventsSection.tsx
 * 
 * Section displaying user's events in a DataTable format with enhanced features
 */
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Plus, Calendar } from 'lucide-react'
import { DataTable } from '@/components/ui/data-table'
import { createEventColumns } from '../../../events/view/presentation/EventColumns'
import { useEventFormStore } from '../../../events/stores/eventFormStore'
import { useEventsByOrganization } from '../../../events/usecases/useEventsByOrganization'
import { useUpdateEventStatus } from '../../../events/usecases/useUpdateEventStatus'
import { useAuth } from '../../../(auth)/hooks/useAuth'
import type { Event } from '../../../events/models/interfaces/event'

export function MyEventsSection() {
  const [confirmationDialog, setConfirmationDialog] = useState<{
    isOpen: boolean
    type: 'publish' | 'unpublish' | null
    eventId: string | null
    eventName: string | null
  }>({
    isOpen: false,
    type: null,
    eventId: null,
    eventName: null
  })

  const router = useRouter()
  const { openCreateModal, openEditModal } = useEventFormStore()
  const { user } = useAuth()
  const updateEventStatusMutation = useUpdateEventStatus()

  // Fetch events data
  const {
    data: events = [],
    isLoading,
    error,
    refetch
  } = useEventsByOrganization(user?.tenantId || undefined)

  // Event action handlers
  const handleViewEvent = (eventId: string) => {
    router.push(`/events/${eventId}`)
  }

  const handleEditEvent = (eventId: string) => {
    openEditModal(eventId)
  }

  const handleShareEvent = (eventId: string) => {
    const event = events.find(e => e.id === eventId)
    if (event) {
      const shareUrl = `${window.location.origin}/events/${eventId}`
      navigator.clipboard.writeText(shareUrl)
      // TODO: Show toast notification
    }
  }

  const handleShowQRScanner = (eventId: string) => {
    router.push(`/dashboard/events/${eventId}/check-in`)
  }

  const handleDownloadAttendees = (eventId: string) => {
    // TODO: Implement download attendees functionality
    console.log('Download attendees for event:', eventId)
  }

  const handlePublishEvent = (eventId: string) => {
    const event = events.find(e => e.id === eventId)
    if (event) {
      setConfirmationDialog({
        isOpen: true,
        type: 'publish',
        eventId,
        eventName: event.name
      })
    }
  }

  const handleUnpublishEvent = (eventId: string) => {
    const event = events.find(e => e.id === eventId)
    if (event) {
      setConfirmationDialog({
        isOpen: true,
        type: 'unpublish',
        eventId,
        eventName: event.name
      })
    }
  }

  const handleBulkDelete = async (selectedEvents: Event[]) => {
    // TODO: Implement bulk delete functionality
    console.log('Bulk delete events:', selectedEvents.map(e => e.id))
  }

  const handleBulkStatusChange = async (selectedEvents: Event[], status: string) => {
    try {
      const promises = selectedEvents.map(event =>
        updateEventStatusMutation.mutateAsync({
          eventId: event.id,
          organizationId: user?.tenantId || '',
          status: status as Event['status']
        })
      )
      await Promise.all(promises)
      refetch()
    } catch (error) {
      console.error('Bulk status change failed:', error)
    }
  }

  const confirmStatusChange = async () => {
    if (!user?.tenantId || !confirmationDialog.eventId) return

    try {
      const status = confirmationDialog.type === 'publish' ? 'published' : 'draft'
      await updateEventStatusMutation.mutateAsync({
        eventId: confirmationDialog.eventId,
        organizationId: user.tenantId,
        status
      })

      setConfirmationDialog({
        isOpen: false,
        type: null,
        eventId: null,
        eventName: null
      })
    } catch (error) {
      console.error('Status change failed:', error)
    }
  }

  // Create column definitions with action handlers
  const columns = createEventColumns({
    onViewEvent: handleViewEvent,
    onEditEvent: handleEditEvent,
    onPublishEvent: handlePublishEvent,
    onUnpublishEvent: handleUnpublishEvent,
    onShareEvent: handleShareEvent,
    onShowQRScanner: handleShowQRScanner,
    onDownloadAttendees: handleDownloadAttendees,
  })

  // Filter options for status column
  const statusFilterOptions = [
    { label: 'Draft', value: 'draft', count: events.filter(e => e.status === 'draft').length },
    { label: 'Published', value: 'published', count: events.filter(e => e.status === 'published').length },
    { label: 'Cancelled', value: 'cancelled', count: events.filter(e => e.status === 'cancelled').length },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <div className="flex items-center gap-3">
          <Calendar className="h-5 w-5 text-muted-foreground" />
          <CardTitle>My Events</CardTitle>
        </div>
        <Button onClick={() => openCreateModal()} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Create Event
        </Button>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns}
          data={events}
          searchKey="name"
          searchPlaceholder="Search events..."
          // onAdd={() => openCreateModal()}
          onRefresh={() => refetch()}
          onBulkDelete={handleBulkDelete}
          onBulkStatusChange={handleBulkStatusChange}
          filterableColumns={[
            {
              key: "status",
              title: "Status",
              options: statusFilterOptions
            }
          ]}
          isLoading={isLoading}
          error={error}
        />
      </CardContent>

      {/* Confirmation Dialog */}
      <AlertDialog
        open={confirmationDialog.isOpen}
        onOpenChange={(open) => {
          if (!open) {
            setConfirmationDialog({
              isOpen: false,
              type: null,
              eventId: null,
              eventName: null
            })
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {confirmationDialog.type === 'publish' ? 'Publish Event' : 'Unpublish Event'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to {confirmationDialog.type} &quot;{confirmationDialog.eventName}&quot;?
              {confirmationDialog.type === 'publish' &&
                ' This will make the event visible to the public and allow ticket sales.'
              }
              {confirmationDialog.type === 'unpublish' &&
                ' This will hide the event from the public and stop ticket sales.'
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmStatusChange}
              disabled={updateEventStatusMutation.isPending}
            >
              {updateEventStatusMutation.isPending ? 'Processing...' : 'Confirm'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  )
}
