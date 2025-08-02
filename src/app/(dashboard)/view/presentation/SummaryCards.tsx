/**
 * Summary Cards Component
 * Location: app/(dashboard)/view/present          <div className="text-2xl font-bold text-gray-900">
            {stats.totalTicketsSold.toLocaleString()}
          </div>
          <div className="flex items-center mt-2">
            <TrendingUp className="h-3 w-3 text-blue-500 mr-1" />
            <span className="text-xs text-blue-600 font-medium">
              All Time
            </span>
            <span className="text-xs text-gray-500 ml-1">
              tickets sold
            </span>ryCards.tsx
 * 
 * Dashboard summary cards showing key metrics
 */
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'
import { DollarSign, Ticket, Calendar, TrendingUp } from 'lucide-react'
import { formatIDR } from '@/lib/utils/currency'
import { useDashboardStats } from '../../../events/usecases/useDashboardStats'
import { useAuth } from '../../../(auth)/hooks/useAuth'

export function SummaryCards() {
  const { user } = useAuth()
  const { stats, isLoading } = useDashboardStats(user?.tenantId || undefined)

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="space-y-0 pb-2">
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-32 mb-2" />
              <Skeleton className="h-4 w-20" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
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
            {formatIDR(stats.totalRevenue)}
          </div>
          <div className="flex items-center mt-2">
            <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
            <span className="text-xs text-green-600 font-medium">
              All Time
            </span>
            <span className="text-xs text-gray-500 ml-1">
              total revenue
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
            {stats.totalTicketsSold.toLocaleString()}
          </div>
          <div className="flex items-center mt-2">
            <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
            <span className="text-xs text-green-600 font-medium">
              All Time
            </span>
            <span className="text-xs text-gray-500 ml-1">
              total tickets
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
            {stats.activeEvents}
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="text-xs text-gray-600">
              {stats.publishedEvents} Published
            </div>
            <div className="text-xs text-gray-600">
              {stats.draftEvents} Draft
            </div>
          </div>
          <Progress 
            value={stats.activeEvents > 0 ? (stats.publishedEvents / stats.activeEvents) * 100 : 0} 
            className="mt-2" 
          />
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
            {stats.upcomingEvent ? stats.upcomingEvent.name : 'No upcoming events'}
          </div>
          <div className="text-sm text-gray-600 mb-2">
            {stats.upcomingEvent ? `in ${stats.upcomingEvent.daysUntil} days` : 'Create an event to get started'}
          </div>
          {stats.upcomingEvent && (
            <>
              <Progress
                value={75}
                className="h-2"
              />
              <p className="text-xs text-gray-500 mt-1">
                75% tickets sold
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
