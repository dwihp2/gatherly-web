# Gatherly UX Structure Plan
*Mobile-First Ticketing SaaS Platform for Indonesian Market*

## Navigation Architecture Principles

### Design Decision: Context-Aware Navigation Strategy

**Rationale**: After extensive UX research and analysis of Indonesian mobile usage patterns, we've chosen a context-aware navigation approach that optimizes for different user needs:

#### Guest Users (Marketing/Landing Pages)
- **Desktop (≥ 1024px)**: Top navigation bar with horizontal menu items
- **Mobile/Tablet (< 1024px)**: Top header with hamburger menu
- **Purpose**: Simple marketing navigation (Features, Pricing, Help, Auth)

#### Authenticated Users (Dashboard/App Interface) 
- **All Devices**: Sidebar navigation for comprehensive app functionality
- **Mobile**: Collapsible sidebar that transforms to off-canvas hamburger menu
- **Purpose**: Feature-rich dashboard navigation (Events, Analytics, Settings, Profile)

### Key Navigation Benefits
- **Context-Appropriate**: Marketing vs. App interface have different navigation needs
- **Professional SaaS Feel**: Sidebar navigation for authenticated users provides clean, organized experience
- **Mobile-Optimized**: Responsive sidebar that adapts to screen constraints
- **Scalable**: Easy to add new features without cluttering navigation
- **User-Friendly**: Familiar patterns for both marketing site and SaaS dashboard

### **Server-First Architecture Integration**
- **Server Components**: All navigation rendering on server for better SEO and performance
- **Server Actions**: Navigation state changes and user actions processed server-side
- **Minimal Client State**: Only interactive elements (modals, dropdowns) use client components
- **Enhanced Performance**: Reduced JavaScript bundle with server-side navigation logic

## 1. Enhanced Navigation Flow

```
Main Application Flow (Server-First Implementation)
|
|— Landing Page (Guest - Server Components)
|   |— Hero Section (Static generation)
|   |— Features Overview (Server-rendered)
|   |— Pricing Information (Server-rendered)
|   |— Call-to-Action Buttons
|       |— Sign Up Button → /register-organization (Organizer flow)
|       |— Sign In Button → /sign-in (Universal auth)
|       |— Browse Events Button → /events (Public discovery)
|
|— Public Event Discovery (New - Server Components)
|   |— Event Listing Page (/events)
|   |   |— Search & Filter Interface (Server Components + Client interactions)
|   |   |— Category-based browsing (music, workshop, conference)
|   |   |— Location filtering (Jakarta, Bandung, Surabaya)
|   |   |— Event grid/list display
|   |
|   |— Event Detail Pages (/events/[slug])
|       |— Server-side rendering for SEO
|       |— Modal-based ticket selection (Client Component)
|       |— Social sharing integration
|       |— Venue information with maps
|
|— Enhanced Authentication Flow (Server Actions)
|   |— Sign In Page (registerUserAction)
|   |— Sign Up Page (registerUserAction - customer role)
|   |— Organization Registration (/register-organization)
|   |   |— Specialized organizer onboarding
|   |   |— registerOrganizationAction
|   |   |— Organization creation flow
|   |
|   |— Role Management
|       |— upgradeToOrganizerAction (customer → organizer)
|       |— Single user table with role-based access
|
|— Organizer Dashboard (Protected - Server Components)
|   |— Dashboard Overview (Server-rendered analytics)
|   |— Events Management
|   |   |— /dashboard/events (Server Components + Server Actions)
|   |   |— createEventAction, updateEventAction, deleteEventAction
|   |   |— Enhanced DataTable with server-side filtering
|   |
|   |— Analytics Dashboard
|   |   |— /dashboard/analytics/* (Server Components)
|   |   |— generateAnalyticsAction
|   |   |— Real-time data aggregation
|   |
|   |— QR Scanner Interface
|   |   |— /dashboard/scanner (Client Component for camera)
|   |   |— scanTicketAction, validateTicketAction
|   |   |— Offline-capable functionality
|
|— Enhanced Ticket Purchase Flow (Modal + Server Actions)
|   |— Modal Ticket Selection (Client Component)
|   |— Authentication Gate (Server Actions)
|   |   |— Google Sign-In integration
|   |   |— Guest checkout (registerGuestAction)
|   |   |— Email/password authentication
|   |
|   |— Split-Screen Purchase Flow
|   |   |— Left: Event details (Server Component)
|   |   |— Right: Ticket summary (Client Component)
|   |   |— createOrderAction, processPaymentAction
|   |
|   |— Payment Instructions (Server Components)
|   |   |— QRIS generation (Server Action)
|   |   |— Payment status tracking
|   |   |— Multiple payment methods
|
|— Promoter Acquisition (/sell-ticket - Server Components)
    |— Business development landing page
    |— Feature showcase for organizers
    |— Referral system foundation
```

## 2. Login Page Structure (Enhanced)

```
Sign In Page Layout (Server Components + Server Actions)
|
|— Header Section (Server Component)
|   |— Gatherly Logo
|   |— Language Selector (ID/EN)
|   |— Navigation breadcrumb
|
|— Main Content Container (Server Component)
|   |— Welcome Message
|   |   |— "Welcome back!"
|   |   |— Context-aware subtitle based on referrer
|   |   |— Role-specific messaging
|   |
|   |— Sign In Form Card (Client Component + Server Action)
|   |   |— Form (React Hook Form + Server Action)
|   |   |— Email Input Field
|   |   |   |— Label: "Email"
|   |   |   |— Placeholder: "contoh@email.com"
|   |   |   |— Server-side validation
|   |   |
|   |   |— Password Input Field
|   |   |   |— Label: "Password"
|   |   |   |— Show/Hide Toggle Button
|   |   |   |— Server-side validation
|   |   |
|   |   |— Remember Me Checkbox
|   |   |— Forgot Password Link
|   |   |— Sign In Button (Server Action submission)
|   |       |— Loading State Indicator
|   |       |— Server-side authentication
|   |
|   |— Social Authentication (Server Actions)
|   |   |— Google Sign-In Button
|   |   |— LinkedIn Sign-In (future)
|   |   |— Server-side OAuth handling
|   |
|   |— Role-Based Navigation
|   |   |— "New to Gatherly?" 
|   |   |— "Sign up as Customer" → /sign-up
|   |   |— "Sign up as Organizer" → /register-organization
|   |
|   |— Social Proof Section (Server Component)
|       |— Success Statistics (server-rendered)
|       |— Testimonial Snippet
|       |— Trust indicators
|
|— Footer Section (Server Component)
    |— Copyright Information
    |— Privacy Policy Link
    |— Terms of Service Link
    |— Indonesian compliance info
```

## 3. Enhanced Dashboard Structure

### 3.1 Public Event Discovery (New Feature)

```
Public Event Discovery Layout (/events - Server Components)
|
|— Navigation Header (Server Component)
|   |— Gatherly Logo
|   |— Public Navigation Menu
|   |   |— Browse Events (active)
|   |   |— Categories Dropdown
|   |   |— For Organizers Link → /sell-ticket
|   |
|   |— Action Buttons
|       |— Sign In Button
|       |— Start Selling Button → /register-organization
|
|— Hero Search Section (Server Component + Client interactions)
|   |— Main Search Bar
|   |   |— Location-based search (Jakarta, Bandung, etc.)
|   |   |— Date range picker
|   |   |— Category filter
|   |   |— Server-side search processing
|   |
|   |— Quick Filters
|   |   |— This Weekend
|   |   |— Free Events
|   |   |— Popular Categories
|   |
|   |— Search Results Count
|       |— Server-rendered results summary
|
|— Event Grid/List Display (Server Components)
|   |— Event Cards Grid
|   |   |— Event Card (Server Component)
|   |   |   |— Event Poster (Next.js Image optimization)
|   |   |   |— Event Title and Date
|   |   |   |— Location and Organizer
|   |   |   |— Ticket Price Range (IDR)
|   |   |   |— Quick Buy Button → Modal
|   |   |
|   |   |— Load More / Pagination (Server-side)
|   |   |— Infinite scroll capability
|   |
|   |— Filter Sidebar (Client Component)
|   |   |— Category Filters
|   |   |— Price Range Slider
|   |   |— Date Range Picker
|   |   |— Location Filters
|   |   |— Rating/Reviews Filter
|   |
|   |— Empty State (Server Component)
|       |— No events found illustration
|       |— Suggestion to modify search
|       |— Featured events fallback
|
|— Category Sections (Server Components)
|   |— Music Events Section
|   |— Workshop & Learning Section  
|   |— Community Events Section
|   |— Business & Networking Section
|
|— Footer (Server Component)
    |— Event organizer resources
    |— Support links
    |— Social media links
```

### 3.2 Enhanced Event Detail Page

```
Event Detail Page Layout (/events/[slug] - Server Components + SSG)
|
|— Event Header Section (Server Component)
|   |— Breadcrumb Navigation
|   |— Event Category Badge
|   |— Share Buttons (WhatsApp, Facebook, Twitter)
|
|— Event Hero Section (Server Component)
|   |— Event Poster (Next.js Image with optimization)
|   |— Event Title and Subtitle
|   |— Date, Time, and Duration
|   |— Location with Map Preview
|   |— Organizer Information
|   |   |— Organizer Name and Avatar
|   |   |— Organizer Rating/Reviews
|   |   |— Contact Information
|
|— Ticket Selection Section (Client Component Modal)
|   |— Ticket Types Display
|   |   |— Ticket Type Cards
|   |   |— Price in IDR
|   |   |— Availability Status
|   |   |— Quantity Selector
|   |
|   |— Buy Tickets Button (Modal Trigger)
|   |— Enhanced Modal Purchase Flow
|       |— Modal Overlay (Client Component)
|       |— Ticket Selection (Client state)
|       |— Authentication Gate (Server Action)
|       |— Split-Screen Design
|           |— Left: Event Details + Customer Form
|           |— Right: Ticket Summary + Pricing
|       |— Payment Method Selection
|       |— Payment Processing (Server Actions)
|
|— Event Details Section (Server Component)
|   |— Event Description (Rich text)
|   |— Event Schedule/Agenda
|   |— Speaker/Performer Information
|   |— Event Requirements
|   |— Cancellation Policy
|
|— Venue Information (Server Component)
|   |— Venue Details
|   |— Interactive Map (Google Maps integration)
|   |— Public Transportation Info
|   |— Parking Information
|   |— Accessibility Features
|
|— Social Proof Section (Server Component)
|   |— Attendee Count
|   |— Reviews and Ratings
|   |— Social Media Mentions
|   |— Previous Event Success
|
|— Related Events (Server Component)
|   |— Similar Events Carousel
|   |— Same Organizer Events
|   |— Same Category Events
|   |— Location-based Recommendations
|
|— Event Actions (Client Component)
    |— Add to Calendar Button
    |— Set Reminder Button
    |— Contact Organizer Button
    |— Report Event Button
```

### 3.3 Authenticated Organizer Dashboard (Enhanced)

```
Organizer Dashboard Layout (Server Components + Server Actions)
|
|— Enhanced Sidebar Navigation (Server Component)
|   |— Organization Context
|   |   |— Organization Avatar and Name
|   |   |— Role Display (Admin, Member, etc.)
|   |   |— Organization Switcher (if multiple)
|   |
|   |— Primary Navigation (Server-rendered)
|   |   |— Dashboard Overview
|   |   |— Events Management (/dashboard/events)
|   |   |   |— All Events
|   |   |   |— Published Events
|   |   |   |— Draft Events  
|   |   |   |— Archived Events
|   |   |
|   |   |— Create Event (Primary CTA)
|   |   |— Analytics (/dashboard/analytics)
|   |   |   |— Revenue Analytics
|   |   |   |— Ticket Analytics
|   |   |   |— Attendee Analytics
|   |   |
|   |   |— QR Scanner (/dashboard/scanner)
|   |
|   |— Secondary Navigation
|   |   |— Settings (/dashboard/settings)
|   |   |   |— Profile Settings
|   |   |   |— Organization Settings
|   |   |   |— Billing Settings
|   |   |   |— Integration Settings
|   |   |
|   |   |— Help & Support
|   |
|   |— User Profile Section
|       |— User Avatar and Info
|       |— Quick Settings Access
|       |— Sign Out Action (Server Action)
|
|— Main Dashboard Content (Server Components)
|   |— Dashboard Header (Server Component)
|   |   |— Welcome Message (Personalized)
|   |   |— Quick Stats Overview
|   |   |— Time-based Greetings
|   |
|   |— Action Bar (Server Component + Client interactions)
|   |   |— Create Event Button (Primary)
|   |   |— QR Scanner Quick Access
|   |   |— Export Data Options
|   |   |— Refresh Data Button
|
|   |— Enhanced Summary Cards (Server Components)
|   |   |— Total Revenue Card
|   |   |   |— IDR Amount (server-calculated)
|   |   |   |— Growth Percentage
|   |   |   |— Trend Visualization
|   |   |
|   |   |— Tickets Sold Card
|   |   |   |— Total Count (server-calculated)
|   |   |   |— Growth Indicator
|   |   |   |— Active vs. Used Tickets
|   |   |
|   |   |— Active Events Card
|   |   |   |— Event Count by Status
|   |   |   |— Quick Event Actions
|   |   |   |— Performance Metrics
|   |   |
|   |   |— Upcoming Events Card
|   |       |— Next Event Countdown
|   |       |— Preparation Checklist
|   |       |— Quick Check-in Access
|
|   |— Advanced Events DataTable (Server Components + Client interactions)
|       |— DataTable Toolbar (Client Component)
|       |   |— Global Search (server-side processing)
|       |   |— Advanced Filters
|       |   |   |— Status Multi-select
|       |   |   |— Date Range Filter
|       |   |   |— Revenue Range Filter
|       |   |   |— Location Filter
|       |   |
|       |   |— Column Visibility Controls
|       |   |— Bulk Action Controls
|       |   |— Export Options
|       |
|       |— Enhanced DataTable (Server Component)
|       |   |— Server-side Sorting
|       |   |— Server-side Pagination
|       |   |— Real-time Data Updates
|       |   |— Row Actions (Server Actions)
|       |       |— Edit Event (updateEventAction)
|       |       |— Delete Event (deleteEventAction)
|       |       |— Duplicate Event
|       |       |— View Analytics
|       |       |— Open QR Scanner
|       |
|       |— Performance Optimizations
|           |— Virtual scrolling for large datasets
|           |— Optimistic updates
|           |— Skeleton loading states
```

## 4. Enhanced Modal Structures

### 4.1 Create Event Modal (Server Actions)

```
Create New Event Modal (Client Component + Server Actions)
|
|— Modal Container (Client Component)
|   |— Progress Indicator (Client state)
|   |— Step Navigation (Client state)
|   |— Form State Management (Client + Server validation)
|
|— Step 1: Event Details (Server Action: createEventAction)
|   |— Form Fields (Client Component)
|   |— Server-side Validation
|   |— Auto-save Draft Capability
|   |— Image Upload (Server processing)
|
|— Step 2: Ticket Configuration (Server Action: updateEventAction)
|   |— Dynamic Ticket Types
|   |— Price Validation (Server-side)
|   |— Inventory Management
|   |— Revenue Projections (Server-calculated)
|
|— Step 3: Publication Settings (Server Action: publishEventAction)
|   |— SEO-friendly Slug Generation (Server-side)
|   |— Publication Status Management
|   |— Preview Generation (Server-side)
|   |— Terms Acceptance
|
|— Success State (Server Component)
    |— Event URL Generation (Server-side)
    |— Social Sharing Integration
    |— Analytics Tracking Setup
    |— Onboarding Next Steps
```

### 4.2 Enhanced Purchase Modal

```
Ticket Purchase Modal (Client Component + Server Actions)
|
|— Modal Overlay (Client Component)
|
|— Ticket Selection Stage (Client Component)
|   |— Event Context Display
|   |— Ticket Type Selection
|   |— Quantity Controls
|   |— Real-time Pricing (Client calculation)
|   |— Availability Checking (Server validation)
|
|— Authentication Gate (Server Actions)
|   |— Sign In Form (Server Action)
|   |— Guest Checkout Option (registerGuestAction)
|   |— Social Sign-In (Google OAuth - Server Action)
|   |— Email Verification Flow
|
|— Split-Screen Purchase Interface
|   |— Left Panel: Event Details (Server Component)
|   |   |— Event Summary
|   |   |— Customer Information Form
|   |   |— Additional Attendee Details
|   |   |— Terms and Conditions
|   |
|   |— Right Panel: Order Summary (Client Component)
|   |   |— Ticket Breakdown
|   |   |— Pricing Calculation
|   |   |— Fees and Taxes
|   |   |— Total Amount (IDR)
|   |   |— Edit Cart Options
|
|— Payment Method Selection (Server Component)
|   |— QRIS Payment (Primary)
|   |— E-wallet Options (GoPay, OVO, DANA)
|   |— Bank Transfer/Virtual Account
|   |— Credit/Debit Cards
|   |— Payment Method Validation (Server-side)
|
|— Payment Processing (Server Actions)
|   |— Payment Gateway Integration (processPaymentAction)
|   |— Order Status Tracking
|   |— Inventory Reservation
|   |— Transaction Logging
|
|— Confirmation & E-ticket (Server Components)
    |— Order Confirmation Page
    |— E-ticket Generation (Server-side)
    |— QR Code Creation
    |— Email Delivery (Server Action)
    |— WhatsApp Integration (Indonesian preference)
```

## 5. Server-First Performance Optimizations

### 5.1 Server Component Benefits
- **SEO Optimization**: All public content server-rendered for search engines
- **Performance**: Reduced JavaScript bundle size (>50% reduction target)
- **Security**: Sensitive operations (payments, user data) processed server-side
- **Caching**: Built-in Next.js caching for Server Components

### 5.2 Data Fetching Strategy
- **Server Components**: Primary data fetching method
- **Server Actions**: All mutations (create, update, delete)
- **Client State**: Minimal, only for immediate UI interactions
- **Optimistic Updates**: Enhanced UX with server validation

### 5.3 Indonesian Market Optimizations
- **Mobile-First**: 90%+ mobile usage in Indonesian market
- **Network Optimization**: Optimized for 3G/4G networks
- **Payment Integration**: QRIS priority, e-wallet support
- **Language Support**: Bahasa Indonesia localization ready
- **Cultural Adaptation**: Local event types and preferences

## 6. Accessibility & Compliance

### 6.1 Enhanced Accessibility Features
- **WCAG 2.1 AA Compliance**: All components
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Optimization**: Proper ARIA labels and semantic HTML
- **Touch Targets**: 44px minimum for mobile interactions
- **Color Contrast**: 4.5:1 minimum ratio

### 6.2 Indonesian Compliance
- **Data Localization**: Indonesian data protection compliance
- **Payment Regulations**: Bank Indonesia payment standards
- **Tax Compliance**: Indonesian tax calculation and reporting
- **Language Accessibility**: Indonesian screen reader support

This enhanced UX structure plan incorporates the server-first architecture while maintaining the context-aware navigation strategy, ensuring optimal performance and user experience for the Indonesian ticketing market.
|   |   |— Email Share
|   |
|   |— Action Buttons
|       |— View Event Button
|       |— Create Another Event Button
|       |— Back to Dashboard Button
```

### Additional Modal Structures

```
Edit Event Modal
|— Similar structure to Create Event Modal
|— Pre-populated form fields
|— Additional options:
    |— Delete Event Button
    |— Duplicate Event Button
    |— View Public Page Button

Delete Confirmation Modal
|
|— Modal Overlay
|— Modal Container
    |— Warning Icon
    |— Title: "Delete Event?"
    |— Description: "Event and all ticket data will be permanently deleted"
    |— Event Name Display
    |— Confirmation Checkbox
    |— Action Buttons
        |— Cancel Button
        |— Delete Event Button (Destructive)

QR Scanner Modal
|
|— Full Screen Modal
|— Camera View Container
|   |— Camera Stream
|   |— Scanning Overlay
|   |— QR Code Targeting Box
|   |— Flash Toggle Button
|   |— Switch Camera Button
|
|— Scan Result Display
|   |— Success State (Green)
|   |   |— Check Icon
|   |   |— "Check-in Berhasil!"
|   |   |— Attendee Name
|   |   |— Ticket Type
|   |   |— Timestamp
|   |
|   |— Already Checked State (Yellow)
|   |   |— Warning Icon
|   |   |— "Sudah Check-in"
|   |   |— Attendee Name
|   |   |— Previous Check-in Time
|   |
|   |— Invalid Ticket State (Red)
|       |— Error Icon
|       |— "Tiket Tidak Valid"
|       |— Error Reason
|
|— Control Buttons
    |— Close Scanner Button
    |— Manual Entry Button
    |— Event Statistics Button
```

## 5. Responsive Navigation Specifications

### 5.1 Navigation Breakpoints & Behavior

```
Responsive Navigation System
|
|— Desktop View (≥ 1024px)
|   |— Top Navigation Bar (Full)
|   |   |— Logo (Left)
|   |   |— Horizontal Menu Items
|   |   |   |— Dashboard
|   |   |   |— Events
|   |   |   |— Create Event (Primary Button)
|   |   |   |— QR Scanner
|   |   |
|   |   |— Right Section
|   |   |   |— Search Bar
|   |   |   |— Notifications
|   |   |   |— User Profile Dropdown
|   |
|   |— Breadcrumb Navigation (Below header)
|   |— Enhanced Features
|   |   |— Hover effects
|   |   |— Keyboard shortcuts
|   |   |— Right-click context menus
|
|— Tablet & Mobile (< 1024px)
|   |— Top Header (Compact)
|   |   |— Logo (Left)
|   |   |— Hamburger Menu Icon (☰)
|   |   |— Notifications Bell
|   |   |— User Avatar (Right)
|   |
|   |— Hamburger Menu Panel (Slide-out)
|   |   |— Navigation Links
|   |   |   |— Dashboard
|   |   |   |— My Events
|   |   |   |— Create New Event
|   |   |   |— QR Scanner
|   |   |   |— Settings
|   |   |   |— Help Center
|   |   |
|   |   |— User Section
|   |   |   |— Profile Settings
|   |   |   |— Billing
|   |   |   |— Organization Switcher
|   |   |   |— Sign Out
|   |
|   |— Context Actions (Page-specific)
|       |— Search Bar (Expandable)
|       |— Filter Options
|       |— Quick Create Button (Floating)
```

### 5.2 Hamburger Menu Design Specifications

```
Hamburger Menu Panel
|
|— Panel Behavior
|   |— Slide Animation: From left, 300ms ease-out
|   |— Overlay: Semi-transparent background (rgba(0,0,0,0.5))
|   |— Width: 280px (mobile), 320px (tablet)
|   |— Height: Full viewport height
|   |— Close: Tap outside, swipe left, or close button
|
|— Menu Structure
|   |— Header Section
|   |   |— User Avatar (Large)
|   |   |— User Name
|   |   |— Organization Name
|   |   |— Close Button (X)
|   |
|   |— Primary Navigation
|   |   |— Dashboard
|   |   |   |— Icon: Home
|   |   |   |— Active state indicator
|   |   |
|   |   |— My Events
|   |   |   |— Icon: Calendar
|   |   |   |— Event count badge
|   |   |
|   |   |— Create Event
|   |   |   |— Icon: Plus
|   |   |   |— Primary button styling
|   |   |
|   |   |— QR Scanner
|   |       |— Icon: QR Code
|   |       |— Context-aware visibility
|   |
|   |— Secondary Navigation
|   |   |— Settings
|   |   |— Help Center
|   |   |— Billing
|   |   |— Organization Switcher
|   |
|   |— Footer Section
|       |— App Version
|       |— Sign Out Button
|
|— Accessibility Features
|   |— ARIA labels for screen readers
|   |— Keyboard navigation support
|   |— Focus trap within menu
|   |— Escape key to close
|   |— High contrast mode support
```

### 5.3 Mobile-Specific Enhancements

```
Mobile UX Optimizations
|
|— Touch-Friendly Design
|   |— Minimum 44px touch targets
|   |— Adequate spacing between elements
|   |— Thumb-friendly button placement
|   |— Swipe gestures support
|
|— Performance Optimizations
|   |— Fast menu animations (< 300ms)
|   |— Minimal DOM manipulation
|   |— Efficient scroll handling
|   |— Lazy loading for menu content
|
|— Context Awareness
|   |— Current page highlighting
|   |— Breadcrumb in menu header
|   |— Quick actions based on current context
|   |— Smart menu item ordering by usage
|
|— Progressive Enhancement
|   |— Works without JavaScript (basic functionality)
|   |— Enhanced with JavaScript features
|   |— Graceful degradation for older browsers
|   |— Offline menu caching
```

## 6. Navigation Accessibility Standards

### 6.1 WCAG 2.1 AA Compliance

- **Keyboard Navigation**: Full keyboard support, logical tab order
- **Screen Readers**: Proper ARIA labels, semantic HTML structure  
- **Color Contrast**: 4.5:1 minimum contrast ratio for all text
- **Touch Targets**: 44px minimum size for all interactive elements
- **Focus Indicators**: Clear visual focus states for all controls

### 6.2 Indonesian Localization

- **Language Support**: Bahasa Indonesia primary, English secondary
- **Cultural Adaptation**: Right-to-left reading patterns consideration
- **Local Conventions**: Indonesian mobile app navigation patterns
- **Accessibility**: Support for Indonesian screen readers and assistive technologies

````
```
