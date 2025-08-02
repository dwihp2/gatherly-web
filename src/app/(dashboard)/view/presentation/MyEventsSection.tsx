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
  Eye,
  Edit,
  Share,
  QrCode,
  Download,
  MoreHorizontal,
  Plus,
  Calendar
} from 'lucide-react'
import { formatIDR } from '@/lib/utils/currency'

// Mock event data - TODO: Replace with actual data from usecases
const mockEvents = [
  {
    id: '1',
    name: 'Jakarta Music Festival',
    date: '2024-12-15T19:00:00Z',
    location: 'Jakarta Convention Center',
    status: 'published' as const,
    ticketsSold: 750,
    totalTickets: 1000,
    revenue: 37500000,
    posterUrl: '/placeholder-event.jpg'
  },
  {
    id: '2',
    name: 'Startup Networking Night',
    date: '2024-12-20T18:30:00Z',
    location: 'WeWork SCBD',
    status: 'published' as const,
    ticketsSold: 45,
    totalTickets: 50,
    revenue: 2250000,
    posterUrl: '/placeholder-event.jpg'
  },
  {
    id: '3',
    name: 'Tech Conference 2024',
    date: '2025-01-10T09:00:00Z',
    location: 'Hotel Indonesia Kempinski',
    status: 'draft' as const,
    ticketsSold: 0,
    totalTickets: 200,
    revenue: 0,
    posterUrl: '/placeholder-event.jpg'
  }
]

export function MyEventsSection() {
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredEvents = mockEvents.filter(event =>
    statusFilter === 'all' || event.status === statusFilter
  )

  const handleViewDetails = (eventId: string) => {
    console.log('View details for event:', eventId)
    // TODO: Navigate to event details page
  }

  const handleEditEvent = (eventId: string) => {
    console.log('Edit event:', eventId)
    // TODO: Open edit event modal
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
    // TODO: Download attendees CSV
  }

  const handleCreateEvent = () => {
    console.log('Create new event')
    // TODO: Open create event modal
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
                      {formatEventDate(event.date)}
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
                      {formatIDR(event.revenue)}
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
  )
}
