/**
 * Events Management Page Container
 * Location: app/events/view/container/EventsPageContainer.tsx
 * 
 * Container component for the main events management page
 */
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Plus, 
  Search, 
  Calendar,
  Eye,
  Edit,
  MoreHorizontal,
  Trash2,
  ArrowLeft
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DataTable } from '@/components/ui/data-table'
import { useEventsByOrganization } from '../../usecases/useEventsByOrganization'
import { useAuth } from '../../../(auth)/hooks/useAuth'
import { useEventFormStore } from '../../stores/eventFormStore'
import { formatIDR } from '@/lib/utils/currency'
import type { Event } from '../../models/interfaces/event'
import type { ColumnDef } from '@tanstack/react-table'

interface EventsPageContainerProps {
  // Accept searchParams for future use in pagination/filtering
  searchParams: Promise<{
    status?: string
    search?: string
    page?: string
  }>
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function EventsPageContainer(_props: EventsPageContainerProps) {
  const router = useRouter()
  const { user } = useAuth()
  const { openCreateModal, openEditModal } = useEventFormStore()
  const [searchQuery, setSearchQuery] = useState('')

  // Fetch events data
  const {
    data: allEvents = [],
    isLoading,
    error
  } = useEventsByOrganization(user?.tenantId || undefined)

  // Filter events based on status and search
  const filteredEvents = allEvents.filter((event: Event) => {
    const matchesSearch = !searchQuery || 
      event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesSearch
  })

  // Handle filter changes
  const handleSearch = (query: string) => {
    setSearchQuery(query)
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container max-w-7xl mx-auto py-4">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-8 w-48 bg-muted animate-pulse rounded" />
                <div className="h-4 w-96 bg-muted animate-pulse rounded" />
              </div>
              <div className="h-10 w-32 bg-muted animate-pulse rounded" />
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-10 w-64 bg-muted animate-pulse rounded" />
                <div className="h-10 w-32 bg-muted animate-pulse rounded" />
              </div>
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-16 w-full bg-muted animate-pulse rounded" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container max-w-7xl mx-auto py-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-destructive mb-2">Error Loading Events</h1>
            <p className="text-muted-foreground">There was an error loading your events. Please try again.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-7xl mx-auto py-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push('/dashboard')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                <Calendar className="h-8 w-8 text-primary" />
                My Events
              </h1>
              <p className="text-muted-foreground">
                Manage and track your events, tickets, and revenue
              </p>
            </div>
            <Button onClick={() => openCreateModal()} size="lg">
              <Plus className="mr-2 h-4 w-4" />
              Create Event
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Events Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Events ({filteredEvents.length})</span>
              {filteredEvents.length > 0 && (
                <Badge variant="secondary">
                  Total Revenue: {formatIDR(filteredEvents.reduce((sum, event) => sum + event.totalRevenue, 0))}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredEvents.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No events found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery ? "No events match your search criteria." : "You haven't created any events yet."}
                </p>
                <Button onClick={() => openCreateModal()}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Event
                </Button>
              </div>
            ) : (
              <DataTable
                columns={columns}
                data={filteredEvents}
                searchKey="name"
                searchPlaceholder="Search events..."
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
