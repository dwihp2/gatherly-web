/**
 * Event Repository - Data Access Layer for Event Management
 * Location: app/events/repositories/createEvent.ts
 * 
 * Following Clean Architecture principles:
 * - Repository layer handles direct database operations
 * - Validates input data with Zod schemas
 * - Returns typed results
 * - Handles errors appropriately
 */

import { db } from '@/lib/db'
import { eventsTable } from '@/lib/db/schema'
import { CreateEventSchema } from '../models/interfaces/event'
import type { CreateEventInput, Event } from '../models/interfaces/event'

export async function createEvent(input: CreateEventInput): Promise<Event> {
  console.log('Repository: Creating event with input:', input)

  // Validate input with Zod schema
  const validatedInput = CreateEventSchema.parse(input)

  try {
    // Insert new event into database
    const [newEvent] = await db.insert(eventsTable)
      .values({
        id: crypto.randomUUID(),
        organizationId: validatedInput.tenantId, // Map tenantId to organizationId
        name: validatedInput.name,
        slug: validatedInput.slug, // Include the validated slug
        description: validatedInput.description,
        dateTime: new Date(validatedInput.dateTime), // Convert ISO string to Date
        location: validatedInput.location,
        posterUrl: validatedInput.posterUrl,
        status: 'draft', // Always start as draft
        totalTickets: 0,
        ticketsSold: 0,
        totalRevenue: '0',
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning()

    console.log('Repository: Event created successfully:', newEvent)

    // Transform the database result to match our Event interface
    const eventResult: Event = {
      id: newEvent.id,
      tenantId: newEvent.organizationId, // Map organizationId back to tenantId
      name: newEvent.name,
      slug: newEvent.slug, // Include the slug from database
      description: newEvent.description || '',
      dateTime: newEvent.dateTime.toISOString(),
      location: newEvent.location,
      posterUrl: newEvent.posterUrl || '',
      status: newEvent.status as 'draft' | 'published' | 'cancelled',
      totalTickets: newEvent.totalTickets || 0,
      ticketsSold: newEvent.ticketsSold || 0,
      totalRevenue: parseFloat(newEvent.totalRevenue || '0'),
      createdAt: newEvent.createdAt!,
      updatedAt: newEvent.updatedAt!,
    }

    return eventResult

  } catch (error) {
    console.error('Repository: Failed to create event:', error)

    if (error instanceof Error) {
      // Check for specific database errors
      if (error.message.includes('duplicate key') || error.message.includes('unique constraint')) {
        throw new Error('An event with this name already exists')
      }

      if (error.message.includes('foreign key constraint')) {
        throw new Error('Invalid organization ID')
      }
    }

    throw new Error('Failed to create event. Please try again.')
  }
}
