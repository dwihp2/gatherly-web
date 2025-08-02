/**
 * Get Events by Organization Repository
 * Location: app/events/repositories/getEventsByOrganization.ts
 */

import { db } from '@/lib/db'
import { eventsTable } from '@/lib/db/schema'
import { eq, desc } from 'drizzle-orm'
import type { Event } from '../models/interfaces/event'

export async function getEventsByOrganization(organizationId: string): Promise<Event[]> {
  console.log('Repository: Fetching events for organization:', organizationId)
  
  if (!organizationId) {
    throw new Error('Organization ID is required')
  }
  
  try {
    const events = await db.select()
      .from(eventsTable)
      .where(eq(eventsTable.organizationId, organizationId))
      .orderBy(desc(eventsTable.createdAt))
    
    console.log('Repository: Found events:', events.length)
    
    // Transform database results to match Event interface
    const transformedEvents: Event[] = events.map(event => ({
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
    }))
    
    return transformedEvents
    
  } catch (error) {
    console.error('Repository: Failed to fetch events:', error)
    throw new Error('Failed to fetch events. Please try again.')
  }
}
