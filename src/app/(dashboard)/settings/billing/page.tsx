/**
 * Billing Settings Page
 * Location: app/(dashboard)/settings/billing/page.tsx
 * 
 * Subscription and billing management
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  ArrowLeft,
  CreditCard,
  Download,
  Calendar,
  TrendingUp,
  Check,
  AlertTriangle,
  Plus
} from 'lucide-react'
import Link from 'next/link'

export default function BillingSettingsPage() {
  return (
    <div className="container mx-auto py-4 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link href="/dashboard/settings">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Settings
          </Button>
        </Link>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Billing & Subscription</h1>
          <p className="text-muted-foreground">
            Manage your subscription and payment methods
          </p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Download Invoice
        </Button>
      </div>

      {/* Current Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Current Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-2xl font-bold">Pro Plan</h3>
                <Badge variant="default">Active</Badge>
              </div>
              <p className="text-3xl font-bold text-blue-600">Rp 299,000</p>
              <p className="text-sm text-muted-foreground">per month</p>
              <Button className="mt-4" variant="outline">
                Change Plan
              </Button>
            </div>

            <div>
              <h4 className="font-medium mb-3">Usage This Month</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Tickets Sold</span>
                    <span>847 / 1,000</span>
                  </div>
                  <Progress value={84.7} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Events Created</span>
                    <span>12 / 25</span>
                  </div>
                  <Progress value={48} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Team Members</span>
                    <span>3 / 10</span>
                  </div>
                  <Progress value={30} className="h-2" />
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Billing Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Next billing date</span>
                  <span className="font-medium">Mar 15, 2025</span>
                </div>
                <div className="flex justify-between">
                  <span>Billing cycle</span>
                  <span className="font-medium">Monthly</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment method</span>
                  <span className="font-medium">•••• 4532</span>
                </div>
                <div className="flex justify-between">
                  <span>Auto-renewal</span>
                  <span className="font-medium text-green-600">Enabled</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Plans */}
      <Card>
        <CardHeader>
          <CardTitle>Available Plans</CardTitle>
          <p className="text-sm text-muted-foreground">
            Choose the plan that best fits your needs
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Starter Plan */}
            <div className="border rounded-lg p-6 relative">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold">Starter</h3>
                <p className="text-3xl font-bold mt-2">Rp 99,000</p>
                <p className="text-sm text-muted-foreground">per month</p>
              </div>

              <ul className="space-y-3 text-sm mb-6">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>Up to 250 tickets/month</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>5 events/month</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>2 team members</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>Basic analytics</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>Email support</span>
                </li>
              </ul>

              <Button variant="outline" className="w-full">
                Downgrade to Starter
              </Button>
            </div>

            {/* Pro Plan - Current */}
            <div className="border-2 border-blue-500 rounded-lg p-6 relative">
              <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-600">
                Current Plan
              </Badge>

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold">Pro</h3>
                <p className="text-3xl font-bold mt-2 text-blue-600">Rp 299,000</p>
                <p className="text-sm text-muted-foreground">per month</p>
              </div>

              <ul className="space-y-3 text-sm mb-6">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>Up to 1,000 tickets/month</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>25 events/month</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>10 team members</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>Advanced analytics</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>Custom branding</span>
                </li>
              </ul>

              <Button className="w-full" disabled>
                Current Plan
              </Button>
            </div>

            {/* Enterprise Plan */}
            <div className="border rounded-lg p-6 relative">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold">Enterprise</h3>
                <p className="text-3xl font-bold mt-2">Rp 799,000</p>
                <p className="text-sm text-muted-foreground">per month</p>
              </div>

              <ul className="space-y-3 text-sm mb-6">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>Unlimited tickets</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>Unlimited events</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>Unlimited team members</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>Premium analytics</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>24/7 phone support</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>White-label solution</span>
                </li>
              </ul>

              <Button className="w-full">
                Upgrade to Enterprise
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Payment Methods</CardTitle>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Payment Method
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center text-white text-xs font-bold">
                  VISA
                </div>
                <div>
                  <p className="font-medium">•••• •••• •••• 4532</p>
                  <p className="text-sm text-muted-foreground">Expires 12/2027</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="default">Primary</Badge>
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-8 bg-gradient-to-r from-red-600 to-orange-600 rounded flex items-center justify-center text-white text-xs font-bold">
                  MC
                </div>
                <div>
                  <p className="font-medium">•••• •••• •••• 8765</p>
                  <p className="text-sm text-muted-foreground">Expires 08/2026</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  Set Primary
                </Button>
                <Button variant="ghost" size="sm">
                  Remove
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Billing History
            </CardTitle>
            <Button variant="outline">
              View All Invoices
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                date: "Feb 15, 2025",
                amount: 299000,
                status: "paid",
                invoice: "INV-2025-002",
                period: "Feb 15 - Mar 15, 2025"
              },
              {
                date: "Jan 15, 2025",
                amount: 299000,
                status: "paid",
                invoice: "INV-2025-001",
                period: "Jan 15 - Feb 15, 2025"
              },
              {
                date: "Dec 15, 2024",
                amount: 299000,
                status: "paid",
                invoice: "INV-2024-012",
                period: "Dec 15, 2024 - Jan 15, 2025"
              },
              {
                date: "Nov 15, 2024",
                amount: 299000,
                status: "paid",
                invoice: "INV-2024-011",
                period: "Nov 15 - Dec 15, 2024"
              }
            ].map((invoice, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="font-medium">{invoice.invoice}</p>
                    <p className="text-sm text-muted-foreground">
                      {invoice.period}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-medium">
                      {new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                        minimumFractionDigits: 0,
                      }).format(invoice.amount)}
                    </p>
                    <p className="text-sm text-muted-foreground">{invoice.date}</p>
                  </div>
                  <Badge variant="default" className="bg-green-600">
                    Paid
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Billing Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            Usage Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-medium text-orange-800 dark:text-orange-200">
                  Approaching ticket limit
                </h4>
                <p className="text-sm text-orange-700 dark:text-orange-300">
                  You&apos;ve used 847 out of 1,000 tickets this month. Consider upgrading your plan.
                </p>
              </div>
              <Button size="sm" variant="outline">
                Upgrade Plan
              </Button>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Set up billing alerts</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Get notified when you reach certain usage thresholds
              </p>
              <Button size="sm" variant="outline">
                Configure Alerts
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
