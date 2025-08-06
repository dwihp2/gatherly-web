# Gatherly Shadcn/UI Component Mapping
*Server-First Component Recommendations for Enhanced UX Structure*

## Server-First Implementation Strategy

### Architecture Principles
- **Server Components**: Default for all data fetching and rendering
- **Server Actions**: Primary method for all mutations and form submissions
- **Client Components**: Only for interactivity requiring client-side state
- **Hybrid Approach**: Strategic combination of server and client components

### Performance Benefits
- **Reduced Bundle Size**: 50%+ JavaScript reduction target
- **Better SEO**: Server-side rendering for all public content
- **Enhanced Security**: Server-side validation and processing
- **Improved Caching**: Built-in Next.js Server Component caching

## 1. Enhanced Navigation & Layout Components

```
Guest User Navigation (Marketing Pages - Server Components)
|
|— NavigationMenu (Desktop ≥ 1024px - Server Component)
|   |— NavigationMenuList (Server-rendered horizontal menu)
|   |— NavigationMenuItem (Features, Pricing, Help, For Organizers)
|   |— NavigationMenuLink (Static navigation links)
|   |— Button (Sign In → /sign-in, Start Selling → /register-organization)
|
|— Mobile Navigation (< 1024px - Client Component)
|   |— Sheet (Hamburger menu - requires client state)
|   |— SheetTrigger (Menu button)
|   |— SheetContent (Menu panel with navigation)

Authenticated User Navigation (Dashboard - Server + Client Components)
|
|— Enhanced Sidebar Component (Server Component base)
|   |— Sidebar Header (Server Component)
|   |   |— Logo (Gatherly brand - static)
|   |   |— Select (Organization switcher - Client Component)
|   |   |— Button (Collapse toggle - Client Component for state)
|   |
|   |— Navigation Section (Server Component)
|   |   |— NavigationMenu (Vertical server-rendered navigation)
|   |   |— NavigationMenuItem (Dashboard, Events, Analytics)
|   |   |— NavigationMenuLink (Server-rendered with active states)
|   |   |— Badge (Real-time counts - Server Component with revalidation)
|   |   |— Collapsible (Submenu - Client Component for interaction)
|   |       |— CollapsibleTrigger (Expandable items)
|   |       |— CollapsibleContent (Submenu server-rendered)
|   |
|   |— Enhanced User Section (Server Component)
|   |   |— DropdownMenu (User profile - Client Component)
|   |   |— DropdownMenuTrigger (User info server-rendered)
|   |   |— DropdownMenuContent (Profile options)
|   |   |— Avatar (User profile image - Server Component)
|   |   |— Typography (User details server-rendered)
|
|— Main Content Area (Server Component)
|   |— Top Header Bar (Server Component)
|   |   |— Breadcrumb (Server-rendered navigation context)
|   |   |— Command (Global search - Client Component)
|   |   |— Button (Notifications - Client Component for real-time)
|   |   |— Badge (Notification count - Server Component)
|
|— Mobile Sidebar Adaptation (Client Component)
|   |— Sheet (Off-canvas behavior requires client state)
|   |— SheetTrigger (Hamburger in header)
|   |— SheetContent (Same server-rendered navigation)
|   |— SheetOverlay (Backdrop with client interactions)
```

## 2. Public Event Discovery (New Feature Implementation)

```
Event Discovery Page (/events - Server Components)
|
|— Page Layout (Server Component)
|   |— Container (Server-rendered layout structure)
|   |— Grid (Responsive event grid - Server Component)
|
|— Search & Filter Interface
|   |— Search Bar (Client Component for immediate feedback)
|   |   |— Input (Search input with real-time suggestions)
|   |   |— Command (Search command palette)
|   |   |— CommandInput (Search field)
|   |   |— CommandList (Server Action for results)
|   |
|   |— Filter Sidebar (Client Component for immediate updates)
|   |   |— Accordion (Filter categories)
|   |   |— AccordionItem (Category sections)
|   |   |— AccordionTrigger (Expandable filters)
|   |   |— AccordionContent (Filter options)
|   |   |— Checkbox (Filter selections - client state)
|   |   |— Slider (Price range - Client Component)
|   |   |— Calendar (Date range picker - Client Component)
|   |   |— Badge (Active filter indicators)
|
|— Event Grid Display (Server Component)
|   |— Event Cards (Server Component for SEO)
|   |   |— Card (Event container)
|   |   |— CardHeader (Event title and details)
|   |   |— CardContent (Event information)
|   |   |— AspectRatio (Event poster optimization)
|   |   |— Badge (Category and status indicators)
|   |   |— Button (Quick buy CTA - triggers modal)
|   |
|   |— Pagination (Server Component)
|   |   |— PaginationContent (Page navigation)
|   |   |— PaginationItem (Page numbers)
|   |   |— PaginationLink (Server-side page changes)
|   |   |— PaginationNext/Previous (Navigation controls)
|
|— Empty State (Server Component)
|   |— EmptyState illustration
|   |— Typography (No results messaging)
|   |— Button (Clear filters or browse all events)
```

## 3. Enhanced Event Detail Page

```
Event Detail Page (/events/[slug] - Server Components + SSG)
|
|— Page Structure (Server Component with Static Generation)
|   |— Breadcrumb (Server-rendered navigation)
|   |— ShareButton (Social sharing - Client Component)
|   |
|— Event Hero Section (Server Component)
|   |— Card (Hero container)
|   |— AspectRatio (Event poster with Next.js Image)
|   |— Typography (Event title, subtitle, details)
|   |— Badge (Category and status indicators)
|   |— Separator (Visual sections)
|   |
|— Enhanced Ticket Selection (Client Component Modal)
|   |— Dialog (Modal container - Client Component)
|   |— DialogTrigger (Buy Tickets button)
|   |— DialogContent (Modal content)
|   |
|   |— Ticket Selection Interface (Client Component)
|   |   |— Card (Ticket type containers)
|   |   |— CardHeader (Ticket type information)
|   |   |— CardContent (Pricing and availability)
|   |   |— Button (Quantity controls - + and -)
|   |   |— Input (Quantity input)
|   |   |— Badge (Availability status)
|   |
|   |— Authentication Gate (Server Actions)
|   |   |— Tabs (Sign In / Guest Checkout)
|   |   |— TabsContent (Auth forms)
|   |   |— Form (Authentication form - Server Action)
|   |   |— Input (Email, password fields)
|   |   |— Button (Google Sign-In - Server Action)
|   |
|   |— Split-Screen Purchase Flow
|   |   |— Grid (Two-column layout)
|   |   |— Left Panel (Client Component)
|   |   |   |— Form (Customer information)
|   |   |   |— FormField (Customer details)
|   |   |   |— FormLabel (Field labels)
|   |   |   |— FormControl (Input controls)
|   |   |   |— Checkbox (Terms acceptance)
|   |   |
|   |   |— Right Panel (Client Component)
|   |   |   |— Card (Order summary - sticky)
|   |   |   |— CardHeader (Summary title)
|   |   |   |— CardContent (Ticket breakdown)
|   |   |   |— Separator (Price breakdown)
|   |   |   |— Typography (Total pricing in IDR)
|   |   |   |— Button (Continue to payment)
|   |
|   |— Payment Method Selection (Server Component)
|   |   |— RadioGroup (Payment options)
|   |   |— RadioGroupItem (Individual payment methods)
|   |   |— Label (Payment method labels)
|   |   |— Card (Payment method cards with icons)
|   |   |— Alert (Payment instructions)
|   |
|   |— Payment Processing (Server Actions)
|       |— Progress (Processing indicator)
|       |— Alert (Status messages)
|       |— Button (Payment completion actions)
|
|— Event Information (Server Component)
|   |— Tabs (Event details sections)
|   |— TabsList (Section navigation)
|   |— TabsContent (Section content)
|   |— Typography (Rich text content)
|   |— Accordion (FAQ and additional info)
|
|— Venue Information (Server Component)
|   |— Card (Venue details container)
|   |— MapEmbed (Google Maps integration)
|   |— Typography (Venue information)
|   |— Badge (Accessibility features)
|
|— Related Events (Server Component)
|   |— Carousel (Related events slider)
|   |— CarouselContent (Event cards)
|   |— CarouselItem (Individual events)
|   |— CarouselNext/Previous (Navigation)
```

## 4. Enhanced Authentication Pages

```
Authentication Pages (Server Components + Server Actions)
|
|— Sign In Page (Server Component)
|   |— Card (Form container)
|   |— CardHeader (Welcome messaging)
|   |— CardContent (Form fields)
|   |— CardFooter (Alternative actions)
|   |
|   |— Form (Server Action integration)
|   |   |— FormField (Email and password)
|   |   |— FormItem (Field containers)
|   |   |— FormLabel (Enhanced with required indicators)
|   |   |— FormControl (Input wrappers)
|   |   |— FormMessage (Server validation messages)
|   |   |— Input (Email, password fields)
|   |   |— Checkbox (Remember me)
|   |   |— Button (Sign in - Server Action)
|   |
|   |— Social Authentication (Server Actions)
|   |   |— Button (Google Sign-In with OAuth Server Action)
|   |   |— Separator (Visual division)
|   |
|   |— Navigation Links (Server Component)
|   |   |— Typography (Role-based messaging)
|   |   |— Link (Sign up options)
|   |   |— Button (Register as Organizer CTA)
|
|— Organization Registration (Server Component + Server Actions)
|   |— Multi-step Form (Server Actions)
|   |   |— Progress (Step indicator)
|   |   |— Card (Step containers)
|   |   |— FormField (Organization details)
|   |   |— Input (Organization name, industry, size)
|   |   |— Select (Business type dropdown)
|   |   |— Textarea (Organization description)
|   |   |— Button (Next/Previous/Submit - Server Actions)
|   |
|   |— Onboarding Success (Server Component)
|       |— Alert (Success message)
|       |— Typography (Next steps guidance)
|       |— Button (Continue to dashboard)
```

## 5. Enhanced Organizer Dashboard

```
Dashboard Layout (Server Components + Selective Client Components)
|
|— Dashboard Header (Server Component)
|   |— Card (Welcome container)
|   |— Typography (Personalized greeting - server-rendered)
|   |— Badge (Time-based indicators)
|   |— Button (Quick actions - Client Component for immediate feedback)
|
|— Enhanced Summary Cards (Server Components)
|   |— Grid (Responsive cards layout)
|   |— Card (Metric containers with real-time data)
|   |   |— CardHeader (Metric titles)
|   |   |— CardContent (Server-calculated statistics)
|   |   |— Progress (Growth indicators)
|   |   |— Badge (Status and trend indicators)
|   |   |— ChartContainer (Revenue/sales charts - Server Component)
|   |
|   |— Skeleton (Loading states for server data)
|
|— Advanced Events DataTable (TanStack Table + Server Components)
|   |— DataTable Toolbar (Client Component for immediate interactions)
|   |   |— Input (Global search with debounced Server Actions)
|   |   |— Popover (Advanced filter dropdown)
|   |   |   |— PopoverTrigger (Filter button with active count)
|   |   |   |— PopoverContent (Filter interface)
|   |   |   |— Checkbox (Multi-select filters)
|   |   |   |— DatePickerRange (Date range filtering)
|   |   |   |— Slider (Revenue range filtering)
|   |   |   |— Button (Clear filters, Apply filters)
|   |   |
|   |   |— DropdownMenu (Column visibility)
|   |   |   |— DropdownMenuTrigger (Columns button)
|   |   |   |— DropdownMenuContent (Column options)
|   |   |   |— DropdownMenuCheckboxItem (Show/hide columns)
|   |   |
|   |   |— Bulk Actions (Client Component)
|   |   |   |— AlertDialog (Bulk delete confirmation)
|   |   |   |— Button (Bulk operations)
|   |   |   |— Badge (Selection count)
|   |   |
|   |   |— Export Options (Server Actions)
|   |       |— DropdownMenu (Export format selection)
|   |       |— Button (Export triggers)
|   |       |— Progress (Export progress)
|
|   |— Enhanced DataTable Core (Server Component base)
|   |   |— Table (Core table with server-side data)
|   |   |— TableHeader (Server-rendered headers with sort indicators)
|   |   |   |— TableHead (Sortable column headers)
|   |   |   |— Button (Sort controls with Server Actions)
|   |   |   |— ChevronUp/Down (Sort direction indicators)
|   |   |   |— Checkbox (Select all - Client Component)
|   |   |
|   |   |— TableBody (Server-rendered data rows)
|   |   |— TableRow (Event rows with server data)
|   |   |— TableCell (Data cells with proper formatting)
|   |   |   |— Checkbox (Row selection - Client Component)
|   |   |   |— Avatar (Event poster thumbnails)
|   |   |   |— Link (Event name - server-rendered)
|   |   |   |— Typography (Formatted dates, IDR amounts)
|   |   |   |— Badge (Status with Indonesian localization)
|   |   |   |— Progress (Ticket sales progress)
|   |   |   |— DropdownMenu (Row actions - Client Component)
|   |   |       |— DropdownMenuTrigger (Three dots menu)
|   |   |       |— DropdownMenuContent (Action options)
|   |   |       |— DropdownMenuItem (Server Action triggers)
|   |   |       |— DropdownMenuSeparator (Visual grouping)
|   |   |
|   |   |— Enhanced Loading States
|   |   |   |— TableRow (Skeleton rows)
|   |   |   |— Skeleton (Cell placeholders)
|   |   |   |— ShimmerEffect (Loading animation)
|   |   |
|   |   |— Advanced Empty States
|   |       |— TableRow (Empty row)
|   |       |— TableCell (Centered empty content)
|   |       |— EmptyStateIllustration (Custom graphic)
|   |       |— Typography (Contextual messaging)
|   |       |— Button (Create first event CTA)
|
|   |— Enhanced Pagination (Server Component)
|       |— PaginationContainer (Server-side pagination)
|       |— Select (Page size with Server Action)
|       |— Typography (Indonesian-localized page info)
|       |— Button (Navigation with Server Actions)
|       |— PaginationEllipsis (Large dataset handling)
|
|— Real-time Activity Feed (Server Component + WebSocket)
|   |— Card (Activity container)
|   |— ScrollArea (Scrollable feed)
|   |— ActivityItem (Individual activities)
|   |— Avatar (Activity icons)
|   |— Typography (Activity descriptions)
|   |— Badge (Activity types and timestamps)
|   |— Link (View all activities)
```

## 6. Enhanced Modal Structures

```
Create Event Modal (Client Component + Server Actions)
|
|— Dialog (Modal container - Client Component for UX)
|   |— DialogContent (Modal body with proper sizing)
|   |— DialogHeader (Modal title and progress)
|   |— DialogDescription (Context and guidance)
|   |
|   |— Multi-step Form System (Client Component + Server Actions)
|   |   |— Progress (Visual step indicator)
|   |   |— StepIndicator (Current step highlighting)
|   |
|   |— Step 1: Event Details (Server Action: createEventAction)
|   |   |— Form (React Hook Form + Server Action)
|   |   |— FormField (Event details)
|   |   |— Input (Event name with validation)
|   |   |— Textarea (Event description with rich text)
|   |   |— Calendar (Date picker with Indonesian locale)
|   |   |— TimePicker (Time selection)
|   |   |— Input (Location with autocomplete)
|   |   |— FileUploader (Poster upload with preview)
|   |   |— Card (Upload area with drag & drop)
|   |
|   |— Step 2: Ticket Configuration (Server Action: updateEventAction)
|   |   |— Dynamic Ticket Types (Client Component)
|   |   |— Card (Ticket type containers)
|   |   |— Input (Ticket name, price in IDR, quantity)
|   |   |— Textarea (Ticket description)
|   |   |— Button (Add/Remove ticket types)
|   |   |— Separator (Visual ticket separation)
|   |   |— Alert (Pricing summary with calculations)
|   |
|   |— Step 3: Publication (Server Action: publishEventAction)
|   |   |— Input (Custom URL with validation)
|   |   |— RadioGroup (Publication status)
|   |   |— Calendar (Publication date)
|   |   |— Checkbox (Terms acceptance)
|   |   |— Alert (Publication guidelines)
|   |
|   |— Success State (Server Component)
|   |   |— CheckCircle (Success icon)
|   |   |— Typography (Success messaging)
|   |   |— Input (Generated URL with copy functionality)
|   |   |— ShareButtons (Social sharing)
|   |   |— Button (Next steps actions)
|
|— Enhanced Error Handling
|   |— Alert (Validation errors)
|   |— FormMessage (Field-specific errors)
|   |— Toast (Success/error notifications)
```

## 7. QR Scanner Implementation

```
QR Scanner Interface (Client Component + Server Actions)
|
|— Dialog (Full-screen modal)
|   |— DialogContent (Scanner interface)
|   |
|— Camera Interface (Client Component)
|   |— CameraView (Video stream)
|   |— ScannerOverlay (QR targeting)
|   |— Button (Camera controls - flash, switch)
|   |— Alert (Scanner status and instructions)
|
|— Scan Results (Server Component + Server Actions)
|   |— Success State (Server Action: validateTicketAction)
|   |   |— Alert (Success styling with green theme)
|   |   |— CheckCircle (Success icon)
|   |   |— Typography (Indonesian success message)
|   |   |— Card (Attendee information display)
|   |   |— Badge (Ticket type and timestamp)
|   |
|   |— Already Checked State (Server validation)
|   |   |— Alert (Warning styling with yellow theme)
|   |   |— AlertTriangle (Warning icon)
|   |   |— Typography (Previous check-in info)
|   |   |— Card (Check-in history)
|   |
|   |— Invalid Ticket State (Server validation)
|   |   |— Alert (Error styling with red theme)
|   |   |— XCircle (Error icon)
|   |   |— Typography (Error explanation)
|   |   |— Card (Troubleshooting suggestions)
|
|— Scanner Controls (Client Component)
|   |— Button (Close scanner)
|   |— Button (Manual entry mode)
|   |— Button (Scanner statistics)
|   |— Switch (Audio feedback toggle)
|
|— Manual Entry Fallback (Server Action)
|   |— Input (Ticket code entry)
|   |— Button (Validate manually)
|   |— FormMessage (Validation feedback)
```

## 8. Enhanced Form Components

```
Server-First Form System
|
|— Form (React Hook Form + Server Actions)
|   |— FormField (Server-validated fields)
|   |— FormItem (Field containers with proper spacing)
|   |— FormLabel (Enhanced with required indicators)
|   |— FormControl (Input wrappers with validation)
|   |— FormDescription (Helpful field guidance)
|   |— FormMessage (Server validation messages)
|
|— Indonesian Market Specific Components
|   |— CurrencyInput (IDR formatting)
|   |— PhoneInput (Indonesian phone number format)
|   |— LocationInput (Indonesian cities autocomplete)
|   |— DatePicker (Indonesian calendar locale)
|   |— TimePicker (Indonesian time format)
|
|— Enhanced Input Components
|   |— Input (Enhanced with validation states)
|   |— Textarea (Rich text with formatting)
|   |— Select (Server-populated options)
|   |— Checkbox (Enhanced styling and states)
|   |— RadioGroup (Improved accessibility)
|   |— Switch (Professional toggle design)
|   |— Slider (Range inputs with IDR formatting)
|
|— File Upload Components
|   |— FileUploader (Drag & drop with preview)
|   |— ImageUpload (Event poster specific)
|   |— MultiFileUpload (Multiple attachments)
|   |— ProgressBar (Upload progress)
|   |— Alert (Upload status and errors)
```

## 9. Performance & Optimization Components

```
Server-First Performance Enhancements
|
|— Loading States (Server Component optimized)
|   |— Skeleton (Content placeholders)
|   |— TableSkeleton (DataTable loading states)
|   |— CardSkeleton (Dashboard card loading)
|   |— FormSkeleton (Form loading states)
|   |— ShimmerEffect (Smooth loading animations)
|
|— Error Boundaries (Server Component)
|   |— ErrorBoundary (Global error handling)
|   |— ErrorFallback (User-friendly error display)
|   |— Alert (Error messaging)
|   |— Button (Error recovery actions)
|
|— Optimization Components
|   |— LazyLoad (Component lazy loading)
|   |— VirtualizedList (Large dataset handling)
|   |— InfiniteScroll (Pagination alternative)
|   |— Suspense (Server Component streaming)
|
|— Indonesian Market Optimizations
|   |— CurrencyFormatter (IDR display)
|   |— DateFormatter (Indonesian locale)
|   |— PhoneFormatter (Indonesian numbers)
|   |— AddressFormatter (Indonesian addresses)
```

## 10. Implementation Priority & Dependencies

### Phase 1: Core Server Components (Week 1)
1. **Enhanced Navigation System** (Server Components)
2. **Authentication Pages** (Server Actions)
3. **Basic Dashboard Structure** (Server Components)
4. **Event Creation Modal** (Client + Server Actions)

### Phase 2: Public Features (Week 2)
1. **Event Discovery Page** (/events - Server Components)
2. **Enhanced Event Detail Pages** (Server Components + SSG)
3. **Purchase Modal System** (Client + Server Actions)
4. **Payment Integration** (Server Actions)

### Phase 3: Advanced Features (Week 3-4)
1. **Advanced DataTable System** (TanStack + Server Components)
2. **QR Scanner Interface** (Client + Server Actions)
3. **Analytics Dashboard** (Server Components)
4. **Performance Optimizations**

### Required Dependencies
```bash
# Core dependencies (already installed)
@tanstack/react-table    # Advanced DataTable functionality
@radix-ui/react-*       # Shadcn/UI base components

# Additional Server-First dependencies
next                    # Version 15 with App Router
react-hook-form        # Form handling with Server Actions
zod                    # Schema validation
lucide-react          # Icon system
```

### Indonesian Market Enhancements
- **Currency Formatting**: IDR-specific number formatting
- **Date Localization**: Indonesian calendar and time formats
- **Payment Methods**: QRIS, GoPay, OVO, DANA integration components
- **Mobile Optimization**: Touch-friendly Indonesian mobile patterns
- **Accessibility**: Indonesian screen reader and assistive technology support

This enhanced implementation plan provides a comprehensive component mapping strategy that leverages the server-first architecture while maintaining the context-aware navigation and enhanced user experience outlined in the updated UX structure plan.
|   |— Download (Download actions)
|   |— Share (Share actions)
|   |— Plus (Add actions)
|   |— Search (Search functionality)
|
|— Feature Icons
|   |— QrCode (QR scanner)
|   |— Calendar (Date selections)
|   |— MapPin (Location)
|   |— Users (Attendees)
|   |— DollarSign (Revenue)
|   |— BarChart (Analytics)
|   |— Settings (Configuration)
|   |— Bell (Notifications)
```

## 10. Mobile-First Navigation Implementation

```
Mobile Bottom Navigation Component Structure
|
|— BottomNavigation (Custom component)
|   |— BottomNavigationContainer (Fixed positioning wrapper)
|   |   |— className: "fixed bottom-0 left-0 right-0 z-50 bg-background border-t"
|   |   |— height: "h-16" (64px)
|   |
|   |— BottomNavigationList (Flex container for tabs)
|   |   |— className: "flex items-center justify-around"
|   |   |— padding: "px-2"
|   |
|   |— BottomNavigationItem (Individual tab)
|   |   |— Button (Tab button component)
|   |   |   |— variant: "ghost"
|   |   |   |— size: "sm"
|   |   |   |— className: "flex-1 flex-col gap-1 h-14"
|   |   |
|   |   |— Icon (Lucide React icon - 20px)
|   |   |— Text (Tab label - text-xs)
|   |   |— Badge (Notification indicator when needed)
|   |
|   |— BottomNavigationPrimary (Create tab special styling)
|       |— Enhanced visual treatment
|       |— Elevated appearance
|       |— Primary color theme

Responsive Navigation Breakpoints
|
|— Mobile (< 768px)
|   |— TopHeader (Minimal)
|   |   |— Container (max-width constraint)
|   |   |— Flex (justify-between alignment)
|   |   |— Logo + Avatar + Notifications only
|   |
|   |— BottomNavigation (Primary navigation)
|   |   |— Full tab bar implementation
|   |   |— Touch-optimized (44px minimum)
|   |
|— Tablet (768px - 1023px)
|   |— NavigationMenu (Full horizontal navigation)
|   |— No bottom navigation
|   |— Touch-optimized button sizes
|
|— Desktop (≥ 1024px)
|   |— NavigationMenu (Full with hover states)
|   |— Enhanced dropdown menus
|   |— Keyboard navigation support

Navigation State Management
|
|— useNavigation Hook (Custom hook for navigation state)
|   |— activeTab state
|   |— setActiveTab function
|   |— navigation history
|   |— breadcrumb generation
|
|— NavigationProvider (Context provider)
|   |— Navigation state
|   |— Route change handlers
|   |— Accessibility announcements
```

## 11. Layout & Responsive Components

```
Enhanced Responsive Design Structure
|
|— Grid (Responsive grid layouts)
|— Flex (Flexible layouts)
|— Container (Content containers with proper mobile padding)
|— AspectRatio (Responsive media)
|— ScrollArea (Scrollable content with mobile optimization)

Navigation Structure (Updated)
|
|— NavigationMenu (Desktop/Tablet main navigation)
|   |— NavigationMenuList (Menu items)
|   |— NavigationMenuItem (Individual items)
|   |   |— NavigationMenuTrigger (Dropdown triggers)
|   |   |— NavigationMenuContent (Enhanced dropdown content)
|   |   |— NavigationMenuLink (Menu links with active states)
|   |
|   |— NavigationMenuIndicator (Active state indicator)
|   |— NavigationMenuViewport (Dropdown positioning)
|
|— BottomNavigation (Mobile primary navigation)
|   |— BottomNavigationItem (Tab components)
|   |— BottomNavigationBadge (Notification badges)
|   |— BottomNavigationLabel (Accessible labels)
|
|— Breadcrumb (Enhanced page navigation)
|   |— BreadcrumbList (Breadcrumb items)
|   |— BreadcrumbItem (Individual crumbs with icons)
|   |— BreadcrumbLink (Breadcrumb links)
|   |— BreadcrumbSeparator (Visual separators)
|   |— BreadcrumbEllipsis (Truncation for long paths)

Search Integration Components
|
|— Command (Search command palette)
|   |— CommandInput (Search input with proper mobile sizing)
|   |— CommandList (Search results)
|   |— CommandEmpty (No results state)
|   |— CommandGroup (Result categories)
|   |— CommandItem (Individual search results)
|   |— CommandShortcut (Keyboard shortcuts display)
```

## Implementation Priority & Accessibility

### Implementation Order
1. **Top Navigation Enhancement** (Desktop/Tablet)
2. **Mobile Bottom Navigation** (Custom component)
3. **Search Integration** (Global search functionality)
4. **Breadcrumb Navigation** (Context awareness)
5. **Accessibility Improvements** (ARIA labels, keyboard navigation)

### Accessibility Requirements
- **WCAG 2.1 AA Compliance**: All navigation components
- **Keyboard Navigation**: Full keyboard support with logical tab order
## 11. Sidebar Navigation Implementation Details

```
Custom Sidebar Component Structure
|
|— SidebarProvider (Context provider for sidebar state)
|   |— Sidebar Container
|   |   |— className: "fixed left-0 top-0 h-full w-64 bg-background border-r"
|   |   |— Mobile: "transform -translate-x-full lg:translate-x-0"
|   |   |— Collapsed: "w-16" (desktop only)
|   |
|   |— Sidebar Header
|   |   |— Logo + Organization Switcher
|   |   |— Collapse Toggle (Button with ChevronLeft icon)
|   |
|   |— Sidebar Navigation
|   |   |— ScrollArea (Scrollable navigation area)
|   |   |— Navigation Items
|   |       |— Button (Navigation item base)
|   |       |— className: "w-full justify-start gap-3 px-3 py-2"
|   |       |— Icon (lucide-react icons - Home, Calendar, Plus, BarChart3, etc.)
|   |       |— Typography (Menu label - hidden when collapsed)
|   |       |— Badge (Count indicators)
|   |
|   |— Collapsible Submenus
|   |   |— Collapsible (Expandable menu groups)
|   |   |— CollapsibleTrigger (Parent menu item with ChevronDown)
|   |   |— CollapsibleContent (Submenu items)
|   |       |— Button (Submenu item)
|   |       |— className: "pl-8 py-1.5 text-sm"
|   |
|   |— Sidebar Footer
|       |— DropdownMenu (User profile section)
|       |— DropdownMenuTrigger (User info + avatar)
|       |— DropdownMenuContent (Profile options)

Mobile Sidebar Implementation
|
|— Sheet (Off-canvas sidebar for mobile)
|   |— SheetTrigger (Hamburger button in top header)
|   |   |— Button with Menu icon
|   |   |— className: "lg:hidden" (only visible on mobile)
|   |
|   |— SheetContent (Sidebar content)
|   |   |— side="left" (Slide from left)
|   |   |— className: "w-64 p-0" (Same width as desktop)
|   |   |— Same navigation structure as desktop
|   |
|   |— SheetOverlay (Backdrop)
|       |— className: "lg:hidden" (Mobile only)

Responsive Behavior
|
|— Desktop (≥ 1024px)
|   |— Fixed sidebar (always visible)
|   |— Collapsible functionality
|   |— Hover tooltips when collapsed
|   |— Keyboard navigation
|
|— Tablet (768px - 1023px)  
|   |— Off-canvas sidebar (Sheet component)
|   |— Hamburger trigger in header
|   |— Overlay backdrop when open
|
|— Mobile (< 768px)
|   |— Same as tablet behavior
|   |— Touch-friendly sizing
|   |— Swipe gestures support
```

## 12. Accessibility Implementation

```
Navigation Accessibility Features
|
|— ARIA Labels and Roles
|   |— role="navigation" (Sidebar container)
|   |— aria-label="Main navigation" (Navigation section)
|   |— aria-expanded (Collapsible items)
|   |— aria-current="page" (Active navigation item)
|
|— Keyboard Navigation
|   |— Tab order: Logical flow through navigation
|   |— Arrow keys: Navigate between menu items
|   |— Enter/Space: Activate menu items
|   |— Escape: Close mobile sidebar
|
|— Screen Reader Support
|   |— Semantic HTML structure
|   |— Descriptive text for icons
|   |— Status announcements for navigation changes
|   |— Skip links for main content
|
|— Visual Accessibility
|   |— High contrast mode support
|   |— Focus indicators: 2px solid ring
|   |— Color contrast: 4.5:1 minimum ratio
|   |— Motion preferences: Respect reduced motion
```

- **Screen Reader Support**: Proper ARIA labels and semantic structure
- **Touch Targets**: 44px minimum for all interactive elements
- **Color Contrast**: 4.5:1 minimum ratio for all navigation text
- **Focus Management**: Clear visual focus indicators
- **Mobile Accessibility**: Voice navigation and switch control support

This component mapping provides a comprehensive guide for implementing the context-aware navigation strategy using Shadcn/UI components, ensuring consistency and accessibility across the Gatherly platform.
