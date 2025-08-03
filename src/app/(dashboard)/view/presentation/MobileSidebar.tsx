/**
 * Mobile Sidebar Component
 * Location: app/(dashboard)/view/presentation/MobileSidebar.tsx
 * 
 * Mobile off-canvas sidebar navigation using Sheet component
 */
'use client'

import { Menu } from 'lucide-react'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Sidebar } from './Sidebar'
import { useSidebarStore } from '../../stores/sidebarStore'

export function MobileSidebar() {
  const { isMobileOpen, setMobileOpen } = useSidebarStore()

  // Close sidebar on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileOpen) {
        setMobileOpen(false)
      }
    }

    if (isMobileOpen) {
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMobileOpen, setMobileOpen])

  return (
    <Sheet open={isMobileOpen} onOpenChange={setMobileOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden h-8 w-8 p-0"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="p-0 w-64"
        onInteractOutside={() => setMobileOpen(false)}
      >
        <Sidebar className="border-r-0" hideCollapseBtn={true} />
      </SheetContent>
    </Sheet>
  )
}
