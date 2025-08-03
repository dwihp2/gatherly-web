/**
 * Authentication store using Zustand with Better Auth integration
 * Location: app/(auth)/stores/authStore.ts
 */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { authClient } from '@/lib/auth-client'
import type {
  AuthState,
  AuthActions,
  SignInInput,
  SignUpInput,
  User
} from '../models/interfaces/auth'

interface AuthStore extends AuthState, AuthActions { }

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      session: null,
      isAuthenticated: false,
      isLoading: false,
      hasInitialized: false,

      // Actions
      signIn: async (credentials: SignInInput) => {
        set({ isLoading: true })
        try {
          const { data, error } = await authClient.signIn.email({
            email: credentials.email,
            password: credentials.password,
          })

          if (error) {
            set({ isLoading: false })
            throw new Error(error.message || 'Sign in failed')
          }

          if (data?.user) {
            // Get current session to check for active organization
            const sessionData = await authClient.getSession()

            // Get organization info from active organization ID
            let organizationName = null
            const tenantId = sessionData.data?.session?.activeOrganizationId || null

            if (tenantId) {
              try {
                const orgData = await authClient.organization.getFullOrganization({
                  query: {
                    organizationId: tenantId,
                  }
                })

                if (orgData.data) {
                  organizationName = orgData.data.name
                }
              } catch (error) {
                console.error('Failed to fetch organization details:', error)
                // Continue without organization name if fetch fails
              }
            }

            const user: User = {
              id: data.user.id,
              name: data.user.name || null,
              tenantId,
              organizationName,
              email: data.user.email,
              isEmailVerified: data.user.emailVerified || false,
              createdAt: data.user.createdAt,
              updatedAt: data.user.updatedAt,
            }

            const session = {
              user,
              expires: sessionData.data?.session?.expiresAt || new Date(Date.now() + 24 * 60 * 60 * 1000),
            }

            set({
              user,
              session,
              isAuthenticated: true,
              isLoading: false,
            })
          } else {
            set({ isLoading: false })
            throw new Error('Sign in failed')
          }
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },

      signUp: async (userData: SignUpInput) => {
        set({ isLoading: true })
        try {
          // First, sign up the user
          const { data: authData, error: authError } = await authClient.signUp.email({
            email: userData.email,
            password: userData.password,
            name: userData.organizationName, // Use organization name as user name for now
          })

          if (authError || !authData?.user) {
            set({ isLoading: false })
            throw new Error(authError?.message || 'Sign up failed')
          }

          // Then create an organization for the user
          const { data: orgData, error: orgError } = await authClient.organization.create({
            name: userData.organizationName,
            slug: userData.organizationName.toLowerCase().replace(/\s+/g, '-'),
          })

          if (orgError) {
            set({ isLoading: false })
            throw new Error(orgError.message || 'Failed to create organization')
          }

          // Set the newly created organization as active
          if (orgData?.id) {
            await authClient.organization.setActive({
              organizationId: orgData.id
            })
          }

          // Get the updated session with organization
          const sessionData = await authClient.getSession()

          if (sessionData.data?.user && sessionData.data?.session) {
            const user: User = {
              id: sessionData.data.user.id,
              name: sessionData.data.user.name || null,
              tenantId: orgData?.id || null,
              organizationName: orgData?.name || userData.organizationName,
              email: sessionData.data.user.email,
              isEmailVerified: sessionData.data.user.emailVerified || false,
              createdAt: sessionData.data.user.createdAt,
              updatedAt: sessionData.data.user.updatedAt,
            }

            const session = {
              user,
              expires: sessionData.data.session.expiresAt,
            }

            set({
              user,
              session,
              isAuthenticated: true,
              isLoading: false,
            })
          } else {
            set({ isLoading: false })
          }
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },

      signOut: async () => {
        set({ isLoading: true })
        try {
          await authClient.signOut()
          set({
            user: null,
            session: null,
            isAuthenticated: false,
            isLoading: false,
            hasInitialized: false, // Reset initialization flag on sign out
          })
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },

      resetPassword: async (email: string) => {
        set({ isLoading: true })
        try {
          // TODO: Implement password reset with Better Auth
          // await authClient.forgetPassword({ email })
          console.log('Reset password for:', email)
          set({ isLoading: false })
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },

      updateUser: async (updates: Partial<User>) => {
        const currentUser = get().user
        if (!currentUser) return

        set({ isLoading: true })
        try {
          // TODO: Implement user update with Better Auth
          const updatedUser = { ...currentUser, ...updates, updatedAt: new Date() }
          set({
            user: updatedUser,
            session: get().session ? { ...get().session!, user: updatedUser } : null,
            isLoading: false,
          })
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading })
      },

      // Initialize auth state from Better Auth session
      initializeAuth: async () => {
        // Prevent multiple simultaneous initialization attempts
        const currentState = get()
        if (currentState.isLoading || currentState.hasInitialized) {
          return
        }

        set({ isLoading: true, hasInitialized: true })
        try {
          const sessionData = await authClient.getSession()

          if (sessionData.data?.user && sessionData.data?.session) {
            // Get organization info from active organization ID
            let organizationName = null
            const tenantId = sessionData.data.session.activeOrganizationId || null

            if (tenantId) {
              try {
                const orgData = await authClient.organization.getFullOrganization({
                  query: {
                    organizationId: tenantId,
                  }
                })

                if (orgData.data) {
                  organizationName = orgData.data.name
                }
              } catch (error) {
                console.error('Failed to fetch organization details:', error)
                // Continue without organization name if fetch fails
              }
            }

            const user: User = {
              id: sessionData.data.user.id,
              tenantId,
              organizationName,
              email: sessionData.data.user.email,
              name: sessionData.data.user.name || null,
              isEmailVerified: sessionData.data.user.emailVerified || false,
              createdAt: sessionData.data.user.createdAt,
              updatedAt: sessionData.data.user.updatedAt,
            }

            const session = {
              user,
              expires: sessionData.data.session.expiresAt,
            }

            set({
              user,
              session,
              isAuthenticated: true,
              isLoading: false,
            })
          } else {
            set({
              user: null,
              session: null,
              isAuthenticated: false,
              isLoading: false,
            })
          }
        } catch (error) {
          console.error('Failed to initialize auth:', error)
          set({
            user: null,
            session: null,
            isAuthenticated: false,
            isLoading: false,
          })
        }
      },
    }),
    {
      name: 'gatherly-auth-storage',
      partialize: (state) => ({
        user: state.user,
        session: state.session,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
