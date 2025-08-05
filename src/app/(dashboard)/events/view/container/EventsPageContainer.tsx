/**
 * Events Page Container
 * Location: app/(dashboard)/events/view/container/EventsPageContainer.tsx
 * 
 * Container component for the events listing page with filtering
 */
'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  Plus, 
  Search, 
  Calendar,
  Eye,
  Edit,
  MoreHorizontal,
  Trash2
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DataTable } from '@/components/ui/data-table'
import { useEventsByOrganization } from '../../../../events/usecases/useEventsByOrganization'
import { useAuth } from '../../../../(auth)/hooks/useAuth'
import { useEventFormStore } from '../../../../events/stores/eventFormStore'
import { formatIDR } from '@/lib/utils/currency'
import type { Event } from '../../../../events/models/interfaces/event'
import type { ColumnDef } from '@tanstack/react-table'

interface EventsPageContainerProps {
  status?: 'published' | 'draft' | 'cancelled'
  search?: string
  page: number
}

export function EventsPageContainer({ status, search, page }: EventsPageContainerProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user } = useAuth()
  const { openCreateModal, openEditModal } = useEventFormStore()
  const [searchQuery, setSearchQuery] = useState(search || '')

  // TODO: Implement pagination using page parameter
  console.log('Current page:', page)

  // Fetch events data
  const {
    data: allEvents = [],
    isLoading,
    error
  } = useEventsByOrganization(user?.tenantId || undefined)

  // Filter events based on status and search
  const filteredEvents = allEvents.filter((event: Event) => {
    const matchesStatus = !status || event.status === status
    const matchesSearch = !searchQuery || 
      event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesStatus && matchesSearch
  })

  // Handle filter changes
  const handleStatusFilter = (newStatus: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (newStatus === 'all') {
      params.delete('status')
    } else {
      params.set('status', newStatus)
    }
    router.push(`/dashboard/events?${params.toString()}`)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    const params = new URLSearchParams(searchParams.toString())
    if (query) {
      params.set('search', query)
    } else {
      params.delete('search')
    }
    router.push(`/dashboard/events?${params.toString()}`)
  }

  // Event actions
  const handleViewEvent = (eventId: string) => {
    router.push(`/events/${eventId}`)
  }

  const handleEditEvent = (eventId: string) => {
    openEditModal(eventId)
  }

  const handleDeleteEvent = (eventId: string) => {
    // TODO: Implement delete confirmation dialog
    console.log('Delete event:', eventId)
  }

  // Table columns
  const columns: ColumnDef<Event>[] = [
    {
      accessorKey: 'name',
      header: 'Event Name',
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-medium">{row.original.name}</span>
          <span className="text-sm text-muted-foreground">
            {new Date(row.original.dateTime).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            })}
          </span>
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.original.status
        const statusColors = {
          published: 'bg-green-100 text-green-800',
          draft: 'bg-yellow-100 text-yellow-800',
          cancelled: 'bg-red-100 text-red-800',
          completed: 'bg-blue-100 text-blue-800'
        }
        return (
          <Badge className={statusColors[status] || 'bg-gray-100 text-gray-800'}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        )
      },
    },
    {
      accessorKey: 'location',
      header: 'Location',
      cell: ({ row }) => (
        <span className="text-sm">{row.original.location}</span>
      ),
    },
    {
      accessorKey: 'ticketsSold',
      header: 'Tickets Sold',
      cell: ({ row }) => (
        <span className="text-sm">
          {row.original.ticketsSold} / {row.original.totalTickets}
        </span>
      ),
    },
    {
      accessorKey: 'totalRevenue',
      header: 'Revenue',
      cell: ({ row }) => (
        <span className="font-medium">
          {formatIDR(row.original.totalRevenue)}
        </span>
      ),
    },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleViewEvent(row.original.id)}>
              <Eye className="h-4 w-4 mr-2" />
              View Event
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleEditEvent(row.original.id)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Event
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => handleDeleteEvent(row.original.id)}
              className="text-red-600"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Event
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-red-600">
            Error loading events. Please try again.
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">My Events</h1>
          <p className="text-muted-foreground">
            Manage and monitor your events
          </p>
        </div>
        <Button onClick={openCreateModal}>
          <Plus className="h-4 w-4 mr-2" />
          Create Event
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={status || 'all'} onValueChange={handleStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Events</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Events Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Events ({filteredEvents.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={filteredEvents}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>
    </div>
  )
}
