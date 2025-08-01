/**
 * Authentication hooks for Better Auth integration
 * Location: app/(auth)/hooks/useAuth.ts
 */
'use client'

import { useEffect } from 'react'
import { useAuthStore } from '../stores/authStore'

export function useAuth() {
  const {
    user,
    session,
    isAuthenticated,
    isLoading,
    hasInitialized,
    initializeAuth,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updateUser,
    setLoading,
  } = useAuthStore()

  // Initialize auth on mount - but only if we haven't initialized yet
  useEffect(() => {
    if (!hasInitialized && !isLoading) {
      initializeAuth()
    }
  }, [hasInitialized, isLoading, initializeAuth])

  return {
    // State
    user,
    session,
    isAuthenticated,
    isLoading,
    
    // Actions
    signIn,
    signUp,
    signOut,
    resetPassword,
    updateUser,
    setLoading,
    
    // Organization info (from user)
    organizationId: user?.tenantId,
    organizationName: user?.organizationName,
  }
}

// Hook for protected routes
export function useRequireAuth() {
  const { isAuthenticated, isLoading, user } = useAuth()

  return {
    isAuthenticated,
    isLoading,
    user,
    isReady: !isLoading,
  }
}
