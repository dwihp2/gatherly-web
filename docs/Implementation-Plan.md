# Gatherly Shadcn/UI Component Mapping
*Component recommendations for each UI element in the UX Structure Plan*

## Navigation Implementation Strategy

### Context-Aware Navigation Approach  
- **Guest Users**: Top navigation (desktop) + hamburger menu (mobile) using NavigationMenu
- **Authenticated Users**: Sidebar navigation (all devices) using custom sidebar components
- **Mobile Responsive**: Sidebar transforms to off-canvas hamburger menu on mobile
- **Accessibility**: Full WCAG 2.1 AA compliance with proper ARIA labels and keyboard navigation

## 1. Navigation & Layout Components

```
Guest User Navigation (Marketing Pages)
|
|— NavigationMenu (Desktop ≥ 1024px)
|   |— NavigationMenuList (Horizontal menu container)
|   |— NavigationMenuItem (Features, Pricing, Help)
|   |— NavigationMenuLink (Direct navigation links)
|   |— Button (Sign In, Sign Up buttons)
|
|— Mobile Navigation (< 1024px)
|   |— Sheet (Hamburger menu)
|   |— SheetTrigger (Menu button)
|   |— SheetContent (Menu panel)

Authenticated User Navigation (Dashboard/App)
|
|— Custom Sidebar Component (All devices)
|   |— Sidebar Header
|   |   |— Logo (Gatherly brand)
|   |   |— Select (Organization switcher)
|   |   |— Button (Collapse toggle - desktop only)
|   |
|   |— Navigation Section
|   |   |— NavigationMenu (Vertical navigation)
|   |   |— NavigationMenuItem (Dashboard, Events, Create, Analytics)
|   |   |— NavigationMenuLink (Navigation links with icons)
|   |   |— Badge (Status indicators, counts)
|   |   |— Collapsible (Expandable submenus)
|   |       |— CollapsibleTrigger (Menu item with submenu)
|   |       |— CollapsibleContent (Submenu items)
|   |
|   |— Sidebar Footer
|   |   |— DropdownMenu (User profile menu)
|   |   |— DropdownMenuTrigger (User avatar + info)
|   |   |— DropdownMenuContent (Profile options)
|   |   |— Avatar (User profile image)
|   |   |— Typography (User name, organization)
|
|— Main Content Area
|   |— Top Header Bar
|   |   |— Breadcrumb (Page navigation)
|   |   |— Input (Global search)
|   |   |— Button (Notifications)
|   |   |— Badge (Notification count)
|
|— Mobile Sidebar (< 768px)
|   |— Sheet (Off-canvas sidebar)
|   |— SheetTrigger (Hamburger in top header)
|   |— SheetContent (Same sidebar content)
|   |— SheetOverlay (Backdrop blur)
```
|   |   |
|   |   |— Navigation Links Section
|   |   |   |— Button (Dashboard link with Home icon)
|   |   |   |— Button (Events link with Calendar icon)  
|   |   |   |— Button (Create Event - Primary styling with Plus icon)
|   |   |   |— Button (QR Scanner with QrCode icon)
|   |   |   |— Separator (Visual division)
|   |   |   |— Button (Settings with Settings icon)
|   |   |   |— Button (Help Center with HelpCircle icon)
|   |   |   |— Button (Sign Out with LogOut icon)
|   |   |
|   |   |— Sheet Footer (App version, additional info)

Responsive Layout Structure
|
|— Container (Page wrapper with responsive padding)
|— Grid (Responsive layout structure for desktop)
|— Flex (Flexible layouts for mobile navigation)
|— Separator (Visual dividers between sections)
|— ScrollArea (Scrollable content areas)
```

## 2. Authentication Pages

```
Sign In Page Layout
|
|— Card (Main form container)
|   |— CardHeader (Welcome message section)
|   |— CardContent (Form fields area)
|   |   |— Form (Form wrapper)
|   |   |— Input (Email and password fields)
|   |   |— Label (Field labels)
|   |   |— Button (Sign in, social buttons)
|   |   |— Checkbox (Remember me option)
|   |   |— Link (Forgot password, sign up links)
|   |   |— Alert (Validation messages)
|   |
|   |— CardFooter (Alternative actions)
|
|— Language Selector
    |— Select (Language dropdown)
    |— SelectContent (Dropdown options)
    |— SelectItem (Individual language options)
```

## 3. Landing Page (Guest Dashboard)

```
Hero Section
|
|— Card (Hero content wrapper)
|— Button (Primary and secondary CTAs)
|— Typography (h1, h2, p - Headlines and text)

Features Overview Section
|
|— Grid (Feature cards layout)
|— Card (Individual feature cards)
|   |— CardHeader (Feature titles)
|   |— CardContent (Feature descriptions)
|   |— Icons (Feature illustrations from lucide-react)

Social Proof Section
|
|— Statistics Cards
|   |— Card (Statistics cards)
|   |— Badge (Counter displays)
|
|— Testimonials Carousel
    |— Carousel (Testimonials slider)
    |— CarouselContent (Testimonial items)
    |— CarouselItem (Individual testimonials)
    |— Avatar (Profile photos)

Pricing Section
|
|— Card (Pricing display)
|— Badge (Commission highlight)
|— List (Feature list items)
|— Check (Feature checkmarks - lucide icon)
```

## 4. Authenticated Organizer Dashboard

```
Dashboard Header
|
|— Card (Welcome message container)
|— Typography (Welcome text and date)
|— Button (Quick action buttons - Create Event, QR Scanner)

Summary Cards Section
|
|— Grid (Cards layout - responsive)
|— Card (Metric containers)
|   |— CardHeader (Card titles)
|   |— CardContent (Metric displays)
|   |— Progress (Growth indicators)
|   |— Badge (Status indicators)
|   |— Separator (Visual separation)

My Events Section
|
|— Card (Section container)
|   |— CardHeader (Section title and actions)
|   |   |— Typography (Section heading)
|   |   |— Button (View all events link)
|   |
|   |— Events DataTable System (TanStack Table Implementation)
|   |   |— DataTable Toolbar Components
|   |   |   |— Input (Global search with search icon)
|   |   |   |— Popover (Status filter dropdown)
|   |   |   |   |— PopoverTrigger (Filter button with badge count)
|   |   |   |   |— PopoverContent (Filter options)
|   |   |   |   |— Checkbox (Multi-select status filters)
|   |   |   |   |— Label (Filter labels with counts)
|   |   |   |
|   |   |   |— DropdownMenu (Column visibility toggle)
|   |   |   |   |— DropdownMenuTrigger (Columns button)
|   |   |   |   |— DropdownMenuContent (Column options)
|   |   |   |   |— DropdownMenuCheckboxItem (Show/hide columns)
|   |   |   |
|   |   |   |— AlertDialog (Bulk delete confirmation)
|   |   |   |   |— AlertDialogTrigger (Delete selected button)
|   |   |   |   |— AlertDialogContent (Confirmation dialog)
|   |   |   |   |— AlertDialogAction (Confirm delete)
|   |   |   |
|   |   |   |— Button (Add event, Export data, Refresh)
|   |   |   |— Badge (Selection count indicator)
|   |   |
|   |   |— Enhanced DataTable Components
|   |   |   |— Table (Core table with fixed layout)
|   |   |   |— TableHeader (Sortable column headers)
|   |   |   |   |— TableHead (Column header cells with sorting)
|   |   |   |   |— Button (Sort toggle with chevron icons)
|   |   |   |   |— Checkbox (Select all checkbox)
|   |   |   |
|   |   |   |— TableBody (Data rows container)
|   |   |   |— TableRow (Individual event rows with selection state)
|   |   |   |— TableCell (Data cells with proper alignment)
|   |   |   |   |— Checkbox (Row selection)
|   |   |   |   |— Avatar (Event poster thumbnails)
|   |   |   |   |— Link (Event name as clickable link)
|   |   |   |   |— Typography (Formatted date, location, revenue)
|   |   |   |   |— Badge (Status badges with color variants)
|   |   |   |   |— Progress (Ticket sales progress bar)
|   |   |   |   |— DropdownMenu (Row action menu)
|   |   |   |       |— DropdownMenuTrigger (Three dots menu button)
|   |   |   |       |— DropdownMenuContent (Action options)
|   |   |   |       |— DropdownMenuItem (Individual actions)
|   |   |   |       |— DropdownMenuSeparator (Visual separation)
|   |   |   |
|   |   |   |— Empty State Components
|   |   |   |   |— TableRow (Empty state row)
|   |   |   |   |— TableCell (Centered empty message)
|   |   |   |   |— Typography ("No results" message)
|   |   |   |   |— Button (Create first event CTA)
|   |   |   |
|   |   |   |— Loading State Components
|   |   |       |— Skeleton (Loading placeholder rows)
|   |   |       |— TableRow (Skeleton row containers)
|   |   |       |— TableCell (Skeleton cell content)
|   |   |
|   |   |— Advanced DataTable Pagination  
|   |       |— Pagination Container
|   |       |   |— Label (Rows per page label)
|   |       |   |— Select (Page size selector)
|   |       |   |   |— SelectTrigger (Dropdown trigger)
|   |       |   |   |— SelectContent (Size options)
|   |       |   |   |— SelectItem (10, 25, 50, 100 options)
|   |       |   |
|   |       |   |— Typography (Page info display)
|   |       |   |— Button (First/Previous/Next/Last navigation)
|   |       |   |— ChevronFirstIcon, ChevronLeftIcon, ChevronRightIcon, ChevronLastIcon
|   |       |
|   |       |— Selection Status Display
|   |           |— Typography (Selected rows count)
|   |           |— Typography (Total rows count)
|   |           |— Button (Clear selection)

DataTable Dependencies & Requirements
|
|— Required Packages
|   |— @tanstack/react-table (Core table functionality)
|   |— Existing Shadcn/UI components
|   |
|— Enhanced Features Implementation
|   |— Multi-column filtering with custom filter functions
|   |— Global search across multiple columns
|   |— Column sorting with multiple sort states
|   |— Row selection with bulk actions
|   |— Column visibility controls
|   |— Pagination with customizable page sizes
|   |— Loading and empty states
|   |— Mobile-responsive table design
|   |— Accessibility compliance (ARIA labels, keyboard navigation)
|   |— Indonesian localization (IDR formatting, date formats)

Recent Activity Section
|
|— Card (Activity feed container)
|— ScrollArea (Scrollable activity list)
|— Avatar (Activity icons)
|— Typography (Activity descriptions)
|— Link (View all activities)
```

## 5. Modal Structures

```
Create New Event Modal
|
|— Dialog (Modal container)
|   |— DialogContent (Modal body)
|   |— DialogHeader (Modal title and close)
|   |   |— DialogTitle (Modal heading)
|   |   |— DialogDescription (Modal subtitle)
|   |   |— Button (Close button)
|   |   |— Progress (Step indicator)
|   |
|   |— Modal Body
|   |   |— Form (Form wrapper)
|   |   |— FormField (Individual form fields)
|   |   |— FormItem (Field containers)
|   |   |— FormLabel (Field labels)
|   |   |— FormControl (Input wrappers)
|   |   |— FormMessage (Validation messages)
|   |   |
|   |   |— Step 1: Event Details Form
|   |   |   |— Input (Event name field)
|   |   |   |— Textarea (Event description)
|   |   |   |— Calendar (Date picker)
|   |   |   |— TimePicker (Time selection)
|   |   |   |— Input (Location field with autocomplete)
|   |   |   |— FileInput (Poster upload)
|   |   |   |— Card (Upload area container)
|   |   |   |— Typography (File requirements)
|   |   |
|   |   |— Step 2: Ticket Configuration
|   |   |   |— Card (Ticket type cards)
|   |   |   |— Input (Ticket name, price, quantity)
|   |   |   |— Textarea (Ticket description)
|   |   |   |— Button (Add/Remove ticket types)
|   |   |   |— Separator (Visual separation)
|   |   |   |— Typography (Pricing summary)
|   |   |
|   |   |— Step 3: Publication Settings
|   |       |— Input (Custom URL field)
|   |       |— RadioGroup (Visibility options)
|   |       |— RadioGroupItem (Individual radio options)
|   |       |— Calendar (Publication date picker)
|   |       |— Checkbox (Terms agreement)
|   |       |— Link (Privacy policy link)
|   |
|   |— DialogFooter (Action buttons)
|       |— Button (Back, Cancel, Next, Save Draft, Publish)

Success State Modal
|
|— Dialog (Success modal)
|— CheckCircle (Success icon - lucide)
|— Typography (Success message)
|— Input (Event URL display)
|— Button (Copy link, share options)
|— Separator (Visual breaks)
```

## 6. Additional Modal Structures

```
Delete Confirmation Modal
|
|— AlertDialog (Confirmation modal)
|   |— AlertDialogContent (Modal content)
|   |— AlertDialogHeader (Warning section)
|   |   |— AlertTriangle (Warning icon - lucide)
|   |   |— AlertDialogTitle (Confirmation title)
|   |   |— AlertDialogDescription (Warning message)
|   |
|   |— Checkbox (Confirmation checkbox)
|   |— AlertDialogFooter (Action buttons)
|       |— AlertDialogCancel (Cancel button)
|       |— AlertDialogAction (Delete button - destructive)

QR Scanner Modal
|
|— Dialog (Full screen modal)
|   |— Card (Scanner interface)
|   |   |— Camera View Container
|   |   |— Button (Control buttons - flash, switch camera)
|   |
|   |— Scan Result Display
|   |   |— Success State (Green)
|   |   |   |— Alert (Success message)
|   |   |   |— CheckCircle (Success icon - lucide)
|   |   |   |— Typography (Attendee information)
|   |   |
|   |   |— Already Checked State (Yellow)
|   |   |   |— Alert (Warning message)
|   |   |   |— AlertTriangle (Warning icon - lucide)
|   |   |   |— Typography (Previous check-in time)
|   |   |
|   |   |— Invalid Ticket State (Red)
|   |       |— Alert (Error message)
|   |       |— XCircle (Error icon - lucide)
|   |       |— Typography (Error reason)
|   |
|   |— Control Buttons
|       |— Button (Close scanner, Manual entry, Statistics)
|       |— Separator (Visual breaks)

Edit Event Modal
|
|— Dialog (Similar structure to Create Event Modal)
|— Pre-populated form fields
|— Additional Action Buttons
    |— Button (Delete Event)
    |— Button (Duplicate Event)
    |— Button (View Public Page)
```

## 7. Form Components (General)

```
Form Elements Structure
|
|— Form (React Hook Form wrapper)
|   |— FormField (Field wrapper)
|   |— FormItem (Field container)
|   |— FormLabel (Field labels)
|   |— FormControl (Input control wrapper)
|   |— FormDescription (Help text)
|   |— FormMessage (Validation errors)
|
|— Input Components
|   |— Input (Text inputs)
|   |— Textarea (Multi-line text)
|   |— Select (Dropdown selections)
|   |— Checkbox (Checkboxes)
|   |— RadioGroup (Radio button groups)
|   |— Switch (Toggle switches)
|   |— Slider (Range inputs)
|   |— Calendar (Date selection)
|   |— Button (Form actions)

Validation & Feedback
|
|— Alert (Form-level messages)
|— AlertDescription (Error details)
|— Badge (Status indicators)
|— Progress (Form completion)
|— Skeleton (Loading states)
```

## 8. Data Display Components

```
Enhanced DataTable System (TanStack Table + Shadcn/UI)
|
|— DataTable Core Components
|   |— useReactTable (TanStack Table hook for state management)
|   |— Table (Shadcn base table component)
|   |— TableHeader (Column headers with sorting capabilities)
|   |— TableBody (Data rows container)
|   |— TableRow (Individual rows with selection state)
|   |— TableHead (Sortable column headers)
|   |— TableCell (Data cells with proper content alignment)
|
|— DataTable Enhanced Features
|   |— Column Sorting
|   |   |— Button (Sort toggle with visual indicators)
|   |   |— ChevronUpIcon, ChevronDownIcon (Sort direction icons)
|   |   |— Multi-column sorting support
|   |
|   |— Column Filtering & Search
|   |   |— Input (Global search with search icon)
|   |   |— Popover (Advanced filter dropdown)
|   |   |— Checkbox (Multi-select filters)
|   |   |— Custom filter functions for complex data
|   |
|   |— Column Visibility
|   |   |— DropdownMenu (Column toggle menu)
|   |   |— DropdownMenuCheckboxItem (Show/hide individual columns)
|   |   |— Persistent column preferences
|   |
|   |— Row Selection
|   |   |— Checkbox (Row and header selection checkboxes)
|   |   |— Bulk action support
|   |   |— Selection state management
|   |
|   |— Advanced Pagination
|   |   |— Pagination (Enhanced pagination component)
|   |   |— Select (Rows per page selector)
|   |   |— Button (First, Previous, Next, Last navigation)
|   |   |— Typography (Page information display)
|   |   |— Custom page size options (5, 10, 25, 50, 100)
|
|— DataTable Action Components  
|   |— Row Actions
|   |   |— DropdownMenu (Three dots menu for each row)
|   |   |— DropdownMenuTrigger (EllipsisIcon button)
|   |   |— DropdownMenuContent (Action options)
|   |   |— DropdownMenuItem (Edit, View, Delete, etc.)
|   |   |— DropdownMenuSeparator (Visual grouping)
|   |
|   |— Bulk Actions
|   |   |— AlertDialog (Bulk delete confirmation)
|   |   |— Button (Bulk operation triggers)
|   |   |— Badge (Selection count indicator)
|   |
|   |— Data Export
|   |   |— Button (Export selected/all data)
|   |   |— Select (Export format options)
|   |   |— Progress (Export progress indicator)
|
|— DataTable State Management
|   |— Sorting State (SortingState from TanStack Table)
|   |— Filter State (ColumnFiltersState)
|   |— Visibility State (VisibilityState) 
|   |— Selection State (RowSelectionState)
|   |— Pagination State (PaginationState)
|
|— DataTable Responsive Design
|   |— Mobile Table Adaptation
|   |   |— Horizontal scroll for wide tables
|   |   |— Essential columns prioritized
|   |   |— Action menu accessible on mobile
|   |
|   |— Loading & Empty States
|   |   |— Skeleton (Loading state placeholders)
|   |   |— EmptyState (No data illustration)
|   |   |— Typography (Helper messages)
|   |   |— Button (Call-to-action for empty states)

Basic Table Components (for simple displays)
|
|— Table (Simple data display without advanced features)
|   |— TableHeader (Basic column headers)
|   |— TableBody (Simple data rows)
|   |— TableRow (Basic table rows)
|   |— TableHead (Simple column headers)
|   |— TableCell (Basic data cells)
|   |— Simple pagination with Pagination component

Cards & Content Structure
|
|— Card (Content containers)
|   |— CardHeader (Card titles)
|   |— CardTitle (Main headings)
|   |— CardDescription (Subtitles)
|   |— CardContent (Main content)
|   |— CardFooter (Action areas)

Media & Assets Structure
|
|— Avatar (Profile images, thumbnails)
|   |— AvatarImage (Image component)
|   |— AvatarFallback (Placeholder content)
|
|— AspectRatio (Image aspect ratios)
```

## 9. Feedback & Status Components

```
Loading States
|
|— Skeleton (Content placeholders)
|— Spinner (Loading indicators)
|— Progress (Progress bars)

Messages & Alerts
|
|— Alert (Status messages)
|   |— AlertDescription (Message content)
|
|— Toast (Notification messages)
|   |— ToastAction (Toast actions)
|
|— Badge (Status indicators)
|— Label (Content labels)

Icons from lucide-react
|
|— Success & Status Icons
|   |— CheckCircle (Success states)
|   |— AlertTriangle (Warnings)
|   |— XCircle (Errors)
|
|— Action Icons
|   |— Eye (View actions)
|   |— Edit (Edit actions)
|   |— Trash (Delete actions)
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
