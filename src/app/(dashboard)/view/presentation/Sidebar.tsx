/**
 * Sidebar Navigation Component
 * Location: app/(dashboard)/view/presentation/Sidebar.tsx
 * 
 * Main sidebar navigation for authenticated dashboard users
 */
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Separator } from '@/components/ui/separator'
import {
  Home,
  Calendar,
  Plus,
  BarChart,
  QrCode,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronDown,
  Building,
  User,
  CreditCard,
  LogOut,
  ChevronRight
} from 'lucide-react'
import { useAuth } from '../../../(auth)/hooks/useAuth'
import { useSidebarStore } from '../../stores/sidebarStore'
import { useEventFormStore } from '../../../events/stores/eventFormStore'
import { cn } from '@/lib/utils'

interface SidebarProps {
  className?: string
}

interface NavItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  href?: string
  onClick?: () => void
  badge?: string | number
  variant?: 'default' | 'primary'
  submenu?: NavItem[]
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const { user, organizationName, signOut } = useAuth()
  const {
    isCollapsed,
    expandedMenus,
    toggleCollapsed,
    toggleSubmenu
  } = useSidebarStore()
  const { openCreateModal } = useEventFormStore()

  const handleCreateEvent = () => {
    openCreateModal()
  }

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + B to toggle sidebar
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault()
        toggleCollapsed()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [toggleCollapsed])

  const handleSignOut = async () => {
    try {
      await signOut()
      window.location.href = '/'
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  // Navigation items
  const navigationItems: NavItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Home,
      href: '/dashboard'
    },
    {
      id: 'events',
      label: 'My Events',
      icon: Calendar,
      href: '/dashboard/events',
      badge: '3', // TODO: Get from actual event count
      submenu: [
        { id: 'all-events', label: 'All Events', icon: Calendar, href: '/dashboard/events' },
        { id: 'published', label: 'Published', icon: Calendar, href: '/dashboard/events?status=published' },
        { id: 'draft', label: 'Draft', icon: Calendar, href: '/dashboard/events?status=draft' },
        { id: 'completed', label: 'Completed', icon: Calendar, href: '/dashboard/events?status=completed' }
      ]
    },
    {
      id: 'create',
      label: 'Create Event',
      icon: Plus,
      onClick: handleCreateEvent,
      variant: 'default' as const
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart,
      href: '/dashboard/analytics',
      submenu: [
        { id: 'revenue', label: 'Revenue Reports', icon: BarChart, href: '/dashboard/analytics/revenue' },
        { id: 'tickets', label: 'Ticket Sales', icon: BarChart, href: '/dashboard/analytics/tickets' },
        { id: 'attendees', label: 'Attendee Insights', icon: BarChart, href: '/dashboard/analytics/attendees' }
      ]
    },
    {
      id: 'scanner',
      label: 'QR Scanner',
      icon: QrCode,
      href: '/dashboard/scanner'
    }
  ]

  const secondaryItems: NavItem[] = [
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      href: '/dashboard/settings',
      submenu: [
        { id: 'profile', label: 'Profile', icon: User, href: '/dashboard/settings/profile' },
        { id: 'organization', label: 'Organization', icon: Building, href: '/dashboard/settings/organization' },
        { id: 'billing', label: 'Billing', icon: CreditCard, href: '/dashboard/settings/billing' }
      ]
    },
    {
      id: 'help',
      label: 'Help & Support',
      icon: HelpCircle,
      href: '/dashboard/help'
    }
  ]

  const renderNavItem = (item: NavItem, level = 0) => {
    const isActive = pathname === item.href || (item.submenu && item.submenu.some(sub => pathname === sub.href))
    const hasSubmenu = item.submenu && item.submenu.length > 0
    const isExpanded = expandedMenus[item.id]
    const isSubItem = level > 0

    const content = (
      <div className={cn(
        "flex items-center justify-between w-full",
        isSubItem && "ml-4"
      )}>
        <div className="flex items-center gap-3">
          <item.icon className={cn(
            "h-5 w-5 shrink-0",
            isActive ? "text-primary" : "text-muted-foreground"
          )} />
          {!isCollapsed && (
            <span className={cn(
              "text-sm font-medium transition-colors",
              isActive ? "text-primary" : "text-foreground"
            )}>
              {item.label}
            </span>
          )}
        </div>

        {!isCollapsed && (
          <div className="flex items-center gap-2">
            {item.badge && (
              <Badge variant="secondary" className="h-5 px-1.5 text-xs">
                {item.badge}
              </Badge>
            )}
            {hasSubmenu && (
              <ChevronDown className={cn(
                "h-4 w-4 transition-transform",
                isExpanded && "rotate-180"
              )} />
            )}
          </div>
        )}
      </div>
    )

    if (hasSubmenu) {
      return (
        <Collapsible
          key={item.id}
          open={isExpanded}
          onOpenChange={() => toggleSubmenu(item.id)}
        >
          <CollapsibleTrigger asChild>
            <Button
              variant={item.variant === 'primary' ? "default" : (isActive ? "secondary" : "ghost")}
              className={cn(
                "w-full justify-start h-auto py-2.5 px-3",
                item.variant === 'primary' && "!text-white"
              )}
              aria-expanded={hasSubmenu ? isExpanded : undefined}
              aria-haspopup={hasSubmenu ? "true" : undefined}
              aria-current={isActive ? "page" : undefined}
            >
              {content}
            </Button>
          </CollapsibleTrigger>
          {!isCollapsed && (
            <CollapsibleContent className="space-y-1 ml-4 mt-1">
              {item.submenu?.map(subItem => renderNavItem(subItem, level + 1))}
            </CollapsibleContent>
          )}
        </Collapsible>
      )
    }

    if (item.href) {
      return (
        <Link key={item.id} href={item.href} className="w-full">
          <Button
            variant={item.variant === 'primary' ? "default" : (isActive ? "secondary" : "ghost")}
            className={cn(
              "w-full justify-start h-auto py-2.5 px-3",
              item.variant === 'primary' && "!text-white"
            )}
            aria-current={isActive ? "page" : undefined}
          >
            {content}
          </Button>
        </Link>
      )
    }

    return (
      <Button
        key={item.id}
        variant={item.variant === 'primary' ? "default" : (isActive ? "secondary" : "ghost")}
        onClick={item.onClick}
        className={cn(
          "w-full justify-start h-auto py-2.5 px-3",
          item.variant === 'primary' && "!text-white"
        )}
        aria-current={isActive ? "page" : undefined}
      >
        {content}
      </Button>
    )
  }

  return (
    <nav
      className={cn(
        "flex flex-col h-full bg-background border-r border-border transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
        className
      )}
      aria-label="Main navigation"
      role="navigation"
    >
      {/* Header */}
      <div className="flex-shrink-0 p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className={cn(
            "flex items-center gap-2",
            isCollapsed && "justify-center"
          )}>
            <Image
              src="/gatherly-logo.png"
              alt="Gatherly"
              width={32}
              height={32}
              className="h-8 w-8 shrink-0"
            />
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="text-lg font-bold text-foreground">Gatherly</span>
                {organizationName && (
                  <span className="text-xs text-muted-foreground truncate max-w-32">
                    {organizationName}
                  </span>
                )}
              </div>
            )}
          </div>

          {!isCollapsed && (
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleCollapsed}
              className="h-8 w-8 p-0 shrink-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}
        </div>

        {isCollapsed && (
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleCollapsed}
            className="h-8 w-8 p-0 mt-2 mx-auto flex"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-hidden flex flex-col min-h-0">
        <div className="flex-1 overflow-y-auto py-4">
          <div className="px-3 space-y-1">
            {navigationItems.map(item => renderNavItem(item))}
          </div>

          <Separator className="my-4 mx-3" />

          <div className="px-3 space-y-1">
            {secondaryItems.map(item => renderNavItem(item))}
          </div>
        </div>
      </div>

      {/* Footer - User Profile */}
      <div className="flex-shrink-0 p-3 border-t border-border">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start h-auto py-2 px-2",
                isCollapsed && "justify-center px-0"
              )}
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarFallback className="text-sm">
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                {!isCollapsed && (
                  <div className="flex flex-col items-start min-w-0">
                    <span className="text-sm font-medium text-foreground truncate max-w-32">
                      {user?.name || 'User'}
                    </span>
                    <span className="text-xs text-muted-foreground truncate max-w-32">
                      {user?.email}
                    </span>
                  </div>
                )}
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-64"
            align="end"
            side={isCollapsed ? "right" : "top"}
            sideOffset={isCollapsed ? 8 : 4}
          >
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {user?.name || 'User'}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email}
                </p>
                {organizationName && (
                  <div className="flex items-center gap-1 mt-2">
                    <Building className="h-3 w-3 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">
                      {organizationName}
                    </p>
                  </div>
                )}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings/profile">
                <User className="mr-2 h-4 w-4" />
                <span>Profile Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings/billing">
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Billing</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/help">
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Help Center</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}
