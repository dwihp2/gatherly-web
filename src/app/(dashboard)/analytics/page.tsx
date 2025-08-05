/**
 * Analytics Dashboard Page
 * Location: app/(dashboard)/analytics/page.tsx
 * 
 * Main analytics overview page
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'
import Link from 'next/link'

export default function AnalyticsPage() {
  return (
    <div className="container 4 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Track your event performance and insights
          </p>
        </div>
        <Button variant="outline">
          Export Report
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp 45,231,000</div>
            <div className="flex items-center text-xs text-green-600">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +20.1% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tickets Sold</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,350</div>
            <div className="flex items-center text-xs text-green-600">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +180 from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <div className="flex items-center text-xs text-red-600">
              <ArrowDownRight className="h-3 w-3 mr-1" />
              -2 from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2%</div>
            <div className="flex items-center text-xs text-green-600">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +0.5% from last month
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              Revenue Analytics
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Track your earnings and revenue trends
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm">This Month</span>
                <span className="font-medium">Rp 12,450,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Last Month</span>
                <span className="font-medium">Rp 10,230,000</span>
              </div>
              <Link href="/dashboard/analytics/revenue">
                <Button className="w-full mt-4">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Revenue Reports
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              Ticket Sales
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Monitor ticket sales performance
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm">Sold This Month</span>
                <span className="font-medium">2,350</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Average per Event</span>
                <span className="font-medium">196</span>
              </div>
              <Link href="/dashboard/analytics/tickets">
                <Button className="w-full mt-4" variant="outline">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Ticket Analytics
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              Attendee Insights
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Understand your audience better
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm">Repeat Attendees</span>
                <span className="font-medium">68%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">New Attendees</span>
                <span className="font-medium">32%</span>
              </div>
              <Link href="/dashboard/analytics/attendees">
                <Button className="w-full mt-4" variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  View Attendee Insights
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Performance</CardTitle>
          <p className="text-sm text-muted-foreground">
            Your top performing events this month
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Jakarta Tech Conference 2025</h4>
                <p className="text-sm text-muted-foreground">Jan 15, 2025</p>
              </div>
              <div className="text-right">
                <p className="font-medium">Rp 8,500,000</p>
                <p className="text-sm text-muted-foreground">425 tickets</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Startup Networking Night</h4>
                <p className="text-sm text-muted-foreground">Jan 22, 2025</p>
              </div>
              <div className="text-right">
                <p className="font-medium">Rp 2,100,000</p>
                <p className="text-sm text-muted-foreground">105 tickets</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Digital Marketing Workshop</h4>
                <p className="text-sm text-muted-foreground">Feb 5, 2025</p>
              </div>
              <div className="text-right">
                <p className="font-medium">Rp 1,850,000</p>
                <p className="text-sm text-muted-foreground">74 tickets</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
