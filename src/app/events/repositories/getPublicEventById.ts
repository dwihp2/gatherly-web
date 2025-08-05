/**
 * Get Public Event by ID Repository
 * Location: app/events/repositories/getPublicEventById.ts
 * 
 * Public repository function to get event details without organization restriction
 * Only returns published events for public viewing
 */

import { db } from '@/lib/db'
import { eventsTable } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'
import type { Event } from '../models/interfaces/event'

export async function getPublicEventById(eventId: string): Promise<Event | null> {
  console.log('Repository: Fetching public event by ID:', eventId)

  if (!eventId) {
    throw new Error('Event ID is required')
  }

  try {
    const [event] = await db.select()
      .from(eventsTable)
      .where(and(
        eq(eventsTable.id, eventId),
        eq(eventsTable.status, 'published') // Only show published events publicly
      ))
      .limit(1)

    if (!event) {
      console.log('Repository: Public event not found or not published')
      return null
    }

    console.log('Repository: Public event found:', event.name)
    
    // Map database fields to Event interface
    return {
      id: event.id,
      tenantId: event.organizationId, // Map organizationId to tenantId
      name: event.name,
      slug: event.slug,
      description: event.description || undefined,
      dateTime: event.dateTime.toISOString(),
      location: event.location,
      posterUrl: event.posterUrl || undefined,
      status: event.status as 'draft' | 'published' | 'cancelled',
      totalTickets: event.totalTickets || 0,
      ticketsSold: event.ticketsSold || 0,
      totalRevenue: parseFloat(event.totalRevenue || '0'),
      createdAt: event.createdAt || new Date(),
      updatedAt: event.updatedAt || new Date(),
    }
  } catch (error) {
    console.error('Repository: Error fetching public event:', error)
    throw new Error('Failed to fetch event details')
  }
}
