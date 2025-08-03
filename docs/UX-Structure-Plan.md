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

## 1. Navigation Flow

```
Main Application Flow
|
|— Landing Page (Guest)
|   |— Hero Section
|   |— Features Overview
|   |— Pricing Information
|   |— Call-to-Action Buttons
|       |— Sign Up Button
|       |— Sign In Button
|       |— Browse Events Button
|
|— Authentication Flow
|   |— Sign In Page
|   |— Sign Up Page
|   |— Em|— Scan Result Display
|   |— Success State (Green)
|   |   |— Check Icon
|   |   |— "Check-in Successful!"
|   |   |— Attendee Name
|   |   |— Ticket Type
|   |   |— Timestamp
|   |
|   |— Already Checked State (Yellow)
|   |   |— Warning Icon
|   |   |— "Already Checked In"
|   |   |— Attendee Name
|   |   |— Previous Check-in Time
|   |
|   |— Invalid Ticket State (Red)
|   |   |— Error Icon
|   |   |— "Invalid Ticket"
|   |   |— Error Reasonage
|   |— Password Reset Page
|
|— Organizer Dashboard (Authenticated)
|   |— Dashboard Overview
|   |— My Events Section
|       |— Create New Event
|       |— View Event Details
|       |— Edit Event
|       |— Event Analytics
|       |— Attendee Management
|       |— QR Code Scanner
|   |— Account Settings
|   |— Billing & Payments
|
|— Public Event Pages
|   |— Event Detail Page
|   |— Ticket Selection
|   |— Checkout Flow
|   |— Payment Gateway
|   |— Confirmation Page
|   |— E-Ticket Download
|
|— Mobile Scanner (Event Staff)
    |— QR Code Scanner Interface
    |— Check-in Confirmation
    |— Scan Results Display
```

## 2. Login Page Structure

```
Sign In Page Layout
|
|— Header Section
|   |— Gatherly Logo
|   |— Language Selector (ID/EN)
|
|— Main Content Container
|   |— Welcome Message
|   |   |— "Welcome back!"
|   |   |— Subtitle: "Sign in to your Event Organizer account"
|   |
|   |— Sign In Form Card
|   |   |— Email Input Field
|   |   |   |— Label: "Email"
|   |   |   |— Placeholder: "contoh@email.com"
|   |   |   |— Validation Message Area
|   |   |
|   |   |— Password Input Field
|   |   |   |— Label: "Password"
|   |   |   |— Show/Hide Toggle Button
|   |   |   |— Validation Message Area
|   |   |
|   |   |— Remember Me Checkbox
|   |   |— Forgot Password Link
|   |   |— Sign In Button
|   |       |— Loading State Indicator
|   |
|   |— Divider Section
|   |   |— "or" Text
|   |
|   |— Alternative Actions
|   |   |— "Don't have an account?" Text
|   |   |— Sign Up Link
|   |
|   |— Social Proof Section
|       |— Success Statistics
|       |— Testimonial Snippet
|
|— Footer Section
    |— Copyright Information
    |— Privacy Policy Link
    |— Terms of Service Link
```

## 3. Dashboard Page Structure

### 3.1 Guest Dashboard (Landing Page)

```
Guest Dashboard Layout
|
|— Navigation Header
|   |— Gatherly Logo
|   |— Main Navigation Menu
|   |   |— Features Link
|   |   |— Pricing Link
|   |   |— Help Link
|   |
|   |— Action Buttons
|       |— Sign In Button
|       |— Sign Up Free Button
|
|— Hero Section
|   |— Main Headline
|   |   |— "Create Events & Sell Tickets in 10 Minutes"
|   |
|   |— Subheadline
|   |   |— "Trusted ticketing platform for Indonesian Event Organizers"
|   |
|   |— CTA Buttons
|   |   |— Start Free Button (Primary)
|   |   |— View Demo Button (Secondary)
|   |
|   |— Hero Image/Video
|       |— Event Creation Demo
|
|— Features Overview Section
|   |— Section Title: "Why Choose Gatherly?"
|   |
|   |— Feature Cards Grid
|   |   |— Easy Setup Card
|   |   |   |— Icon: Lightning Bolt
|   |   |   |— Title: "Quick Setup"
|   |   |   |— Description: "Create events in 10 minutes"
|   |   |
|   |   |— Indonesian Payments Card
|   |   |   |— Icon: QRIS/Wallet
|   |   |   |— Title: "Local Payments"
|   |   |   |— Description: "QRIS, GoPay, OVO, DANA"
|   |   |
|   |   |— Mobile First Card
|   |   |   |— Icon: Mobile Phone
|   |   |   |— Title: "Mobile Friendly"
|   |   |   |— Description: "Optimized for mobile"
|   |   |
|   |   |— QR Scanner Card
|   |       |— Icon: QR Code
|   |       |— Title: "Easy Check-in"
|   |       |— Description: "Scan QR without app"
|
|— Social Proof Section
|   |— Statistics Cards
|   |   |— Events Created Counter
|   |   |— Tickets Sold Counter
|   |   |— Happy Organizers Counter
|   |
|   |— Testimonials Carousel
|       |— Organizer Testimonials
|       |— Profile Photos
|       |— Event Types
|
|— Pricing Section
|   |— Section Title: "Transparent Pricing"
|   |— Commission Information
|   |   |— "Only 5% per ticket sold"
|   |   |— "No monthly fees"
|   |
|   |— Feature List
|       |— Unlimited Events
|       |— QRIS Payment
|       |— QR Check-in
|       |— Email Support
|
|— CTA Section
|   |— Final Call-to-Action
|   |— "Start Selling Tickets Today" Button
|
|— Footer
    |— Company Information
    |— Support Links
    |— Social Media Links
```

### 3.2 Authenticated Organizer Dashboard

```
Organizer Dashboard Layout (Sidebar Navigation)
|
|— Left Sidebar (All Screen Sizes)
|   |— Sidebar Header
|   |   |— Gatherly Logo
|   |   |— Organization/Workspace Switcher
|   |   |— Collapse Toggle (Desktop)
|   |
|   |— Primary Navigation
|   |   |— Dashboard
|   |   |   |— Icon: Home
|   |   |   |— Label: "Dashboard"
|   |   |   |— Badge: Active indicator
|   |   |
|   |   |— Events
|   |   |   |— Icon: Calendar
|   |   |   |— Label: "My Events"
|   |   |   |— Badge: Draft count
|   |   |   |— Submenu (expandable)
|   |   |       |— All Events
|   |   |       |— Published
|   |   |       |— Draft
|   |   |       |— Completed
|   |   |
|   |   |— Create Event
|   |   |   |— Icon: Plus Circle (Highlighted)
|   |   |   |— Label: "Create Event"
|   |   |   |— Primary color accent
|   |   |
|   |   |— Analytics
|   |   |   |— Icon: BarChart
|   |   |   |— Label: "Analytics"
|   |   |   |— Submenu (expandable)
|   |   |       |— Revenue Reports
|   |   |       |— Ticket Sales
|   |   |       |— Attendee Insights
|   |   |
|   |   |— QR Scanner
|   |   |   |— Icon: QrCode
|   |   |   |— Label: "QR Scanner"
|   |   |   |— Context: Only when events exist
|   |
|   |— Secondary Navigation
|   |   |— Settings
|   |   |   |— Icon: Settings
|   |   |   |— Label: "Settings"
|   |   |   |— Submenu
|   |   |       |— Profile
|   |   |       |— Organization
|   |   |       |— Billing
|   |   |       |— Integrations
|   |   |
|   |   |— Help & Support
|   |   |   |— Icon: HelpCircle
|   |   |   |— Label: "Help"
|   |   |   |— External link indicator
|   |
|   |— Sidebar Footer
|   |   |— User Profile Section
|   |   |   |— Avatar
|   |   |   |— Name (Collapsible)
|   |   |   |— Organization (Collapsible)
|   |   |   |— Dropdown Arrow
|   |   |
|   |   |— User Dropdown Menu
|   |       |— Profile Settings
|   |       |— Switch Organization
|   |       |— Sign Out
|
|— Mobile Sidebar Behavior (< 768px)
|   |— Off-canvas sidebar (overlay)
|   |— Hamburger trigger in top header
|   |— Backdrop blur when open
|   |— Swipe gestures to open/close
|   |— Same navigation structure
|
|— Main Content Area
|   |— Top Header Bar
|   |   |— Breadcrumb Navigation
|   |   |— Page Title
|   |   |— Page Actions (contextual)
|   |   |— Global Search
|   |   |— Notifications Bell
|   |       |— Notification Count Badge
|   |       |— Dropdown Menu
|   |
|   |— Content Body
|   |   |— Dashboard Header
|   |   |   |— Welcome Message
|   |   |   |   |— "Good morning, [Name]"
|   |   |   |   |— Current Date Display
|   |   |   |
|   |   |   |— Quick Actions Bar
|   |   |       |— Create New Event Button (Primary)
|   |   |       |— QR Scanner Button
|   |   |       |— Export Data Button
|   |   |
|   |   |— Summary Cards Section
|   |— Total Revenue Card
|   |   |— IDR Amount Display
|   |   |— Growth Percentage
|   |   |— Comparison Period
|   |
|   |— Total Tickets Sold Card
|   |   |— Ticket Count
|   |   |— Growth Indicator
|   |   |— Active Events Count
|   |
|   |— Active Events Card
|   |   |— Event Count
|   |   |— Published Events
|   |   |— Draft Events
|   |
|   |— Upcoming Events Card
|       |— Next Event Info
|       |— Days Until Event
|       |— Quick Action Link
|
|— My Events Section
|   |— Section Header
|   |   |— "My Events" Title
|   |   |— View All Events Link
|   |
|   |— Events DataTable (Enhanced Table with Advanced Features)
|   |   |— DataTable Toolbar
|   |   |   |— Global Search Input
|   |   |   |   |— Search by name, location, or description
|   |   |   |   |— Clear search button
|   |   |   |   |— Search icon indicator
|   |   |   |
|   |   |   |— Status Filter Dropdown
|   |   |   |   |— Multi-select checkbox filters
|   |   |   |   |— All Status / Draft / Published / Completed
|   |   |   |   |— Filter count indicator
|   |   |   |   |— Clear filters option
|   |   |   |
|   |   |   |— Column Visibility Toggle
|   |   |   |   |— Show/Hide columns dropdown
|   |   |   |   |— Checkbox for each column
|   |   |   |   |— Reset to default view
|   |   |   |
|   |   |   |— Bulk Actions (when rows selected)
|   |   |   |   |— Delete selected events
|   |   |   |   |— Bulk status change
|   |   |   |   |— Export selected data
|   |   |   |   |— Selection count indicator
|   |   |   |
|   |   |   |— Quick Actions
|   |   |       |— Add Event Button (Primary CTA)
|   |   |       |— Export All Data
|   |   |       |— Refresh Data
|   |   |
|   |   |— DataTable Content
|   |   |   |— Sortable Column Headers
|   |   |   |   |— Row Selection (Checkbox column)
|   |   |   |   |— Event Name (Sortable, with poster thumbnail)
|   |   |   |   |— Date & Time (Sortable)
|   |   |   |   |— Location (Optional visibility)
|   |   |   |   |— Status (Filterable badges)
|   |   |   |   |— Tickets Sold (Sortable with progress)
|   |   |   |   |— Revenue (Sortable, IDR formatted)
|   |   |   |   |— Actions (Row-level dropdown menu)
|   |   |   |
|   |   |   |— Selectable Data Rows
|   |   |   |   |— Row selection checkbox
|   |   |   |   |— Event poster thumbnail (Avatar component)
|   |   |   |   |— Event name as clickable link
|   |   |   |   |— Formatted date and time (Indonesian locale)
|   |   |   |   |— Location text (truncated if long)
|   |   |   |   |— Status badge with color coding
|   |   |   |   |— Progress bar showing tickets sold/total
|   |   |   |   |— IDR-formatted revenue amount
|   |   |   |   |— Action dropdown menu
|   |   |   |       |— View Event Details
|   |   |   |       |— Edit Event
|   |   |   |       |— Duplicate Event
|   |   |   |       |— Share Event Link
|   |   |   |       |— Open QR Scanner
|   |   |   |       |— Download Attendee List
|   |   |   |       |— Archive/Delete Event
|   |   |   |
|   |   |   |— Row Hover & Selection States
|   |   |   |   |— Hover highlighting
|   |   |   |   |— Selected row indication
|   |   |   |   |— Loading state skeleton
|   |   |   |
|   |   |   |— Empty State
|   |   |       |— No events illustration
|   |   |       |— "No events found" message
|   |   |       |— "Create First Event" CTA button
|   |   |       |— Clear filters suggestion (when filtered)
|   |   |
|   |   |— DataTable Pagination
|   |       |— Rows per page selector (10, 25, 50, 100)
|   |       |— Current page / total pages display
|   |       |— First/Previous/Next/Last navigation
|   |       |— Jump to page input
|   |       |— Total records count
|   |       |— Selected rows count display
|
|— Recent Activity Section
|   |— Section Title: "Recent Activity"
|   |— Activity Feed
|   |   |— Ticket Purchase Notifications
|   |   |— Event Status Changes
|   |   |— Check-in Activities
|   |
|   |— View All Activity Link
|
|— Quick Tips Section
    |— Tips Card
    |— Best Practices
    |— Help Resources
```

## 4. "New Event" Modal Structure

```
Create New Event Modal
|
|— Modal Overlay
|   |— Background Blur Effect
|   |— Click Outside to Close
|
|— Modal Container
|   |— Modal Header
|   |   |— Title: "Create New Event"
|   |   |— Close Button (X)
|   |   |— Progress Indicator
|   |       |— Step 1: Event Details
|   |       |— Step 2: Tickets
|   |       |— Step 3: Publication
|   |
|   |— Modal Body
|   |   |— Step 1: Event Details Form
|   |   |   |— Event Name Field
|   |   |   |   |— Label: "Event Name"
|   |   |   |   |— Input Field
|   |   |   |   |— Character Counter (255 max)
|   |   |   |   |— Validation Message
|   |   |   |
|   |   |   |— Event Description Field
|   |   |   |   |— Label: "Event Description"
|   |   |   |   |— Textarea
|   |   |   |   |— Rich Text Formatting Options
|   |   |   |   |— Character Counter
|   |   |   |
|   |   |   |— Date & Time Section
|   |   |   |   |— Event Date Picker
|   |   |   |   |— Start Time Picker
|   |   |   |   |— End Time Picker
|   |   |   |   |— Timezone Display
|   |   |   |
|   |   |   |— Location Field
|   |   |   |   |— Label: "Event Location"
|   |   |   |   |— Input Field with Autocomplete
|   |   |   |   |— Google Maps Integration
|   |   |   |
|   |   |   |— Event Poster Upload
|   |   |       |— Upload Area
|   |   |       |— Drag & Drop Zone
|   |   |       |— File Requirements Info
|   |   |       |— Preview Image
|   |   |       |— Remove/Replace Options
|   |   |
|   |   |— Step 2: Ticket Configuration
|   |   |   |— Ticket Types Section
|   |   |   |   |— Add Ticket Type Button
|   |   |   |   |— Ticket Type Cards
|   |   |   |       |— Ticket Name Field
|   |   |   |       |— Price Field (IDR)
|   |   |   |       |— Quantity Field
|   |   |   |       |— Description Field
|   |   |   |       |— Remove Ticket Type Button
|   |   |   |
|   |   |   |— Pricing Summary
|   |   |       |— Total Tickets Count
|   |   |       |— Revenue Projection
|   |   |       |— Commission Calculation
|   |   |
|   |   |— Step 3: Publication Settings
|   |       |— Event URL Preview
|   |       |   |— Auto-generated URL
|   |       |   |— Custom URL Option
|   |       |   |— Availability Check
|   |       |
|   |       |— Visibility Settings
|   |       |   |— Draft Radio Button
|   |       |   |— Published Radio Button
|   |       |   |— Publication Date Picker
|   |       |
|   |       |— Terms & Conditions
|   |           |— Commission Agreement
|   |           |— Terms Checkbox
|   |           |— Privacy Policy Link
|   |
|   |— Modal Footer
|       |— Back Button (Step 2-3 only)
|       |— Cancel Button
|       |— Next Button / Save Draft Button
|       |— Publish Event Button (Step 3)
|       |— Loading State Indicators
|
|— Success State Modal
|   |— Success Icon
|   |— "Event Created Successfully!" Message
|   |— Event URL Display
|   |— Copy Link Button
|   |— Share Options
|   |   |— WhatsApp Share
|   |   |— Facebook Share
|   |   |— Twitter Share
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
