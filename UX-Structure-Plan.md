# Gatherly UX Structure Plan
*Mobile-First Ticketing SaaS Platform for Indonesian Market*

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
Organizer Dashboard Layout
|
|— Top Navigation Bar
|   |— Gatherly Logo
|   |— Breadcrumb Navigation
|   |— User Profile Dropdown
|   |   |— Profile Settings
|   |   |— Billing Information
|   |   |— Help Center
|   |   |— Sign Out
|   |
|   |— Notifications Bell
|       |— Notification Count Badge
|       |— Dropdown Menu
|
|— Dashboard Header
|   |— Welcome Message
|   |   |— "Welcome, [Organizer Name]"
|   |   |— Current Date Display
|   |
|   |— Quick Actions
|       |— Create New Event Button (Primary)
|       |— QR Scanner Button
|
|— Summary Cards Section
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
|   |   |— Filter Dropdown
|   |       |— All Status
|   |       |— Draft
|   |       |— Published
|   |       |— Completed
|   |
|   |— Events Table
|   |   |— Table Headers
|   |   |   |— Event Name
|   |   |   |— Date & Time
|   |   |   |— Status
|   |   |   |— Tickets Sold
|   |   |   |— Revenue
|   |   |   |— Actions
|   |   |
|   |   |— Event Rows
|   |   |   |— Event Poster Thumbnail
|   |   |   |— Event Name Link
|   |   |   |— Formatted Date
|   |   |   |— Location
|   |   |   |— Status Badge
|   |   |   |— Progress Bar (Sold/Total)
|   |   |   |— IDR Revenue
|   |   |   |— Action Buttons
|   |   |       |— View Details
|   |   |       |— Edit Event
|   |   |       |— Share Link
|   |   |       |— Scanner QR
|   |   |       |— Download Attendees
|   |   |
|   |   |— Empty State
|   |       |— Illustration
|   |       |— "No events yet" Message
|   |       |— "Create First Event" Button
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
