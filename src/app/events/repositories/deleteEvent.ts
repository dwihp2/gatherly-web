/**
 * Delete Event Repository
 * Location: app/events/repositories/deleteEvent.ts
 */

import { db } from '@/lib/db'
import { eventsTable } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'

export async function deleteEvent(eventId: string, organizationId: string): Promise<boolean> {
  console.log('Repository: Deleting event:', eventId, 'for organization:', organizationId)
  
  if (!eventId || !organizationId) {
    throw new Error('Event ID and Organization ID are required')
  }
  
  try {
    const result = await db.delete(eventsTable)
      .where(and(
        eq(eventsTable.id, eventId),
        eq(eventsTable.organizationId, organizationId) // Ensure tenant isolation
      ))
      .returning({ id: eventsTable.id })
    
    if (result.length === 0) {
      throw new Error('Event not found or you do not have permission to delete it')
    }
    
    console.log('Repository: Event deleted successfully')
    return true
    
  } catch (error) {
    console.error('Repository: Failed to delete event:', error)
    
    if (error instanceof Error && error.message.includes('not found')) {
      throw error // Re-throw our custom error message
    }
    
    throw new Error('Failed to delete event. Please try again.')
  }
}
