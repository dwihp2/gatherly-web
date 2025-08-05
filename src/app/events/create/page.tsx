/**
 * Create Event Page - Dedicated full-page event creation
 * Location: app/events/create/page.tsx
 */
'use client'

import { Suspense } from 'react'
import { CreateEventPageContainer } from '../view/container/CreateEventPageContainer'
import { Skeleton } from '@/components/ui/skeleton'

export default function CreateEventPage() {
  return (
    <Suspense fallback={<CreateEventPageSkeleton />}>
      <CreateEventPageContainer />
    </Suspense>
  )
}

function CreateEventPageSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto py-4">
        <div className="space-y-6">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-32 w-full" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
