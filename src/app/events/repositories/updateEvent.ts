/**
 * Update Event Repository
 * Location: app/events/repositories/updateEvent.ts
 */

import { db } from '@/lib/db'
import { eventsTable } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'
import { UpdateEventDataSchema } from '../models/interfaces/event'
import type { Event } from '../models/interfaces/event'

export interface UpdateEventRepositoryInput extends Partial<{
  name: string
  description?: string
  dateTime: string
  location: string
  posterUrl?: string
  status: 'draft' | 'published' | 'cancelled'
}> {
  id: string
  tenantId: string // Required for tenant isolation
}

export async function updateEvent(input: UpdateEventRepositoryInput): Promise<Event> {
  console.log('Repository: Updating event:', input.id)

  const { id, tenantId, ...updateData } = input

  if (!id || !tenantId) {
    throw new Error('Event ID and tenant ID are required')
  }

  // Validate the update data with Zod schema (partial validation, no tenantId)
  const validatedData = UpdateEventDataSchema.parse(updateData)

  try {
    // Prepare update values, converting dateTime string to Date if provided
    const updateValues: Record<string, unknown> = {}

    if (validatedData.name) updateValues.name = validatedData.name
    if (validatedData.slug) updateValues.slug = validatedData.slug
    if (validatedData.description !== undefined) updateValues.description = validatedData.description
    if (validatedData.dateTime) updateValues.dateTime = new Date(validatedData.dateTime)
    if (validatedData.location) updateValues.location = validatedData.location
    if (validatedData.posterUrl !== undefined) updateValues.posterUrl = validatedData.posterUrl
    if (validatedData.status) updateValues.status = validatedData.status

    // Always update the updatedAt timestamp
    updateValues.updatedAt = new Date()

    // Update event in database with tenant isolation
    const [updatedEvent] = await db.update(eventsTable)
      .set(updateValues)
      .where(and(
        eq(eventsTable.id, id),
        eq(eventsTable.organizationId, tenantId) // Ensure tenant isolation
      ))
      .returning()

    if (!updatedEvent) {
      throw new Error('Event not found or you do not have permission to update it')
    }

    console.log('Repository: Event updated successfully:', updatedEvent.name)

    // Transform the database result to match our Event interface
    const eventResult: Event = {
      id: updatedEvent.id,
      tenantId: updatedEvent.organizationId, // Map organizationId back to tenantId
      name: updatedEvent.name,
      slug: updatedEvent.slug, // Include slug from database
      description: updatedEvent.description || '',
      dateTime: updatedEvent.dateTime.toISOString(),
      location: updatedEvent.location,
      posterUrl: updatedEvent.posterUrl || '',
      status: updatedEvent.status as 'draft' | 'published' | 'cancelled',
      totalTickets: updatedEvent.totalTickets || 0,
      ticketsSold: updatedEvent.ticketsSold || 0,
      totalRevenue: parseFloat(updatedEvent.totalRevenue || '0'),
      createdAt: updatedEvent.createdAt!,
      updatedAt: updatedEvent.updatedAt!,
    }

    return eventResult

  } catch (error) {
    console.error('Repository: Failed to update event:', error)

    if (error instanceof Error) {
      // Check for specific database errors
      if (error.message.includes('duplicate key') || error.message.includes('unique constraint')) {
        throw new Error('An event with this name already exists')
      }

      if (error.message.includes('not found')) {
        throw error // Re-throw our custom error message
      }
    }

    throw new Error('Failed to update event. Please try again.')
  }
}
