/**
 * Recent Activity Section Component
 * Location: app/(dashboard)/view/presentation/RecentActivitySection.tsx
 * 
 * Section displaying recent activities and notifications
 */
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Ticket,
  CheckCircle,
  AlertTriangle,
  Calendar,
  DollarSign,
  Users,
  ExternalLink
} from 'lucide-react'
import { formatIDR } from '@/lib/utils/currency'

// Mock activity data - TODO: Replace with actual data from usecases
const mockActivities = [
  {
    id: '1',
    type: 'ticket_purchase',
    title: 'New ticket purchase',
    description: 'John Doe purchased 2 tickets for Jakarta Music Festival',
    amount: 1000000,
    timestamp: '2024-08-02T10:30:00Z',
    eventName: 'Jakarta Music Festival'
  },
  {
    id: '2',
    type: 'check_in',
    title: 'Check-in completed',
    description: 'Sarah Johnson checked in for Startup Networking Night',
    timestamp: '2024-08-02T09:15:00Z',
    eventName: 'Startup Networking Night'
  },
  {
    id: '3',
    type: 'event_published',
    title: 'Event published',
    description: 'Tech Conference 2024 is now live and accepting registrations',
    timestamp: '2024-08-01T16:45:00Z',
    eventName: 'Tech Conference 2024'
  },
  {
    id: '4',
    type: 'ticket_purchase',
    title: 'Bulk ticket purchase',
    description: 'PT. Innovate Indonesia purchased 10 tickets',
    amount: 5000000,
    timestamp: '2024-08-01T14:20:00Z',
    eventName: 'Jakarta Music Festival'
  },
  {
    id: '5',
    type: 'milestone',
    title: 'Sales milestone reached',
    description: 'Jakarta Music Festival reached 75% ticket sales',
    timestamp: '2024-08-01T11:00:00Z',
    eventName: 'Jakarta Music Festival'
  }
]

export function RecentActivitySection() {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'ticket_purchase':
        return <Ticket className="h-4 w-4 text-blue-600" />
      case 'check_in':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'event_published':
        return <Calendar className="h-4 w-4 text-purple-600" />
      case 'milestone':
        return <Users className="h-4 w-4 text-orange-600" />
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-600" />
    }
  }

  const getActivityBadge = (type: string) => {
    switch (type) {
      case 'ticket_purchase':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Sale</Badge>
      case 'check_in':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Check-in</Badge>
      case 'event_published':
        return <Badge variant="secondary" className="bg-purple-100 text-purple-800">Event</Badge>
      case 'milestone':
        return <Badge variant="secondary" className="bg-orange-100 text-orange-800">Milestone</Badge>
      default:
        return <Badge variant="outline">Activity</Badge>
    }
  }

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date()
    const activityTime = new Date(timestamp)
    const diffInHours = Math.floor((now.getTime() - activityTime.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - activityTime.getTime()) / (1000 * 60))
      return `${diffInMinutes} minutes ago`
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays} days ago`
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Recent Activity</CardTitle>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <ExternalLink className="h-4 w-4" />
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <div className="space-y-4">
            {mockActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-gray-100">
                    {getActivityIcon(activity.type)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.title}
                    </p>
                    {getActivityBadge(activity.type)}
                  </div>

                  <p className="text-sm text-gray-600 mb-1">
                    {activity.description}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{activity.eventName}</span>
                    <span>•</span>
                    <span>{formatTimeAgo(activity.timestamp)}</span>
                    {activity.amount && (
                      <>
                        <span>•</span>
                        <span className="font-medium text-green-600 flex items-center gap-1">
                          <DollarSign className="h-3 w-3" />
                          {formatIDR(activity.amount)}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
