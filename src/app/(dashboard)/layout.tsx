/**
 * Dashboard Layout
 * Location: app/(dashboard)/layout.tsx
 */
'use client'

import { useRequireAuth } from '../(auth)/hooks/useAuth'
import { DashboardNavigation } from './view/presentation/DashboardNavigation'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

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
    <div className="min-h-screen bg-gray-50">
      <DashboardNavigation />
      {children}
    </div>
  )
}
