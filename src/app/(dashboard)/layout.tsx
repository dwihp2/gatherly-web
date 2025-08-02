/**
 * Dashboard Layout
 * Location: app/(dashboard)/layout.tsx
 */
'use client'

import { useRequireAuth } from '../(auth)/hooks/useAuth'
import { Sidebar } from './view/presentation/Sidebar'
import { DashboardTopHeader } from './view/presentation/DashboardTopHeader'
import { CreateEventModalContainer } from '../events/view/container/CreateEventModalContainer'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { cn } from '@/lib/utils'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated, isLoading, isReady } = useRequireAuth()
  const router = useRouter()

  useEffect(() => {
    if (isReady && !isAuthenticated) {
      router.push('/sign-in')
    }
  }, [isAuthenticated, isReady, router])

  if (isLoading || !isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Will redirect
  }

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <DashboardTopHeader />

        {/* Main Content */}
        <main className={cn(
          "flex-1 overflow-auto p-4 md:p-6 lg:p-8",
          "transition-all duration-300"
        )}>
          {children}
        </main>
      </div>

      {/* Global Modals */}
      <CreateEventModalContainer />
    </div>
  )
}
