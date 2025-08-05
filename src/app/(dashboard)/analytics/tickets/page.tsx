/**
 * Tickets Analytics Page
 * Location: app/(dashboard)/analytics/tickets/page.tsx
 * 
 * Detailed ticket sales analytics and performance metrics
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  ArrowLeft,
  Ticket,
  TrendingUp,
  Calendar,
  Download,
  Target
} from 'lucide-react'
import Link from 'next/link'

export default function TicketsAnalyticsPage() {
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
          <h1 className="text-3xl font-bold">Ticket Sales Analytics</h1>
          <p className="text-muted-foreground">
            Monitor ticket performance and sales trends
          </p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Export Tickets Report
        </Button>
      </div>

      {/* Ticket Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Ticket className="h-5 w-5 text-blue-600" />
              Total Tickets Sold
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">1,847</div>
            <div className="flex items-center text-sm text-green-600 mt-2">
              <TrendingUp className="h-4 w-4 mr-1" />
              +18.2% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-purple-600" />
              Sales Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">73.8%</div>
            <div className="text-sm text-muted-foreground mt-2">
              Average across all events
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Average Ticket Price</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">Rp 24,500</div>
            <div className="text-sm text-muted-foreground mt-2">
              Weighted by volume
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Best Selling Event</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">Tech Conference</div>
            <div className="text-sm text-muted-foreground mt-2">
              425 tickets sold
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Event Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Event Ticket Performance</CardTitle>
          <p className="text-sm text-muted-foreground">
            Sales performance by event with progress tracking
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {[
              {
                name: "Jakarta Tech Conference 2025",
                date: "Jan 15, 2025",
                sold: 425,
                capacity: 500,
                price: 20000,
                status: "completed"
              },
              {
                name: "Digital Innovation Summit",
                date: "Jan 28, 2025",
                sold: 310,
                capacity: 400,
                price: 25000,
                status: "completed"
              },
              {
                name: "Startup Pitch Competition",
                date: "Feb 10, 2025",
                sold: 240,
                capacity: 300,
                price: 15000,
                status: "selling"
              },
              {
                name: "AI & Machine Learning Workshop",
                date: "Feb 18, 2025",
                sold: 160,
                capacity: 200,
                price: 35000,
                status: "selling"
              },
              {
                name: "E-commerce Masterclass",
                date: "Feb 25, 2025",
                sold: 145,
                capacity: 250,
                price: 28000,
                status: "selling"
              }
            ].map((event, index) => {
              const salesRate = (event.sold / event.capacity) * 100
              return (
                <div key={index} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{event.name}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{event.date}</span>
                        <Badge
                          variant={
                            event.status === 'completed' ? 'default' :
                              event.status === 'selling' ? 'secondary' : 'outline'
                          }
                          className="ml-2"
                        >
                          {event.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">
                        {event.sold} / {event.capacity}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Intl.NumberFormat('id-ID', {
                          style: 'currency',
                          currency: 'IDR',
                          minimumFractionDigits: 0,
                        }).format(event.price)} each
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Sales Progress</span>
                      <span className="font-medium">{salesRate.toFixed(1)}%</span>
                    </div>
                    <Progress value={salesRate} className="h-2" />
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Revenue</p>
                      <p className="font-medium">
                        {new Intl.NumberFormat('id-ID', {
                          style: 'currency',
                          currency: 'IDR',
                          minimumFractionDigits: 0,
                        }).format(event.sold * event.price)}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Remaining</p>
                      <p className="font-medium">{event.capacity - event.sold} tickets</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Potential</p>
                      <p className="font-medium">
                        {new Intl.NumberFormat('id-ID', {
                          style: 'currency',
                          currency: 'IDR',
                          minimumFractionDigits: 0,
                        }).format((event.capacity - event.sold) * event.price)}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Sales Trends */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Daily Sales Velocity</CardTitle>
            <p className="text-sm text-muted-foreground">
              Average tickets sold per day by event type
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { type: "Tech Conferences", velocity: 35.2, color: "bg-blue-500" },
                { type: "Workshops", velocity: 18.7, color: "bg-green-500" },
                { type: "Networking Events", velocity: 24.1, color: "bg-purple-500" },
                { type: "Competitions", velocity: 12.5, color: "bg-orange-500" }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${item.color}`} />
                    <span className="text-sm">{item.type}</span>
                  </div>
                  <div className="font-medium">{item.velocity} tickets/day</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Peak Sales Hours</CardTitle>
            <p className="text-sm text-muted-foreground">
              Best performing hours for ticket sales
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { hour: "19:00 - 21:00", percentage: 28.5, tickets: 327 },
                { hour: "12:00 - 14:00", percentage: 22.1, tickets: 253 },
                { hour: "20:00 - 22:00", percentage: 18.7, tickets: 214 },
                { hour: "14:00 - 16:00", percentage: 15.3, tickets: 175 },
                { hour: "10:00 - 12:00", percentage: 15.4, tickets: 176 }
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{item.hour}</span>
                    <span className="font-medium">{item.percentage}% ({item.tickets} tickets)</span>
                  </div>
                  <Progress value={item.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
