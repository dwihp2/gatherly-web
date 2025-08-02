import { Suspense } from 'react'
import { SignUpContainer } from "../view/container/SignUpContainer"
import { Skeleton } from '@/components/ui/skeleton'

function SignUpPageContent() {
  return <SignUpContainer />
}

export default function SignUpPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    }>
      <SignUpPageContent />
    </Suspense>
  )
}
