/**
 * Event Server Actions
 * Location: app/events/actions/eventActions.ts
 * 
 * Server actions for event operations - runs only on server side
 * Prevents database modules from being bundled with client code
 */

'use server'

import { revalidatePath } from 'next/cache'
import { createEvent } from '../repositories/createEvent'
import { getEventsByOrganization } from '../repositories/getEventsByOrganization'
import { getEventById } from '../repositories/getEventById'
import { updateEvent, type UpdateEventRepositoryInput } from '../repositories/updateEvent'
import { deleteEvent } from '../repositories/deleteEvent'
import type { CreateEventInput, Event, UpdateEventWithIdInput } from '../models/interfaces/event'
import type { EventStatus } from '../models/types/event-filters'

export async function createEventAction(data: CreateEventInput): Promise<Event> {
  try {
    const event = await createEvent(data)

    // Revalidate the dashboard and events pages
    revalidatePath('/dashboard')
    revalidatePath(`/events/${event.id}`)

    return event
  } catch (error) {
    console.error('Server Action: createEvent failed:', error)
    throw error
  }
}

export async function getEventsByOrganizationAction(organizationId: string): Promise<Event[]> {
  try {
    return await getEventsByOrganization(organizationId)
  } catch (error) {
    console.error('Server Action: getEventsByOrganization failed:', error)
    throw error
  }
}

export async function getEventByIdAction(eventId: string, organizationId: string): Promise<Event | null> {
  try {
    return await getEventById(eventId, organizationId)
  } catch (error) {
    console.error('Server Action: getEventById failed:', error)
    throw error
  }
}

export async function updateEventAction(data: UpdateEventWithIdInput): Promise<Event> {
  try {
    // Convert the input format to what the repository expects
    const repositoryInput: UpdateEventRepositoryInput = {
      id: data.id,
      tenantId: data.tenantId,
      ...(data.name && { name: data.name }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.dateTime && { dateTime: data.dateTime }),
      ...(data.location && { location: data.location }),
      ...(data.posterUrl !== undefined && { posterUrl: data.posterUrl }),
      ...(data.status && { status: data.status }),
    }

    const event = await updateEvent(repositoryInput)

    // Revalidate the dashboard and specific event pages
    revalidatePath('/dashboard')
    revalidatePath(`/events/${event.id}`)

    return event
  } catch (error) {
    console.error('Server Action: updateEvent failed:', error)
    throw error
  }
}

export async function updateEventStatusAction(
  eventId: string,
  organizationId: string,
  status: EventStatus
): Promise<Event> {
  try {
    // Use the existing updateEvent function with just status change
    const event = await updateEvent({
      id: eventId,
      tenantId: organizationId,
      status
    })

    // Revalidate the dashboard and specific event pages
    revalidatePath('/dashboard')
    revalidatePath(`/events/${event.id}`)

    return event
  } catch (error) {
    console.error('Server Action: updateEventStatus failed:', error)
    throw error
  }
}

export async function deleteEventAction(eventId: string, organizationId: string): Promise<boolean> {
  try {
    const result = await deleteEvent(eventId, organizationId)

    // Revalidate the dashboard
    revalidatePath('/dashboard')

    return result
  } catch (error) {
    console.error('Server Action: deleteEvent failed:', error)
    throw error
  }
}
