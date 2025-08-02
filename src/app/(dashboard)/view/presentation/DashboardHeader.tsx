/**
 * Dashboard Header Component
 * Location: app/(dashboard)/view/presentation/DashboardHeader.tsx
 * 
 * Header section for the organizer dashboard with welcome message and quick actions
 */
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Plus, QrCode } from 'lucide-react'
import { useEventFormStore } from '../../../events/stores/eventFormStore'

interface DashboardHeaderProps {
  organizerName: string
  organizationName?: string | null
}

export function DashboardHeader({ organizerName, organizationName }: DashboardHeaderProps) {
  const currentDate = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const { openCreateModal } = useEventFormStore()

  const handleCreateEvent = () => {
    openCreateModal()
  }

  const handleQRScanner = () => {
    // TODO: Open QR scanner modal
    console.log('Open QR scanner modal')
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Welcome Message */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Welcome, {organizerName}!
            </h1>
            <p className="text-gray-600 mt-1">
              {currentDate}
            </p>
            {organizationName && (
              <p className="text-sm text-gray-500 mt-1">
                Managing <span className="font-medium">{organizationName}</span>
              </p>
            )}
          </div>

          {/* Quick Actions */}
          <div className="flex gap-3">
            <Button
              onClick={handleCreateEvent}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Create New Event
            </Button>
            <Button
              variant="outline"
              onClick={handleQRScanner}
              className="flex items-center gap-2"
            >
              <QrCode className="h-4 w-4" />
              QR Scanner
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
