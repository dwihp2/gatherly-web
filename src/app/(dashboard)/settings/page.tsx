/**
 * Settings Dashboard Page
 * Location: app/(dashboard)/settings/page.tsx
 * 
 * Main settings page with overview and navigation to sub-settings
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  User,
  Building,
  CreditCard,
  Shield,
  Bell,
  Palette,
  ArrowRight,
  CheckCircle,
  AlertTriangle
} from 'lucide-react'
import Link from 'next/link'

export default function SettingsPage() {
  return (
    <div className="container mx-auto py-4 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account and organization preferences
          </p>
        </div>
      </div>

      {/* Quick Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Account Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Badge variant="default" className="bg-green-600">
                Active
              </Badge>
              <p className="text-sm text-muted-foreground">
                Profile complete and verified
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5 text-blue-600" />
              Organization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="font-medium">Gatherly Events Co.</p>
              <p className="text-sm text-muted-foreground">
                3 team members
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-purple-600" />
              Billing Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Badge variant="outline">
                Pro Plan
              </Badge>
              <p className="text-sm text-muted-foreground">
                Next billing: Mar 15, 2025
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Settings Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Profile Settings</h3>
                <p className="text-sm text-muted-foreground">
                  Manage your personal information and preferences
                </p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>Profile completeness</span>
                <Badge variant="default">100%</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Two-factor authentication</span>
                <Badge variant="outline">Enabled</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Email verification</span>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
            </div>
            <Link href="/dashboard/settings/profile">
              <Button className="w-full mt-4" variant="outline">
                Manage Profile
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <Building className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Organization Settings</h3>
                <p className="text-sm text-muted-foreground">
                  Configure your organization details and team
                </p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>Organization name</span>
                <span className="font-medium">Gatherly Events Co.</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Team members</span>
                <span className="font-medium">3 active</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Custom branding</span>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
            </div>
            <Link href="/dashboard/settings/organization">
              <Button className="w-full mt-4" variant="outline">
                Manage Organization
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Billing & Subscription</h3>
                <p className="text-sm text-muted-foreground">
                  Manage your subscription and payment methods
                </p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>Current plan</span>
                <Badge variant="default">Pro Plan</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Monthly usage</span>
                <span className="font-medium">847 / 1000 tickets</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Next payment</span>
                <span className="font-medium">Mar 15, 2025</span>
              </div>
            </div>
            <Link href="/dashboard/settings/billing">
              <Button className="w-full mt-4" variant="outline">
                Manage Billing
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Security & Privacy</h3>
                <p className="text-sm text-muted-foreground">
                  Security settings and privacy controls
                </p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>Two-factor auth</span>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Login sessions</span>
                <span className="font-medium">2 active</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Data export</span>
                <Button size="sm" variant="ghost" className="h-6 px-2 text-xs">
                  Download
                </Button>
              </div>
            </div>
            <Link href="/dashboard/settings/security">
              <Button className="w-full mt-4" variant="outline">
                Security Settings
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Additional Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Settings</CardTitle>
          <p className="text-sm text-muted-foreground">
            Other preferences and configurations
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="font-medium">Notifications</p>
                  <p className="text-sm text-muted-foreground">Email and push preferences</p>
                </div>
              </div>
              <Link href="/dashboard/settings/notifications">
                <Button variant="ghost" size="sm">
                  Configure
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <Palette className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="font-medium">Appearance</p>
                  <p className="text-sm text-muted-foreground">Theme and display settings</p>
                </div>
              </div>
              <Link href="/dashboard/settings/appearance">
                <Button variant="ghost" size="sm">
                  Customize
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle>System Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium">All systems operational</p>
                <p className="text-sm text-muted-foreground">Last updated: 2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium">Payment processing</p>
                <p className="text-sm text-muted-foreground">Normal response times</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="font-medium">Scheduled maintenance</p>
                <p className="text-sm text-muted-foreground">Mar 10, 2025 at 2:00 AM</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
