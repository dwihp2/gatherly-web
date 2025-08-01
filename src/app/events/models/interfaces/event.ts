import { z } from 'zod'

export const CreateEventSchema = z.object({
  tenantId: z.string().uuid(),
  name: z.string().min(1, 'Event name is required').max(255),
  description: z.string().optional(),
  dateTime: z.string().datetime(),
  location: z.string().min(1, 'Location is required'),
  posterUrl: z.string().url().optional(),
})

export const EventSchema = CreateEventSchema.extend({
  id: z.string().uuid(),
  status: z.enum(['draft', 'published', 'cancelled']),
  totalTickets: z.number().int().min(0),
  ticketsSold: z.number().int().min(0),
  totalRevenue: z.number().min(0),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const TicketTypeSchema = z.object({
  id: z.string().uuid(),
  eventId: z.string().uuid(),
  name: z.string().min(1, 'Ticket name is required').max(100),
  description: z.string().optional(),
  price: z.number().min(0),
  quantity: z.number().int().min(1),
  sold: z.number().int().min(0).default(0),
})

export type CreateEventInput = z.infer<typeof CreateEventSchema>
export type Event = z.infer<typeof EventSchema>
export type TicketType = z.infer<typeof TicketTypeSchema>
