/**
 * Event Detail Container
 * Location: app/events/[eventId]/view/container/EventDetailContainer.tsx
 * 
 * Container for public event detail page
 */
'use client'

import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Share2,
  ArrowLeft,
  Ticket
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { usePublicEventById } from '../../../usecases/usePublicEventById'
import { formatIDR } from '@/lib/utils/currency'

interface EventDetailContainerProps {
  eventId: string
}

export function EventDetailContainer({ eventId }: EventDetailContainerProps) {
  const router = useRouter()
  const { data: event, isLoading, error } = usePublicEventById(eventId)

  if (isLoading) {
    return <div>Loading event details...</div>
  }

  if (error || !event) {
    notFound()
  }

  const eventDate = new Date(event.dateTime)
  const isEventPast = eventDate < new Date()

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: event.name,
          text: `Check out this event: ${event.name}`,
          url: window.location.href,
        })
      } catch {
        // Fall back to copying to clipboard
        await navigator.clipboard.writeText(window.location.href)
      }
    } else {
      // Fall back to copying to clipboard
      await navigator.clipboard.writeText(window.location.href)
    }
  }

  const statusColors = {
    published: 'bg-green-100 text-green-800',
    draft: 'bg-yellow-100 text-yellow-800',
    cancelled: 'bg-red-100 text-red-800',
  }

  return (
    <div className="container mx-auto py-4 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </div>

      {/* Event Header */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">{event.name}</h1>
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{eventDate.toLocaleDateString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{eventDate.toLocaleTimeString('id-ID', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })} WIB</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{event.location}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={statusColors[event.status]}>
                {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
              </Badge>
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Event Poster */}
          {event.posterUrl && (
            <Card>
              <CardContent className="p-0">
                <Image
                  src={event.posterUrl}
                  alt={event.name}
                  width={800}
                  height={256}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </CardContent>
            </Card>
          )}

          {/* Event Description */}
          <Card>
            <CardHeader>
              <CardTitle>About This Event</CardTitle>
            </CardHeader>
            <CardContent>
              {event.description ? (
                <div className="prose max-w-none">
                  {event.description.split('\n').map((paragraph: string, index: number) => (
                    <p key={index} className="mb-4 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No description available.</p>
              )}
            </CardContent>
          </Card>

          {/* Event Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Event Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Tickets Sold</p>
                    <p className="text-lg font-semibold">
                      {event.ticketsSold} / {event.totalTickets}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Ticket className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Available</p>
                    <p className="text-lg font-semibold">
                      {event.totalTickets - event.ticketsSold}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Info */}
          <Card>
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-sm text-muted-foreground">Date & Time</h4>
                <p className="text-sm">
                  {eventDate.toLocaleDateString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <p className="text-sm text-muted-foreground">
                  {eventDate.toLocaleTimeString('id-ID', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })} WIB
                </p>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium text-sm text-muted-foreground">Location</h4>
                <p className="text-sm">{event.location}</p>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium text-sm text-muted-foreground">Status</h4>
                <Badge className={statusColors[event.status]}>
                  {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                </Badge>
              </div>

              {event.status === 'cancelled' && (
                <>
                  <Separator />
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-sm text-red-800">
                      This event has been cancelled. Please contact the organizer for more information.
                    </p>
                  </div>
                </>
              )}

              {isEventPast && event.status === 'published' && (
                <>
                  <Separator />
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                    <p className="text-sm text-gray-600">
                      This event has ended.
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Revenue Info (only for organizers - later we'll add auth check) */}
          {event.totalRevenue > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-green-600">
                  {formatIDR(event.totalRevenue)}
                </p>
                <p className="text-sm text-muted-foreground">Total revenue generated</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
