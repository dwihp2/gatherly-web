/**
 * Dashboard Events Page
 * Location: app/(dashboard)/events/page.tsx
 * 
 * Main events listing page with filtering capabilities
 */

import { Suspense } from 'react'
import { EventsPageContainer } from './view/container/EventsPageContainer'
import { Skeleton } from '@/components/ui/skeleton'

interface EventsPageProps {
  searchParams: Promise<{
    status?: 'published' | 'draft' | 'cancelled'
    search?: string
    page?: string
  }>
}

export default async function EventsPage({ searchParams }: EventsPageProps) {
  const params = await searchParams

  return (
    <div className="container mx-auto py-4">
      <Suspense fallback={<EventsPageSkeleton />}>
        <EventsPageContainer
          status={params.status}
          search={params.search}
          page={parseInt(params.page || '1')}
        />
      </Suspense>
    </div>
  )
}

function EventsPageSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-10 w-40" />
      </div>
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    </div>
  )
}
