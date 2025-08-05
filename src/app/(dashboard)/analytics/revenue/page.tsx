/**
 * Revenue Analytics Page
 * Location: app/(dashboard)/analytics/revenue/page.tsx
 * 
 * Detailed revenue analytics and reports
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  ArrowLeft,
  DollarSign,
  TrendingUp,
  Download,
  Calendar
} from 'lucide-react'
import Link from 'next/link'

export default function RevenueAnalyticsPage() {
  return (
    <div className="container mx-auto py-4 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link href="/dashboard/analytics">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Analytics
          </Button>
        </Link>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Revenue Analytics</h1>
          <p className="text-muted-foreground">
            Track and analyze your revenue performance
          </p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Export Revenue Report
        </Button>
      </div>

      {/* Revenue Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">Rp 45,231,000</div>
            <div className="flex items-center text-sm text-green-600 mt-2">
              <TrendingUp className="h-4 w-4 mr-1" />
              +22.5% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Average Revenue per Event</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">Rp 3,769,250</div>
            <div className="text-sm text-muted-foreground mt-2">
              Based on 12 events this month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Best Performing Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">January 2025</div>
            <div className="text-sm text-muted-foreground mt-2">
              Rp 52,180,000 total revenue
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue by Event */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue by Event</CardTitle>
          <p className="text-sm text-muted-foreground">
            Your highest earning events this period
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                name: "Jakarta Tech Conference 2025",
                date: "Jan 15, 2025",
                revenue: 8500000,
                tickets: 425,
                status: "completed"
              },
              {
                name: "Digital Innovation Summit",
                date: "Jan 28, 2025",
                revenue: 6200000,
                tickets: 310,
                status: "completed"
              },
              {
                name: "Startup Pitch Competition",
                date: "Feb 10, 2025",
                revenue: 4800000,
                tickets: 240,
                status: "upcoming"
              },
              {
                name: "AI & Machine Learning Workshop",
                date: "Feb 18, 2025",
                revenue: 3200000,
                tickets: 160,
                status: "upcoming"
              },
              {
                name: "E-commerce Masterclass",
                date: "Feb 25, 2025",
                revenue: 2900000,
                tickets: 145,
                status: "upcoming"
              }
            ].map((event, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-medium">{event.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{event.date}</span>
                      <Badge
                        variant={event.status === 'completed' ? 'default' : 'secondary'}
                        className="ml-2"
                      >
                        {event.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">
                    {new Intl.NumberFormat('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                      minimumFractionDigits: 0,
                    }).format(event.revenue)}
                  </p>
                  <p className="text-sm text-muted-foreground">{event.tickets} tickets</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Monthly Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Revenue Breakdown</CardTitle>
          <p className="text-sm text-muted-foreground">
            Revenue trends over the last 6 months
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { month: "February 2025", revenue: 45231000, events: 12, growth: 22.5 },
              { month: "January 2025", revenue: 36890000, events: 10, growth: 15.2 },
              { month: "December 2024", revenue: 32010000, events: 8, growth: -5.1 },
              { month: "November 2024", revenue: 33720000, events: 9, growth: 8.7 },
              { month: "October 2024", revenue: 31020000, events: 7, growth: 12.3 },
              { month: "September 2024", revenue: 27630000, events: 6, growth: 18.9 }
            ].map((month, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">{month.month}</h4>
                  <p className="text-sm text-muted-foreground">{month.events} events</p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">
                    {new Intl.NumberFormat('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                      minimumFractionDigits: 0,
                    }).format(month.revenue)}
                  </div>
                  <div className={`text-sm flex items-center ${month.growth > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {month.growth > 0 ? '+' : ''}{month.growth}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
