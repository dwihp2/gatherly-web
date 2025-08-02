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
import { updateEvent, type UpdateEventInput } from '../repositories/updateEvent'
import { deleteEvent } from '../repositories/deleteEvent'
import type { CreateEventInput, Event } from '../models/interfaces/event'

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

export async function updateEventAction(data: UpdateEventInput): Promise<Event> {
  try {
    const event = await updateEvent(data)
    
    // Revalidate the dashboard and specific event pages
    revalidatePath('/dashboard')
    revalidatePath(`/events/${event.id}`)
    
    return event
  } catch (error) {
    console.error('Server Action: updateEvent failed:', error)
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
