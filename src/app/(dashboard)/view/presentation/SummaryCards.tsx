/**
 * Summary Cards Component
 * Location: app/(dashboard)/view/presentation/SummaryCards.tsx
 * 
 * Dashboard summary cards showing key metrics
 */
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { DollarSign, Ticket, Calendar, TrendingUp } from 'lucide-react'
import { formatIDR } from '@/lib/utils/currency'

export function SummaryCards() {
  // TODO: Replace with real data from usecase hooks
  const mockData = {
    totalRevenue: 15750000,
    revenueGrowth: 12.5,
    totalTicketsSold: 247,
    ticketsGrowth: 8.3,
    activeEvents: 5,
    publishedEvents: 3,
    draftEvents: 2,
    upcomingEvent: {
      name: "Jakarta Music Festival",
      daysUntil: 5
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Revenue Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            Total Revenue
          </CardTitle>
          <DollarSign className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">
            {formatIDR(mockData.totalRevenue)}
          </div>
          <div className="flex items-center mt-2">
            <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
            <span className="text-xs text-green-600 font-medium">
              +{mockData.revenueGrowth}%
            </span>
            <span className="text-xs text-gray-500 ml-1">
              from last month
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Total Tickets Sold Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            Total Tickets Sold
          </CardTitle>
          <Ticket className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">
            {mockData.totalTicketsSold}
          </div>
          <div className="flex items-center mt-2">
            <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
            <span className="text-xs text-green-600 font-medium">
              +{mockData.ticketsGrowth}%
            </span>
            <span className="text-xs text-gray-500 ml-1">
              from last month
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Active Events Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            Active Events
          </CardTitle>
          <Calendar className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">
            {mockData.activeEvents}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="secondary" className="text-xs">
              {mockData.publishedEvents} Published
            </Badge>
            <Badge variant="outline" className="text-xs">
              {mockData.draftEvents} Draft
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Events Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            Next Event
          </CardTitle>
          <Calendar className="h-4 w-4 text-orange-600" />
        </CardHeader>
        <CardContent>
          <div className="text-lg font-semibold text-gray-900 mb-1">
            {mockData.upcomingEvent.name}
          </div>
          <div className="text-sm text-gray-600 mb-2">
            in {mockData.upcomingEvent.daysUntil} days
          </div>
          <Progress
            value={75}
            className="h-2"
          />
          <p className="text-xs text-gray-500 mt-1">
            75% tickets sold
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
