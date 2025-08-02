/**
 * Get Event by ID Repository
 * Location: app/events/repositories/getEventById.ts
 */

import { db } from '@/lib/db'
import { eventsTable } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'
import type { Event } from '../models/interfaces/event'

export async function getEventById(eventId: string, organizationId: string): Promise<Event | null> {
  console.log('Repository: Fetching event by ID:', eventId, 'for organization:', organizationId)
  
  if (!eventId || !organizationId) {
    throw new Error('Event ID and Organization ID are required')
  }
  
  try {
    const [event] = await db.select()
      .from(eventsTable)
      .where(and(
        eq(eventsTable.id, eventId),
        eq(eventsTable.organizationId, organizationId) // Ensure tenant isolation
      ))
      .limit(1)
    
    if (!event) {
      console.log('Repository: Event not found')
      return null
    }
    
    console.log('Repository: Found event:', event.name)
    
    // Transform database result to match Event interface
    const transformedEvent: Event = {
      id: event.id,
      tenantId: event.organizationId, // Map organizationId back to tenantId
      name: event.name,
      description: event.description || '',
      dateTime: event.dateTime.toISOString(),
      location: event.location,
      posterUrl: event.posterUrl || '',
      status: event.status as 'draft' | 'published' | 'cancelled',
      totalTickets: event.totalTickets || 0,
      ticketsSold: event.ticketsSold || 0,
      totalRevenue: parseFloat(event.totalRevenue || '0'),
      createdAt: event.createdAt!,
      updatedAt: event.updatedAt!,
    }
    
    return transformedEvent
    
  } catch (error) {
    console.error('Repository: Failed to fetch event:', error)
    throw new Error('Failed to fetch event. Please try again.')
  }
}
