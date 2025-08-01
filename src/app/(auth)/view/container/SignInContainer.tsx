'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { SignInForm } from '../presentation/SignInForm'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useAuthStore } from '../../stores/authStore'
import { SignInSchema, type SignInInput } from '../../models/interfaces/auth'
import { toast } from 'sonner'

export function SignInContainer() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'
  const signIn = useAuthStore((state) => state.signIn)
  const isLoading = useAuthStore((state) => state.isLoading)
  
  const form = useForm<SignInInput>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: SignInInput) => {
    try {
      await signIn(data)
      toast.success('Welcome back! Redirecting...')
      router.push(callbackUrl)
    } catch (error) {
      toast.error('Sign in failed. Please check your credentials.')
      console.error('Sign in error:', error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-block">
            <h1 className="text-2xl font-bold text-primary">Gatherly</h1>
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Welcome back!
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your Event Organizer account
          </p>
        </div>

        {/* Main Sign In Card */}
        <Card className="w-full">
          <CardHeader className="space-y-1">
            <div className="text-center">
              <h3 className="text-xl font-semibold">Sign In</h3>
              <p className="text-sm text-muted-foreground">
                Enter your credentials below
              </p>
            </div>
          </CardHeader>
          
          <CardContent>
            <SignInForm 
              form={form}
              onSubmit={onSubmit}
              isLoading={isLoading}
            />
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Separator />
            <div className="text-center text-sm">
              <span className="text-muted-foreground">Don&apos;t have an account? </span>
              <Link 
                href={`/sign-up${callbackUrl !== '/dashboard' ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : ''}`}
                className="font-medium text-primary hover:text-primary/80"
              >
                Sign up here
              </Link>
            </div>
          </CardFooter>
        </Card>

        {/* Social Proof */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            Trusted by 1000+ event organizers in Indonesia
          </p>
        </div>

        {/* Footer Links */}
        <div className="text-center text-xs text-gray-500 space-x-4">
          <Link href="/privacy" className="hover:text-gray-700">
            Privacy Policy
          </Link>
          <span>•</span>
          <Link href="/terms" className="hover:text-gray-700">
            Terms of Service
          </Link>
        </div>
      </div>
    </div>
  )
}
