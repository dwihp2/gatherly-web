/**
 * Dashboard Statistics Use Case
 * Location: app/events/usecases/useDashboardStats.ts
 * 
 * Calculates dashboard statistics from events data
 */

import { useMemo } from 'react'
import { useEventsByOrganization } from './useEventsByOrganization'
import type { Event } from '../models/interfaces/event'

export interface DashboardStats {
  totalRevenue: number
  totalTicketsSold: number
  activeEvents: number
  publishedEvents: number
  draftEvents: number
  cancelledEvents: number
  upcomingEvent: {
    name: string
    daysUntil: number
  } | null
}

export function useDashboardStats(organizationId: string | undefined) {
  const { data: events = [], isLoading, error } = useEventsByOrganization(organizationId)

  const stats: DashboardStats = useMemo(() => {
    if (!events.length) {
      return {
        totalRevenue: 0,
        totalTicketsSold: 0,
        activeEvents: 0,
        publishedEvents: 0,
        draftEvents: 0,
        cancelledEvents: 0,
        upcomingEvent: null,
      }
    }

    // Calculate totals
    const totalRevenue = events.reduce((sum: number, event: Event) => sum + event.totalRevenue, 0)
    const totalTicketsSold = events.reduce((sum: number, event: Event) => sum + event.ticketsSold, 0)

    // Count events by status
    const publishedEvents = events.filter((event: Event) => event.status === 'published').length
    const draftEvents = events.filter((event: Event) => event.status === 'draft').length
    const cancelledEvents = events.filter((event: Event) => event.status === 'cancelled').length
    const activeEvents = publishedEvents + draftEvents // Active = published + draft

    // Find upcoming event (next published event)
    const now = new Date()
    const upcomingEvents = events
      .filter((event: Event) => event.status === 'published' && new Date(event.dateTime) > now)
      .sort((a: Event, b: Event) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime())

    const upcomingEvent = upcomingEvents.length > 0 ? {
      name: upcomingEvents[0].name,
      daysUntil: Math.ceil((new Date(upcomingEvents[0].dateTime).getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    } : null

    return {
      totalRevenue,
      totalTicketsSold,
      activeEvents,
      publishedEvents,
      draftEvents,
      cancelledEvents,
      upcomingEvent,
    }
  }, [events])

  return {
    stats,
    isLoading,
    error,
  }
}
