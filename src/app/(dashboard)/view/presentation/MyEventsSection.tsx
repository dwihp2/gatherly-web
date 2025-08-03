/**
 * My Events Section Component
 * Location: app/(dashboard)/view/presentation/MyEventsSection.tsx
 * 
 * Section displaying user's events in a table format with filters and actions
 */
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
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
import {
  Eye,
  Edit,
  Share,
  QrCode,
  Download,
  MoreHorizontal,
  Plus,
  Calendar,
  AlertCircle,
  Send,
  Archive
} from 'lucide-react'
import { formatIDR } from '@/lib/utils/currency'
import { useEventFormStore } from '../../../events/stores/eventFormStore'
import { useEventsByOrganization } from '../../../events/usecases/useEventsByOrganization'
import { useUpdateEventStatus } from '../../../events/usecases/useUpdateEventStatus'
import { useAuth } from '../../../(auth)/hooks/useAuth'
import type { Event } from '../../../events/models/interfaces/event'

// Using real event data from useEventsByOrganization hook

export function MyEventsSection() {
  const [statusFilter, setStatusFilter] = useState('all')
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

  const { openCreateModal, openEditModal } = useEventFormStore()
  const { user } = useAuth()
  const updateEventStatusMutation = useUpdateEventStatus()

  // Fetch events data
  const {
    data: events = [],
    isLoading,
    error
  } = useEventsByOrganization(user?.tenantId || undefined)

  const filteredEvents = events.filter((event: Event) =>
    statusFilter === 'all' || event.status === statusFilter
  )

  const handleViewDetails = (eventId: string) => {
    console.log('View details for event:', eventId)
    // TODO: Navigate to event details page
  }

  const handleEditEvent = (eventId: string) => {
    console.log('Edit event:', eventId)
    openEditModal(eventId)
  }

  const handleShareEvent = (eventId: string) => {
    console.log('Share event:', eventId)
    // TODO: Open share modal/options
  }

  const handleQRScanner = (eventId: string) => {
    console.log('Open QR scanner for event:', eventId)
    // TODO: Open QR scanner modal
  }

  const handleDownloadAttendees = (eventId: string) => {
    console.log('Download attendees for event:', eventId)
    // TODO: Implement download attendees functionality
  }

  const handlePublishEvent = (eventId: string, eventName: string) => {
    setConfirmationDialog({
      isOpen: true,
      type: 'publish',
      eventId,
      eventName
    })
  }

  const handleUnpublishEvent = (eventId: string, eventName: string) => {
    setConfirmationDialog({
      isOpen: true,
      type: 'unpublish',
      eventId,
      eventName
    })
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
      console.error('Failed to update event status:', error)
    }
  }

  const handleCreateEvent = () => {
    openCreateModal()
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge className="bg-green-100 text-green-800">Published</Badge>
      case 'draft':
        return <Badge variant="secondary">Draft</Badge>
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const formatEventDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Loading state
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
                <Skeleton className="h-6 w-20" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  // Error state
  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            My Events
            <Button onClick={handleCreateEvent} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create Event
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to load events</h3>
            <p className="text-gray-600 mb-6">
              There was an error loading your events. Please try again.
            </p>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (filteredEvents.length === 0 && statusFilter === 'all') {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            My Events
            <Button onClick={handleCreateEvent} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create Event
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No events yet</h3>
            <p className="text-gray-600 mb-6">
              Create your first event to start selling tickets
            </p>
            <Button onClick={handleCreateEvent} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create First Event
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <CardTitle>My Events</CardTitle>
            <div className="flex items-center gap-3">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleCreateEvent} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create Event
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Tickets Sold</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEvents.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={event.posterUrl} alt={event.name} />
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                            {event.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-gray-900">{event.name}</div>
                          <div className="text-sm text-gray-600">{event.location}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {formatEventDate(event.dateTime)}
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(event.status)}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm font-medium">
                          {event.ticketsSold} / {event.totalTickets}
                        </div>
                        <Progress
                          value={(event.ticketsSold / event.totalTickets) * 100}
                          className="h-2 w-20"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">
                        {formatIDR(event.totalRevenue)}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewDetails(event.id)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditEvent(event.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Event
                          </DropdownMenuItem>
                          {event.status === 'draft' && (
                            <DropdownMenuItem onClick={() => handlePublishEvent(event.id, event.name)}>
                              <Send className="mr-2 h-4 w-4" />
                              Publish Event
                            </DropdownMenuItem>
                          )}
                          {event.status === 'published' && (
                            <DropdownMenuItem onClick={() => handleUnpublishEvent(event.id, event.name)}>
                              <Archive className="mr-2 h-4 w-4" />
                              Unpublish Event
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem onClick={() => handleShareEvent(event.id)}>
                            <Share className="mr-2 h-4 w-4" />
                            Share Link
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleQRScanner(event.id)}>
                            <QrCode className="mr-2 h-4 w-4" />
                            QR Scanner
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDownloadAttendees(event.id)}>
                            <Download className="mr-2 h-4 w-4" />
                            Download Attendees
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <AlertDialog open={confirmationDialog.isOpen} onOpenChange={(open) =>
        !open && setConfirmationDialog({ isOpen: false, type: null, eventId: null, eventName: null })
      }>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {confirmationDialog.type === 'publish' ? 'Publish Event' : 'Unpublish Event'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {confirmationDialog.type === 'publish'
                ? `Are you sure you want to publish "${confirmationDialog.eventName}"? Once published, the event will be visible to the public and attendees can purchase tickets.`
                : `Are you sure you want to unpublish "${confirmationDialog.eventName}"? The event will be moved back to draft status and will no longer be visible to the public.`
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmStatusChange}
              disabled={updateEventStatusMutation.isPending}
            >
              {updateEventStatusMutation.isPending ? 'Processing...' :
                confirmationDialog.type === 'publish' ? 'Publish Event' : 'Unpublish Event'
              }
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
