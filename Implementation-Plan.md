# Gatherly Shadcn/UI Component Mapping
*Component recommendations for each UI element in the UX Structure Plan*

## 1. Navigation & Layout Components

```
Top Navigation Bar
|
|— NavigationMenu (Main navigation structure)
|— Avatar (User profile display)
|— DropdownMenu (Profile dropdown, notifications)
|— Badge (Notification count)
|— Breadcrumb (Navigation breadcrumbs)
|— Button (Action buttons - Sign In, Sign Up)

Page Layout
|
|— Container (Page wrapper)
|— Grid (Layout structure)
|— Flex (Flexible layouts)
|— Separator (Visual dividers)
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
|   |— CardHeader (Section title and filters)
|   |   |— Select (Filter dropdown)
|   |
|   |— Events Table
|   |   |— Table (Events data display)
|   |   |— TableHeader (Column headers)
|   |   |— TableBody (Data rows)
|   |   |— TableRow (Individual event rows)
|   |   |— TableCell (Data cells)
|   |   |— Avatar (Event poster thumbnails)
|   |   |— Badge (Status badges)
|   |   |— Progress (Ticket sales progress)
|   |   |— Button (Action buttons)
|   |   |— DropdownMenu (Action menu)
|   |   |   |— DropdownMenuContent (Action options)
|   |   |   |— DropdownMenuItem (Individual actions)
|   |   |
|   |   |— Empty State
|   |       |— Card (Empty state container)
|   |       |— Typography (Empty message)
|   |       |— Button (Create first event CTA)

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
Tables & Lists Structure
|
|— Table (Data tables)
|   |— TableHeader (Table headers)
|   |— TableBody (Table content)
|   |— TableRow (Table rows)
|   |— TableHead (Column headers)
|   |— TableCell (Data cells)
|   |— DataTable (Enhanced table with sorting/filtering)
|   |— Pagination (Table pagination)

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

## 10. Layout & Responsive Components

```
Responsive Design Structure
|
|— Grid (Responsive grid layouts)
|— Flex (Flexible layouts)
|— Container (Content containers)
|— AspectRatio (Responsive media)
|— ScrollArea (Scrollable content)

Navigation Structure
|
|— NavigationMenu (Main navigation)
|   |— NavigationMenuList (Menu items)
|   |— NavigationMenuItem (Individual items)
|   |— NavigationMenuContent (Dropdown content)
|   |— NavigationMenuLink (Menu links)
|
|— Breadcrumb (Page navigation)
    |— BreadcrumbList (Breadcrumb items)
    |— BreadcrumbItem (Individual crumbs)
    |— BreadcrumbLink (Breadcrumb links)
    |— BreadcrumbSeparator (Visual separators)
```

This component mapping provides a comprehensive guide for implementing the UX Structure Plan using Shadcn/UI components, ensuring consistency and accessibility across the Gatherly platform.
