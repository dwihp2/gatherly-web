# Product Requirements Document: Gatherly MVP
**Author**: GitHub Copilot (as Product Manager)  
**Status**: Draft  
**Last Updated**: December 19, 2024

## 1. Overview
This document outlines the requirements for the Minimum Viable Product (MVP) of Gatherly, a self-service, mobile-first ticketing SaaS platform designed for the Indonesian market. The MVP will focus on providing comprehensive functionality for Event Organizers (EOs) to create, manage, and sell tickets, and for attendees to discover, purchase, and manage their tickets seamlessly.

**Language Policy**: The application will be built in English as the primary language for the MVP. While designed for the Indonesian market, English will be used for all interface text, documentation, and communications to ensure broader accessibility and easier international expansion. Indonesian localization will be considered for post-MVP development.

## 2. Problem Statement
Small to medium event organizers in Indonesia (e.g., workshop hosts, campus committees, local music communities) lack access to a simple, affordable, and trustworthy ticketing solution. Additionally, potential attendees struggle to discover events and face cumbersome purchasing experiences. Existing platforms are either overly complex, carry high fees, or lack integration with locally preferred payment methods.

## 3. Goals & Objectives
**Business Goal**: Validate product-market fit by acquiring 50 active Event Organizers and processing 1,000 paid tickets within 3 months of launch.

**Product Goals**:
- **Organizer Experience**: Fastest event creation (sign-up to live event in under 10 minutes)
- **Customer Experience**: Seamless event discovery and mobile-first ticket purchasing
- **Business Development**: Self-service organizer acquisition through promotional channels

**User Goals**:
- **Organizer**: "I want to create an event page, set ticket prices, and start selling online without technical help."
- **Attendee**: "I want to discover events, buy tickets quickly on my phone using QRIS/e-wallets, and get instant confirmation."
- **Promoter**: "I want to learn about Gatherly's features and refer organizers to earn commissions."

## 4. User Personas

### Primary Persona: "Rina", the Campus Event Organizer
- **Who**: University student leading a campus music festival committee
- **Needs**: Low-cost platform, extreme ease of use, simple sales tracking, reliable check-in system
- **Pain Points**: Limited budget, no technical team, needs transparent reporting

### Secondary Persona: "Budi", the Ticket Buyer  
- **Who**: Young professional attending local workshops and events
- **Needs**: Mobile-friendly discovery and purchase, QRIS/e-wallet payments, instant confirmation
- **Pain Points**: Complex checkout forms, limited payment options, concerns about ticket authenticity

### Tertiary Persona: "Sari", the Community Promoter
- **Who**: Influencer or community leader who connects with event organizers
- **Needs**: Easy way to refer organizers, commission tracking, promotional materials
- **Pain Points**: No incentive to recommend platforms, difficult referral processes

## 5. Technical Architecture & Server-First Implementation

### 5.1 Server-First Architecture Principles

**Important**: Gatherly follows a **Server-First approach** using Next.js 15 App Router with React Server Components and Server Actions as the primary data handling mechanism.

#### Core Implementation Strategy:
- **Server Actions**: Primary method for all mutations (Create, Update, Delete operations)
- **Server Components**: Default for data fetching and rendering
- **API Routes**: Only when external systems require REST endpoints (webhooks, third-party integrations)
- **Client Components**: Minimal usage, only for interactivity that requires client-side state

#### Benefits of Server-First Approach:
- **Better SEO**: Server-side rendering for all public content
- **Enhanced Security**: Sensitive operations performed on server
- **Improved Performance**: Reduced client-side JavaScript bundle
- **Type Safety**: End-to-end TypeScript without API serialization
- **Simplified Architecture**: Direct database access without API layer

### 5.2 Server Actions Organization

#### Protected Organizer Actions: `/app/(dashboard)/[feature]/actions/`
```typescript
// Organization & event management
createEventAction()           # Event creation with validation
updateEventAction()           # Event updates and publishing
deleteEventAction()           # Event deletion with cascade
generateAnalyticsAction()     # Analytics data generation
scanTicketAction()           # QR code scanning and validation
updateOrgSettingsAction()    # Organization settings management
```

#### Public Customer Actions: `/app/[feature]/actions/`
```typescript
// Customer-facing operations  
createOrderAction()          # Ticket purchase initiation
processPaymentAction()       # Payment processing
trackOrderAction()           # Order status tracking
updateProfileAction()        # Customer profile management
registerGuestAction()        # Guest checkout registration
```

### 5.3 Limited API Routes (External Integration Only)

#### Webhook Endpoints: `/api/webhooks/`
```
/api/webhooks/payment        # Payment gateway callbacks (Midtrans/Xendit)
/api/webhooks/email          # Email delivery status updates
/api/webhooks/analytics      # Third-party analytics integrations
```

#### Third-Party Integration: `/api/integrations/`
```
/api/integrations/maps       # Google Maps API proxy
/api/integrations/social     # Social media sharing APIs
/api/integrations/export     # Data export for external tools
```

### 5.4 User Management Architecture

**Single User Table with Role-Based Access**:
```typescript
interface User {
  id: string
  email: string
  name: string
  role: 'customer' | 'organizer' | 'admin'
  organizationId?: string    // For organizers only
  whatsapp?: string         // For customers primarily  
  createdAt: Date
  updatedAt: Date
}
```

**Registration Server Actions**:
- `registerUserAction()` - General user registration (defaults to 'customer' role)
- `registerOrganizationAction()` - Specialized organizer onboarding with organization creation
- `upgradeToOrganizerAction()` - Role upgrade for existing customers

## 6. MVP Scope: Enhanced Features & User Stories

### Epic 1: Organizer Account & Event Management

| User Story | Acceptance Criteria | Priority | Implementation |
|------------|-------------------|----------|----------------|
| As an EO, I can register as an organization with specialized onboarding | - Dedicated `/register-organization` flow<br>- Organization creation with admin assignment<br>- Welcome email with getting started guide | High | `registerOrganizationAction()` |
| As an EO, I can create events with comprehensive details | - Multi-step form: Basic Info → Tickets → Publication<br>- Support for multiple ticket types<br>- Auto-generated SEO-friendly slugs | High | `createEventAction()` |
| As an EO, I can manage my events from a comprehensive dashboard | - Event listing with filtering and search<br>- Real-time statistics (sales, revenue, attendance)<br>- Bulk operations (publish, archive, delete) | High | Server Components + `updateEventAction()` |
| As an EO, I can view detailed analytics for my events | - Revenue trends and ticket sales performance<br>- Attendee demographics and engagement metrics<br>- Exportable reports (CSV, PDF) | Medium | `generateAnalyticsAction()` |

### Epic 2: Public Event Discovery & Customer Experience

| User Story | Acceptance Criteria | Priority | Implementation |
|------------|-------------------|----------|----------------|
| As an Attendee, I can discover events through a public event listing | - Searchable event directory with filters<br>- Category-based browsing (music, workshop, conference)<br>- Location-based filtering (Jakarta, Bandung, etc.) | High | Server Components with search params |
| As an Attendee, I can view detailed event information | - Comprehensive event details with media<br>- Venue information with map integration<br>- Organizer information and social sharing | High | Server Components + static generation |
| As an Attendee, I can purchase tickets through an enhanced flow | - Modal-based ticket selection<br>- Authentication gate (Google/Email/Guest)<br>- Split-screen design (event info + ticket summary) | High | `createOrderAction()` |
| As an Attendee, I can pay using Indonesian payment methods | - QRIS (priority), GoPay, OVO, DANA support<br>- Clear payment instructions and status tracking<br>- Multiple payment method selection | High | `processPaymentAction()` |

### Epic 3: Enhanced Ticket Purchase Flow

| User Story | Acceptance Criteria | Priority | New Feature |
|------------|-------------------|----------|-------------|
| As an Attendee, I can select tickets in a modal without leaving the event page | - Modal overlay with event context<br>- Real-time availability checking<br>- Quantity selection and pricing breakdown | High | ✅ Client Component + Server Action |
| As an Attendee, I can authenticate or checkout as guest | - Google Sign-In integration<br>- Email/password option<br>- Guest checkout with minimal info | High | ✅ `registerGuestAction()` |
| As an Attendee, I receive enhanced confirmation and instructions | - Dedicated payment instruction pages<br>- QR code generation for mobile payments<br>- Clear navigation back to event page | High | ✅ Server Components |

### Epic 4: Event Day Operations & Check-in

| User Story | Acceptance Criteria | Priority | Implementation |
|------------|-------------------|----------|----------------|
| As Event Staff, I can scan QR codes using web-based scanner | - Camera-based QR scanning (no app required)<br>- Offline-capable check-in functionality<br>- Manual ticket entry backup | High | `scanTicketAction()` |
| As Event Staff, I get comprehensive scan feedback | - Success (green): Check-in confirmation<br>- Warning (yellow): Already checked in<br>- Error (red): Invalid ticket with reason | High | `validateTicketAction()` |

### Epic 5: Promoter Acquisition & Business Development

| User Story | Acceptance Criteria | Priority | New Feature |
|------------|-------------------|----------|-------------|
| As a potential organizer, I can learn about Gatherly through promotional content | - Dedicated `/sell-ticket` landing page<br>- Feature showcase and pricing transparency<br>- Success stories and testimonials | Medium | ✅ Server Components |
| As a promoter, I can refer organizers and track performance | - Unique referral links and codes<br>- Commission tracking dashboard<br>- Promotional material downloads | Low | ✅ Future |

## 7. Enhanced User Flows

### 7.1 Organizer Journey
```
Landing Page → "Start Selling Tickets" → Organization Registration (Server Action) → 
Onboarding Wizard → Event Creation (Server Action) → Dashboard Management → 
Analytics & Growth (Server Components)
```

### 7.2 Customer Discovery & Purchase Journey
```
Event Discovery (/events - Server Components) → Event Detail (/events/[slug] - SSG) → 
Modal Ticket Selection (Client Component) → Authentication Gate (Server Action) → 
Enhanced Form → Payment Method Selection → Payment Instructions (Server Components) → 
Confirmation → E-Ticket
```

### 7.3 Enhanced Payment Flow
```
Ticket Selection → Auth/Guest (Server Action) → Split Screen Design:
├─ Left: Event Details (Server Component) + Customer Form
└─ Right: Fixed Ticket Summary + Pricing (Client Component)

→ Payment Method Selection → Payment Instructions Page (Server Component) → 
QR Code Generation (Server Action) → Completion → Return to Event
```

## 8. Server-First Technical Implementation Notes

### 8.1 Performance Benefits
- **Zero API Roundtrips**: Direct database access from Server Components
- **Reduced JavaScript Bundle**: Minimal client-side code
- **Better Caching**: Built-in Next.js caching for Server Components
- **SEO Optimization**: Full server-side rendering for public content

### 8.2 Security Advantages
- **Server-Side Validation**: All data validation on server before database operations
- **No Client-Side Secrets**: Payment processing and sensitive operations server-only
- **Session Management**: Server-side session validation for all protected actions
- **Rate Limiting**: Built-in protection at the server action level

### 8.3 Development Experience
- **Type Safety**: End-to-end TypeScript without API serialization layers
- **Simplified State Management**: Reduced need for client-side state management
- **Error Handling**: Unified error handling in Server Actions
- **Revalidation**: Built-in data revalidation with `revalidatePath()` and `revalidateTag()`

## 9. Technical Requirements

### 10.1 Server-First Performance Standards
- **Server Response Time**: <200ms for Server Actions
- **Page Generation**: <1s for static generation
- **Database Queries**: <50ms average response time
- **Client JavaScript**: <100KB initial bundle size

### 10.2 Indonesian Market Compliance
- **Payment Methods**: QRIS integration as priority (Server Actions)
- **Data Localization**: Server-side data processing for compliance
- **Language Support**: English primary, Indonesian localization ready
- **Currency**: IDR formatting and calculations (server-side)

## 11. Implementation Priority

### Phase 1: Server Foundation (Week 1)
1. **Server Actions Setup**: Authentication, event management, order processing
2. **Database Schema**: Multi-tenant schema with proper indexing
3. **Server Components**: Public event discovery and detail pages

### Phase 2: Enhanced UX (Week 2-3)
1. **Client Interactivity**: Modal components, form interactions
2. **Payment Integration**: Server Actions for payment processing
3. **Real-time Features**: Optimistic updates with Server Actions

### Phase 3: Business Features (Week 4)
1. **Analytics Dashboard**: Server Components with data aggregation
2. **QR Scanner**: Client Component with Server Action validation
3. **Promoter Pages**: Static generation for marketing content

---

**Next Steps**: Implementation should begin with Server Actions for core business logic, followed by Server Components for data display, with minimal Client Components only where interactivity is essential.