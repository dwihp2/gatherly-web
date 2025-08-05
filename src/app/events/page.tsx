/**
 * Events Management Page
 * Location: app/events/page.tsx
 * 
 * This page serves as the events management interface for authenticated users.
 * It displays the user's events and provides management functionality.
 */
'use client'

import { Suspense } from 'react'
import { EventsPageContainer } from './view/container/EventsPageContainer'
import { Skeleton } from '@/components/ui/skeleton'

interface EventsPageProps {
  searchParams: Promise<{
    status?: string
    search?: string
    page?: string
  }>
}

export default function EventsPage(props: EventsPageProps) {
  return (
    <Suspense fallback={<EventsPageSkeleton />}>
      <EventsPageContent searchParams={props.searchParams} />
    </Suspense>
  )
}

function EventsPageContent({ searchParams }: EventsPageProps) {
  return <EventsPageContainer searchParams={searchParams} />
}

function EventsPageSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-7xl mx-auto py-4">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-96" />
            </div>
            <Skeleton className="h-10 w-32" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-64" />
              <Skeleton className="h-10 w-32" />
            </div>
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
