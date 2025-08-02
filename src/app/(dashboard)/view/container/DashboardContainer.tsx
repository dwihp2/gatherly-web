/**
 * Dashboard Container Component
 * Location: app/(dashboard)/view/container/DashboardContainer.tsx
 * 
 * Main container for the authenticated organizer dashboard
 * Orchestrates all dashboard sections and data fetching
 */
'use client'

import { useAuth } from '../../../(auth)/hooks/useAuth'
import { Skeleton } from '@/components/ui/skeleton'
import { useRouter } from 'next/navigation'
import { DashboardHeader } from '../presentation/DashboardHeader'
import { MyEventsSection } from '../presentation/MyEventsSection'
import { QuickTipsSection } from '../presentation/QuickTipsSection'
import { RecentActivitySection } from '../presentation/RecentActivitySection'
import { SummaryCards } from '../presentation/SummaryCards'

export function DashboardContainer() {
  const { user, organizationName, isLoading, organizationId } = useAuth()
  console.log("🚀 ~ DashboardContainer ~ user:", {
    user,
    organizationName,
    isLoading,
    organizationId
  })
  const router = useRouter()

  // Redirect to sign-in if not authenticated
  if (!isLoading && !user) {
    router.push('/sign-in')
    return null
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 space-y-8">
        <div className="space-y-4">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Dashboard Header */}
      <DashboardHeader
        organizerName={user?.name || 'Organizer'}
        organizationName={organizationName}
      />

      {/* Summary Cards Section */}
      <SummaryCards />

      {/* My Events Section */}
      <MyEventsSection />

      {/* Bottom Grid: Recent Activity + Quick Tips */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <RecentActivitySection />
        </div>
        <div className="lg:col-span-1">
          <QuickTipsSection />
        </div>
      </div>
    </div>
  )
}
