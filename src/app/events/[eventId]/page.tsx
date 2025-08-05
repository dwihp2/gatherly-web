/**
 * Public Event Detail Page
 * Location: app/events/[eventId]/page.tsx
 * 
 * Public-facing event detail page for customers to view event information
 */

import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { EventDetailContainer } from './view/container/EventDetailContainer'
import { Skeleton } from '@/components/ui/skeleton'

interface EventDetailPageProps {
  params: Promise<{
    eventId: string
  }>
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { eventId } = await params

  // Basic validation
  if (!eventId) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<EventDetailSkeleton />}>
        <EventDetailContainer eventId={eventId} />
      </Suspense>
    </div>
  )
}

function EventDetailSkeleton() {
  return (
    <div className="container mx-auto py-4 space-y-8">
      {/* Header skeleton */}
      <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex gap-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Skeleton className="h-64 w-full rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
        <div className="space-y-6">
          <Skeleton className="h-48 w-full rounded-lg" />
        </div>
      </div>
    </div>
  )
}
