import { Metadata } from 'next'
import { Suspense } from 'react'
import { SignInContainer } from '../view/container/SignInContainer'
import { Skeleton } from '@/components/ui/skeleton'

export const metadata: Metadata = {
  title: 'Sign In - Gatherly',
  description: 'Sign in to your Gatherly organizer account',
}

function SignInPageContent() {
  return <SignInContainer />
}

export default function SignInPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    }>
      <SignInPageContent />
    </Suspense>
  )
}
