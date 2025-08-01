/**
 * Dashboard Page
 * Location: app/(dashboard)/dashboard/page.tsx
 */
'use client'

import { useAuth } from '../../(auth)/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const { user, signOut, organizationName } = useAuth()
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      await signOut()
      // Redirect to homepage after successful sign-out
      router.push('/')
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Welcome to Gatherly!</h1>
          <p className="text-gray-600 mt-2">
            {organizationName ? `Managing ${organizationName}` : 'Your dashboard'}
          </p>
        </div>
        <Button onClick={handleSignOut} variant="outline">
          Sign Out
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">User Info</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p><strong>Email:</strong> {user?.email}</p>
              <p><strong>Organization:</strong> {organizationName || 'No organization'}</p>
              <p><strong>Verified:</strong> {user?.isEmailVerified ? 'Yes' : 'No'}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Quick Actions</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button className="w-full" variant="outline">
                Create Event
              </Button>
              <Button className="w-full" variant="outline">
                View Events
              </Button>
              <Button className="w-full" variant="outline">
                Analytics
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Better Auth Status</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-green-600">✅ Authentication working</p>
              <p className="text-green-600">✅ Organization plugin active</p>
              <p className="text-blue-600">🎉 Welcome to Better Auth!</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
