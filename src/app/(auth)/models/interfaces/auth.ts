import { z } from 'zod'

export const SignInSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export const SignUpSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  confirmPassword: z.string(),
  organizationName: z.string().min(1, 'Organization name is required').max(100),
  agreeToTerms: z.boolean().refine(val => val === true, 'You must agree to the terms and conditions'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export const ResetPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

export const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().nullable(),
  email: z.string().email(),
  tenantId: z.string().uuid().nullable(),
  organizationName: z.string().nullable(),
  isEmailVerified: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type SignInInput = z.infer<typeof SignInSchema>
export type SignUpInput = z.infer<typeof SignUpSchema>
export type ResetPasswordInput = z.infer<typeof ResetPasswordSchema>
export type User = z.infer<typeof UserSchema>

// Additional auth types for store
export const userRoleEnum = z.enum(['organizer', 'admin'])
export type UserRole = z.infer<typeof userRoleEnum>

export const SessionSchema = z.object({
  user: UserSchema,
  expires: z.date(),
})

export type Session = z.infer<typeof SessionSchema>

// Auth state and actions for store
export interface AuthState {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  hasInitialized: boolean; // Track if we've already tried to initialize
}

export interface AuthActions {
  signIn: (credentials: SignInInput) => Promise<void>;
  signUp: (userData: SignUpInput) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<void>;
  setLoading: (loading: boolean) => void;
  initializeAuth: () => Promise<void>;
}
