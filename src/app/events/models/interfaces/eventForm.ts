/**
 * Event Form Models for Create/Edit Event Modal
 * Location: app/events/models/interfaces/eventForm.ts
 */
import { z } from 'zod'

// Step 1: Event Details Schema
export const EventDetailsSchema = z.object({
  name: z.string()
    .min(1, 'Event name is required')
    .max(255, 'Event name must be less than 255 characters'),
  description: z.string()
    .max(5000, 'Description must be less than 5000 characters')
    .optional(),
  dateTime: z.string()
    .datetime('Please select a valid date and time'),
  location: z.string()
    .min(1, 'Location is required')
    .max(500, 'Location must be less than 500 characters'),
  posterUrl: z.string()
    .url('Please enter a valid URL')
    .optional()
    .or(z.literal(''))
})

// Step 2: Ticket Configuration Schema
export const TicketTypeFormSchema = z.object({
  id: z.string().uuid().optional(), // For editing existing tickets
  name: z.string()
    .min(1, 'Ticket name is required')
    .max(100, 'Ticket name must be less than 100 characters'),
  description: z.string()
    .max(500, 'Description must be less than 500 characters')
    .optional(),
  price: z.number()
    .min(0, 'Price must be 0 or greater')
    .max(100000000, 'Price cannot exceed 100 million IDR'),
  quantity: z.number()
    .int('Quantity must be a whole number')
    .min(1, 'Quantity must be at least 1')
    .max(10000, 'Quantity cannot exceed 10,000'),
})

export const TicketConfigurationSchema = z.object({
  ticketTypes: z.array(TicketTypeFormSchema)
    .min(1, 'At least one ticket type is required')
    .max(10, 'Maximum 10 ticket types allowed')
})

// Step 3: Publication Settings Schema
export const PublicationSettingsSchema = z.object({
  slug: z.string()
    .min(3, 'URL slug must be at least 3 characters')
    .max(100, 'URL slug must be less than 100 characters')
    .regex(/^[a-z0-9-]+$/, 'URL slug can only contain lowercase letters, numbers, and hyphens'),
  isPublished: z.boolean().optional(),
  publishDate: z.string()
    .datetime()
    .optional(),
  termsAccepted: z.boolean()
    .refine(val => val === true, 'You must accept the terms and conditions')
})

// Complete Create Event Schema (all steps combined)
export const CreateEventFormSchema = EventDetailsSchema
  .merge(TicketConfigurationSchema)
  .merge(PublicationSettingsSchema)
  .extend({
    organizationId: z.string().uuid()
  })

// Form step enum
export const EventFormStep = {
  DETAILS: 1,
  TICKETS: 2,
  PUBLICATION: 3
} as const

export type EventFormStep = typeof EventFormStep[keyof typeof EventFormStep]

// Type definitions
export type EventDetailsFormData = z.infer<typeof EventDetailsSchema>
export type TicketTypeFormData = z.infer<typeof TicketTypeFormSchema>
export type TicketConfigurationFormData = z.infer<typeof TicketConfigurationSchema>
export type PublicationSettingsFormData = z.infer<typeof PublicationSettingsSchema>
export type CreateEventFormData = z.infer<typeof CreateEventFormSchema>

// Form state for managing wizard
export interface EventFormState {
  currentStep: EventFormStep
  isLoading: boolean
  isValid: Record<EventFormStep, boolean>
  errors: Record<string, string[]>
}

// Default form values
export const defaultEventDetailsValues: EventDetailsFormData = {
  name: '',
  description: '',
  dateTime: '',
  location: '',
  posterUrl: ''
}

export const defaultTicketTypeValues: TicketTypeFormData = {
  name: 'General Admission',
  description: '',
  price: 0,
  quantity: 100
}

export const defaultPublicationValues: PublicationSettingsFormData = {
  slug: '',
  isPublished: false,
  publishDate: undefined,
  termsAccepted: false
}
