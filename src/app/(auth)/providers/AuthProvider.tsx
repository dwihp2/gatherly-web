/**
 * Authentication Provider for Better Auth integration
 * Location: app/(auth)/providers/AuthProvider.tsx
 */
'use client'

import { useEffect, ReactNode } from 'react'
import { useAuthStore } from '../stores/authStore'

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const initializeAuth = useAuthStore((state) => state.initializeAuth)
  const isLoading = useAuthStore((state) => state.isLoading)

  useEffect(() => {
    // Initialize auth state on app load
    initializeAuth()
  }, [initializeAuth])

  // Show loading state while initializing
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return <>{children}</>
}
