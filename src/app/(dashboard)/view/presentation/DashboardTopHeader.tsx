/**
 * Dashboard Top Header Component
 * Location: app/(dashboard)/view/presentation/DashboardTopHeader.tsx
 * 
 * Top header for dashboard with mobile sidebar trigger and notifications
 */
'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Bell } from 'lucide-react'
import { MobileSidebar } from './MobileSidebar'

export function DashboardTopHeader() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40 md:hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Mobile Menu Trigger */}
          <MobileSidebar />

          {/* Right side: Notifications */}
          <div className="flex items-center">
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
          </div>
        </div>
      </div>
    </header>
  )
}
