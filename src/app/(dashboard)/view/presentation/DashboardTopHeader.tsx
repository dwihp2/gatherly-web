/**
 * Dashboard Top Header Component
 * Location: app/(dashboard)/view/presentation/DashboardTopHeader.tsx
 * 
 * Top header for dashboard with search, notifications, and profile
 */
'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Bell,
  Search,
  Settings,
  User,
  CreditCard,
  HelpCircle,
  LogOut,
  Building
} from 'lucide-react'
import { MobileSidebar } from './MobileSidebar'
import { useAuth } from '../../../(auth)/hooks/useAuth'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'

export function DashboardTopHeader() {
  const { user, organizationName, signOut } = useAuth()

  const handleSignOut = async () => {
    try {
      await signOut()
      window.location.href = '/'
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="container mx-auto px-0 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side: Mobile Menu Trigger + Search */}
          <div className="flex items-center gap-4 flex-1">
            {/* Mobile Menu Trigger - Only on mobile */}
            <div className="md:hidden">
              <MobileSidebar />
            </div>

            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Search events, attendees..."
                className="pl-10 pr-4 w-full"
              />
            </div>
          </div>

          {/* Right side: Actions + Profile */}
          <div className="flex items-center gap-2">
            {/* Notifications */}
            <Button
              variant="ghost"
              size="sm"
              className="relative"
              aria-label="View notifications"
            >
              <Bell className="h-5 w-5" />
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
              >
                3
              </Badge>
            </Button>

            <Separator orientation='vertical' className='data-[orientation=vertical]:h-8 ml-2' />

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "flex items-center gap-2 h-10",
                    "md:px-3 px-2" // Less padding on mobile
                  )}
                >
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarFallback className="text-sm">
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  {/* Show full profile info only on desktop */}
                  <div className="hidden md:flex flex-col items-start min-w-0">
                    <span className="text-sm font-medium text-foreground truncate max-w-32">
                      {user?.name || 'User'}
                    </span>
                    <span className="text-xs text-muted-foreground truncate max-w-32">
                      {organizationName || 'Organization'}
                    </span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-64"
                align="end"
                side="bottom"
                sideOffset={8}
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
        </div>
      </div>
    </header>
  )
}
