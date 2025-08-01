---
applyTo: '**'
---
# GitHub Copilot Instructions

You are an AI programming assistant for Gatherly, a ticketing SaaS platform built for the Indonesian market.

## Architecture Overview

This project follows Clean Architecture principles as described in "How To Achieve Agile Programming with React" by Galih Permana. The architecture emphasizes separation of concerns, dependency inversion, and testability.

## Core Principles

1. **Server-First Approach**: Always consider if data fetching or processing can be done on the server before implementing client-side solutions
2. **Clean Architecture Layers**: Maintain strict separation between Views, Use Cases, and Repositories
3. **Dependency Direction**: Dependencies should point inward (Views → Use Cases → Repositories)
4. **Framework Independence**: Business logic should not depend on React or any UI framework
5. **Type Safety**: NEVER use `any` type - always use proper TypeScript types
6. **Accessibility**: Use semantic HTML first, add ARIA only when no semantic equivalent exists
7. **Validation**: Always validate external data with Zod schemas

## Technology Stack

> **Important**: For comprehensive technology stack details, refer to `.github/instructions/techstack.instructions.md`

## Design & Implementation References

> **Important**: For detailed feature specifications and component mapping, refer to:
> - **UX Structure Plan**: `UX-Structure-Plan.md` - Complete user experience flow, page structures, and component hierarchy
> - **Implementation Plan**: `Implementation-Plan.md` - Shadcn/UI component mapping for each UI element in the UX plan
> 
> These documents provide the blueprint for implementing all features according to the planned user experience.

### Key Technologies Summary
- **Next.js 15**: App Router with built-in Node.js backend (MVP), later migrate to dedicated backend
- **TypeScript**: Strict mode enabled - NEVER use `any` type
- **PostgreSQL + Drizzle ORM**: Type-safe database operations
- **Better-auth**: Authentication with Admin and Organization plugins
- **Shadcn/UI + Tailwind**: UI components and styling
- **TanStack Query + Zustand**: Server and client state management
- **React Hook Form + Zod**: Form handling and validation
- **Docker**: Containerization for deployment
- **Payment Abstraction**: Midtrans/Xendit wrapper for Indonesian market

> **Important**: For all UI development, follow the detailed guidelines in `.github/instructions/shadcn.instructions.md`

## Code Style Rules

- **NEVER use `any` type**: Always use proper TypeScript types with strict mode enabled
- **Function Components**: Prefer function components over class components
- **Data Validation**: Always validate external data with Zod schemas
- **Error Boundaries**: Include error and pending boundaries for all routes
- **Accessibility**: Follow accessibility best practices with ARIA attributes
- **Component Preference**: Always prefer Shadcn/ui components over custom ones
- **Server Actions**: Use server actions for mutations unless specified otherwise

## Multi-tenancy (SaaS Schema)

Every data model must include tenant isolation:

```typescript
// All database schemas must include tenantId
export const eventsTable = pgTable('events', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').notNull(), // Required for all tables
  name: varchar('name', { length: 255 }).notNull(),
  // ... other fields
});

// All queries must filter by tenantId
export async function getEventsByTenant(tenantId: string) {
  return await db.select()
    .from(eventsTable)
    .where(eq(eventsTable.tenantId, tenantId));
}
```

## Accessibility

Use semantic HTML first. Only add ARIA when no semantic equivalent exists:

```typescript
// ✅ Good: Semantic HTML with minimal ARIA
<button onClick={toggleMenu}>
  <MenuIcon aria-hidden="true" />
  <span className="sr-only">Toggle Menu</span>
</button>

// ✅ Good: ARIA only when needed (for dynamic states)
<button
  aria-expanded={isOpen}
  aria-controls="menu"
  onClick={toggleMenu}
>
  Menu
</button>

// ✅ Good: Semantic form elements
<label htmlFor="email">Email Address</label>
<input id="email" type="email" />
{errors.email && (
  <p role="alert">{errors.email}</p>
)}
```

## Indonesian Market Considerations

> **Important**: For detailed Indonesian market considerations including payment methods, localization patterns, and multi-tenancy setup, refer to `.github/instructions/techstack.instructions.md`

### Quick Reference
```typescript
// Currency formatting for IDR
export function formatIDR(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
}

// Payment gateway abstraction
export interface PaymentGateway {
  createCharge(params: CreateChargeParams): Promise<CreateChargeResult>;
  handleWebhook(payload: unknown): Promise<WebhookResult>;
}
```

## Folder Structure Example

```
app/
├── (auth)/              # Next.js Route Group + Clean Architecture Feature
│   ├── sign-in/         # Next.js route page
│   ├── sign-up/         # Next.js route page  
│   ├── view/            # Clean Architecture - Auth UI components
│   │   ├── container/
│   │   └── presentation/
│   ├── usecases/        # Clean Architecture - Auth business logic
│   ├── repositories/    # Clean Architecture - Auth data access
│   ├── models/          # Clean Architecture - Auth types & schemas
│   └── stores/          # Feature-specific Zustand stores
├── (dashboard)/         # Next.js Route Group - Dashboard pages for organizers
├── events/              # Public event pages (Next.js routes) + Clean Architecture Feature
│   ├── [eventId]/       # Dynamic route for event details
│   ├── view/            # Clean Architecture - Event UI components
│   │   ├── container/
│   │   └── presentation/
│   ├── usecases/        # Clean Architecture - Event business logic
│   ├── repositories/    # Clean Architecture - Event data access
│   ├── models/          # Clean Architecture - Event types & schemas
│   └── stores/          # Feature-specific Zustand stores
└── api/                 # API routes (MVP only)
lib/
├── db/                  # Database schema and connection
├── auth/                # Better-auth configuration (global auth setup)
├── payments/            # Payment gateway abstractions
├── types/               # Shared types (common, base entities)
└── utils/               # Shared utilities
```

**Important Rules:**
- **When route groups exist**: Put business logic inside the route group (e.g., `(auth)/models/`, `(auth)/stores/`)
- **When no route groups**: Create separate feature folders (e.g., `notifications/models/`, `notifications/stores/`)
- **Never create**: Separate business logic folders that would conflict with routing (avoid `/auth`, `/dashboard` outside route groups)

Example:
- `app/(auth)/sign-in/page.tsx` imports `SignInContainer` from `app/(auth)/view/container/`
- `app/(auth)/view/container/SignInContainer.tsx` uses auth models and stores from `app/(auth)/`

## Layer Descriptions

### 1. View Layer
Contains UI components divided into two sub-layers:
- **Container**: Upper layer components that wrap and orchestrate presentation components
- **Presentation**: Single, reusable components for specific UI elements

### 2. Use Cases Layer
Handles business logic through custom hooks, designed for flexibility and reusability. Handle store updates and side effects here. **Store files are located within each feature folder** (`app/[feature]/stores/`) for better encapsulation and feature isolation.

### 3. Repositories Layer
Middleware layer that communicates directly with backend services using TanStack Query for state management and caching

### 4. Models Layer
Contains all models, interfaces, types, and dummy data specific to each feature for better encapsulation

### 5. Stores Layer (Feature-Based)
**Location**: `app/[feature]/stores/[featureName]Store.ts`
Each feature has its own store for feature-specific state management. Use Zustand only for cross-feature application state that needs to be shared between multiple features.

## Implementation Guidelines

> **Workflow**: Before implementing any feature, always reference:
> 1. **UX-Structure-Plan.md** - Understand the complete user flow and page structure
> 2. **Implementation-Plan.md** - Use the correct Shadcn/UI components for each UI element
> 3. **copilot-instructions.md** - Follow the Clean Architecture patterns and coding standards

### API Creation
Always use server actions when creating a new API, unless instructed to create it using the default Next.js route.

### 1. View Layer Implementation

#### Container Components
**Location**: `app/src/[feature]/view/container/`

```typescript
// app/src/events/view/container/EventDashboardContainer.tsx
import { useEventsByTenant } from "../../usecases/useEventsByTenant"
import { EventList } from "../presentation/EventList"
import { CreateEventButton } from "../presentation/CreateEventButton"
import { Skeleton } from "@/components/ui/skeleton"
import { useAuth } from "@/lib/auth/hooks"

export function EventDashboardContainer() {
  const { user } = useAuth()
  const { data: events, isLoading, error } = useEventsByTenant(user?.tenantId)
  
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }
  
  if (error) {
    return <div role="alert">Error loading events</div>
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Events</h1>
        <CreateEventButton />
      </div>
      <EventList events={events} />
    </div>
  )
}
```

#### Presentation Components
**Location**: `app/src/[feature]/view/presentation/`

```typescript
// app/src/events/view/presentation/EventCard.tsx
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatIDR } from "@/lib/utils/currency"
import type { Event } from "../../models/interfaces/event"

interface EventCardProps {
  event: Event
  onEdit?: (eventId: string) => void
}

export function EventCard({ event, onEdit }: EventCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{event.name}</h3>
          <Badge variant={event.status === 'published' ? 'default' : 'secondary'}>
            {event.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-muted-foreground">
          {new Date(event.dateTime).toLocaleString('id-ID')}
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm">
            {event.ticketsSold} / {event.totalTickets} tickets sold
          </span>
          <span className="font-semibold">
            {formatIDR(event.totalRevenue)}
          </span>
        </div>
        {onEdit && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onEdit(event.id)}
          >
            Edit Event
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
```

### 2. Use Cases Layer (Custom Hooks)

**Location**: `app/src/[feature]/usecases/`

```typescript
// app/src/events/usecases/useEventsByTenant.ts
import { useQuery } from '@tanstack/react-query'
import { getEventsByTenant } from '../repositories/getEventsByTenant'
import { useEventStore } from '@/stores/eventStore'

export function useEventsByTenant(tenantId: string) {
  const setEvents = useEventStore((state) => state.setEvents)
  
  return useQuery({
    queryKey: ['events', 'tenant', tenantId],
    queryFn: () => getEventsByTenant(tenantId),
    onSuccess: (data) => {
      // Business logic: update global state
      setEvents(data)
    },
    enabled: !!tenantId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// app/src/events/usecases/useCreateEvent.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createEvent } from '../repositories/createEvent'
import { toast } from "@/components/ui/use-toast"
import type { CreateEventInput } from '../models/interfaces/event'

export function useCreateEvent() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: CreateEventInput) => createEvent(data),
    onSuccess: (newEvent) => {
      // Optimistic update
      queryClient.setQueryData(['events', 'tenant', newEvent.tenantId], (old: any) => 
        old ? [...old, newEvent] : [newEvent]
      )
      toast({
        title: "Event created",
        description: "Your event has been successfully created.",
      })
    },
    onError: (error) => {
      toast({
        title: "Creation failed",
        description: error.message,
        variant: "destructive",
      })
    },
  })
}
```

### 3. Repositories Layer

**Location**: `app/src/[feature]/repositories/`

```typescript
// app/src/events/repositories/getEventsByTenant.ts
import { db } from '@/lib/db'
import { eventsTable } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import type { Event } from '../models/interfaces/event'

export async function getEventsByTenant(tenantId: string): Promise<Event[]> {
  try {
    const events = await db.select()
      .from(eventsTable)
      .where(eq(eventsTable.tenantId, tenantId))
      .orderBy(eventsTable.createdAt);
    
    return events;
  } catch (error) {
    throw new Error('Failed to fetch events');
  }
}

// app/src/events/repositories/createEvent.ts
import { db } from '@/lib/db'
import { eventsTable } from '@/lib/db/schema'
import { CreateEventSchema } from '../models/interfaces/event'
import type { CreateEventInput, Event } from '../models/interfaces/event'

export async function createEvent(input: CreateEventInput): Promise<Event> {
  // Validate input with Zod
  const validatedInput = CreateEventSchema.parse(input);
  
  try {
    const [newEvent] = await db.insert(eventsTable)
      .values({
        ...validatedInput,
        id: crypto.randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();
    
    return newEvent;
  } catch (error) {
    throw new Error('Failed to create event');
  }
}
```

### 4. Models Layer (Feature-Specific)

**Location**: `app/src/[feature]/models/`

```typescript
// app/src/events/models/interfaces/event.ts
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

export type CreateEventInput = z.infer<typeof CreateEventSchema>
export type Event = z.infer<typeof EventSchema>

// app/src/events/models/types/event-filters.ts
export type EventStatus = 'draft' | 'published' | 'cancelled'
export type EventFilters = {
  status?: EventStatus
  search?: string
  dateRange?: {
    from: Date
    to: Date
  }
}

// app/src/events/models/dummy/events.ts
import type { Event } from '../interfaces/event'

export const dummyEvents: Event[] = [
  {
    id: "1",
    tenantId: "tenant-1",
    name: "Jakarta Music Festival",
    description: "A night of amazing music",
    dateTime: "2024-12-01T19:00:00Z",
    location: "Jakarta Convention Center",
    status: "published",
    totalTickets: 1000,
    ticketsSold: 250,
    totalRevenue: 25000000,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  // ... more dummy data
]
```

### 5. Database Schema (Drizzle)

```typescript
// lib/db/schema.ts
import { pgTable, uuid, varchar, text, timestamp, integer, decimal, pgEnum } from 'drizzle-orm/pg-core'

export const eventStatusEnum = pgEnum('event_status', ['draft', 'published', 'cancelled'])

export const eventsTable = pgTable('events', {
  id: uuid('id').defaultRandom().primaryKey(),
  tenantId: uuid('tenant_id').notNull(), // Required for multi-tenancy
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  dateTime: timestamp('date_time').notNull(),
  location: varchar('location', { length: 500 }).notNull(),
  posterUrl: text('poster_url'),
  status: eventStatusEnum('status').default('draft'),
  totalTickets: integer('total_tickets').default(0),
  ticketsSold: integer('tickets_sold').default(0),
  totalRevenue: decimal('total_revenue', { precision: 15, scale: 2 }).default('0'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const ticketsTable = pgTable('tickets', {
  id: uuid('id').defaultRandom().primaryKey(),
  eventId: uuid('event_id').references(() => eventsTable.id).notNull(),
  tenantId: uuid('tenant_id').notNull(), // Required for all tables
  customerName: varchar('customer_name', { length: 255 }).notNull(),
  customerEmail: varchar('customer_email', { length: 255 }).notNull(),
  customerWhatsapp: varchar('customer_whatsapp', { length: 20 }),
  ticketType: varchar('ticket_type', { length: 100 }).notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  qrCode: text('qr_code').notNull(),
  isCheckedIn: boolean('is_checked_in').default(false),
  createdAt: timestamp('created_at').defaultNow(),
})
```

### 6. Server Actions

```typescript
// app/src/events/actions/createEventAction.ts
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createEvent } from '../repositories/createEvent'
import { CreateEventSchema } from '../models/interfaces/event'
import { auth } from '@/lib/auth'

export async function createEventAction(formData: FormData) {
  const session = await auth()
  
  if (!session?.user?.tenantId) {
    throw new Error('Unauthorized')
  }

  const rawData = {
    tenantId: session.user.tenantId,
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    dateTime: formData.get('dateTime') as string,
    location: formData.get('location') as string,
    posterUrl: formData.get('posterUrl') as string,
  }

  try {
    const validatedData = CreateEventSchema.parse(rawData)
    const event = await createEvent(validatedData)
    
    revalidatePath('/dashboard/events')
    redirect(`/dashboard/events/${event.id}`)
  } catch (error) {
    throw new Error('Failed to create event')
  }
}
```

## Best Practices

### Architecture
1. **Feature Isolation**: Keep all feature-related code within its folder, including models
2. **Container/Presentation Separation**: Keep containers for orchestration and presentation for pure UI
3. **App Router**: Use server and client components appropriately
4. **Error Boundaries**: Implement error boundaries at container level
5. **React Server Components**: Use by default, client components only when needed
6. **Multi-tenancy**: Always include tenantId in data models and queries

### Gatherly-Specific Patterns
7. **Payment Abstraction**: Always use the PaymentGateway interface
8. **Indonesian Localization**: Use IDR formatting, Indonesian date formats
9. **Mobile-First**: Design for mobile users first
10. **QRIS Integration**: Prioritize QRIS and e-wallet payments
11. **Event Types**: Support various Indonesian event types (religious, campus, music)

### Development Standards
12. **Hook Composition**: Compose smaller hooks to create more complex business logic
13. **Repository Naming**: Use verb-noun pattern (getEvents, createTicket, updateEvent)
14. **Model Organization**: Keep models close to the feature that uses them
15. **Loading States**: Always handle loading states with Skeleton components
16. **Type Safety**: Import types from the feature's models folder
17. **Server Actions**: Use for form submissions and mutations

### Security & Performance
18. **Input Validation**: All external data must be validated with Zod schemas
19. **Tenant Isolation**: Every query must filter by tenantId
20. **Authentication**: Proper authentication checks on all protected routes
21. **Rate Limiting**: Implement on payment and ticket creation endpoints
22. **Image Optimization**: Use next/image for event posters
23. **Bundle Optimization**: Implement proper code splitting

## Adding Components

Install Shadcn components when needed:

```bash
npx shadcn@latest add button card input dialog table skeleton
```

## Import Paths

When importing within a feature:
- Use relative imports: `import { Event } from '../models/interfaces/event'`
- From view to models: `../../models/interfaces/event`
- From usecases to models: `../models/interfaces/event`
- From repositories to models: `../models/interfaces/event`

When importing across features:
- Use absolute imports: `import { PaymentGateway } from '@/lib/payments/types'`

## Notes

- Each feature should be self-contained with its own models
- Container components should handle all data fetching and state management
- Presentation components should be pure and receive all data via props
- Use TanStack Query for all server state management
- Implement optimistic updates for better UX
- Always consider server-side rendering for initial data
- Use Zustand only for cross-feature application state
- All database operations must include tenantId filtering
- Payment integrations must use the abstracted interface
- Design mobile-first for Indonesian users