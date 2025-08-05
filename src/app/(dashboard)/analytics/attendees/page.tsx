/**
 * Attendees Analytics Page
 * Location: app/(dashboard)/analytics/attendees/page.tsx
 * 
 * Detailed attendee analytics and insights
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  ArrowLeft,
  Users,
  UserCheck,
  MapPin,
  Clock,
  Download,
  TrendingUp,
  Calendar
} from 'lucide-react'
import Link from 'next/link'

export default function AttendeesAnalyticsPage() {
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
          <h1 className="text-3xl font-bold">Attendee Analytics</h1>
          <p className="text-muted-foreground">
            Analyze attendee patterns and engagement
          </p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Export Attendee Report
        </Button>
      </div>

      {/* Attendee Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              Total Attendees
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">1,542</div>
            <div className="flex items-center text-sm text-green-600 mt-2">
              <TrendingUp className="h-4 w-4 mr-1" />
              +15.7% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-green-600" />
              Check-in Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">87.3%</div>
            <div className="text-sm text-muted-foreground mt-2">
              1,346 of 1,542 attendees
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Average Age</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">28.5</div>
            <div className="text-sm text-muted-foreground mt-2">
              Years old
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Repeat Attendees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">34.2%</div>
            <div className="text-sm text-muted-foreground mt-2">
              527 returning attendees
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Event Attendance */}
      <Card>
        <CardHeader>
          <CardTitle>Event Attendance Breakdown</CardTitle>
          <p className="text-sm text-muted-foreground">
            Attendance patterns across your events
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {[
              {
                name: "Jakarta Tech Conference 2025",
                date: "Jan 15, 2025",
                registered: 425,
                attended: 398,
                checkInRate: 93.6,
                status: "completed"
              },
              {
                name: "Digital Innovation Summit",
                date: "Jan 28, 2025",
                registered: 310,
                attended: 276,
                checkInRate: 89.0,
                status: "completed"
              },
              {
                name: "Startup Pitch Competition",
                date: "Feb 10, 2025",
                registered: 240,
                attended: 198,
                checkInRate: 82.5,
                status: "completed"
              },
              {
                name: "AI & Machine Learning Workshop",
                date: "Feb 18, 2025",
                registered: 160,
                attended: 145,
                checkInRate: 90.6,
                status: "completed"
              },
              {
                name: "E-commerce Masterclass",
                date: "Feb 25, 2025",
                registered: 145,
                attended: 132,
                checkInRate: 91.0,
                status: "completed"
              }
            ].map((event, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{event.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{event.date}</span>
                      <Badge variant="default" className="ml-2">
                        {event.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">
                      {event.attended} / {event.registered}
                    </p>
                    <p className="text-sm text-green-600 font-medium">
                      {event.checkInRate}% attended
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Attendance Rate</span>
                    <span className="font-medium">{event.checkInRate}%</span>
                  </div>
                  <Progress value={event.checkInRate} className="h-2" />
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">No-shows</p>
                    <p className="font-medium text-red-600">{event.registered - event.attended}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">On-time</p>
                    <p className="font-medium text-green-600">{Math.floor(event.attended * 0.85)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Late arrivals</p>
                    <p className="font-medium text-orange-600">{event.attended - Math.floor(event.attended * 0.85)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Demographics & Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Age Demographics</CardTitle>
            <p className="text-sm text-muted-foreground">
              Age distribution of your attendees
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { range: "18-24", percentage: 32.1, count: 495 },
                { range: "25-34", percentage: 41.7, count: 643 },
                { range: "35-44", percentage: 18.2, count: 281 },
                { range: "45-54", percentage: 6.3, count: 97 },
                { range: "55+", percentage: 1.7, count: 26 }
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{item.range} years</span>
                    <span className="font-medium">{item.percentage}% ({item.count})</span>
                  </div>
                  <Progress value={item.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Geographic Distribution
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Where your attendees come from
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { city: "Jakarta", percentage: 45.2, count: 697 },
                { city: "Bandung", percentage: 18.7, count: 288 },
                { city: "Surabaya", percentage: 12.3, count: 190 },
                { city: "Yogyakarta", percentage: 8.9, count: 137 },
                { city: "Medan", percentage: 6.1, count: 94 },
                { city: "Others", percentage: 8.8, count: 136 }
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{item.city}</span>
                    <span className="font-medium">{item.percentage}% ({item.count})</span>
                  </div>
                  <Progress value={item.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Check-in Patterns */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Check-in Time Patterns
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            When attendees typically arrive at events
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="font-medium">Before Event Start</h4>
              {[
                { time: "30+ minutes early", percentage: 12.5, count: 168 },
                { time: "15-30 minutes early", percentage: 28.7, count: 386 },
                { time: "5-15 minutes early", percentage: 34.2, count: 460 },
                { time: "0-5 minutes early", percentage: 9.8, count: 132 }
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{item.time}</span>
                    <span className="font-medium">{item.percentage}% ({item.count})</span>
                  </div>
                  <Progress value={item.percentage} className="h-2" />
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">After Event Start</h4>
              {[
                { time: "0-15 minutes late", percentage: 11.2, count: 151 },
                { time: "15-30 minutes late", percentage: 2.8, count: 38 },
                { time: "30+ minutes late", percentage: 0.8, count: 11 }
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{item.time}</span>
                    <span className="font-medium">{item.percentage}% ({item.count})</span>
                  </div>
                  <Progress value={item.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
