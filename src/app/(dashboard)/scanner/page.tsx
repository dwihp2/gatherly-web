/**
 * QR Scanner Dashboard Page
 * Location: app/(dashboard)/scanner/page.tsx
 * 
 * QR code scanner interface for event check-ins
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  QrCode,
  Camera,
  UserCheck,
  Users,
  Clock,
  AlertCircle,
  CheckCircle,
  MapPin
} from 'lucide-react'

export default function QRScannerPage() {
  return (
    <div className="container mx-auto py-4 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">QR Code Scanner</h1>
          <p className="text-muted-foreground">
            Scan tickets and manage event check-ins
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-green-600" />
              Checked In Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">127</div>
            <div className="text-sm text-muted-foreground mt-2">
              Across 3 active events
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              Total Expected
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">485</div>
            <div className="text-sm text-muted-foreground mt-2">
              Registered attendees
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Check-in Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">26.2%</div>
            <div className="text-sm text-muted-foreground mt-2">
              Events still ongoing
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-600" />
              Issues Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">3</div>
            <div className="text-sm text-muted-foreground mt-2">
              Invalid or duplicate scans
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Scanner Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <QrCode className="h-5 w-5" />
              QR Code Scanner
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Position QR code within the frame to scan
            </p>
          </CardHeader>
          <CardContent>
            <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600">
              <div className="text-center space-y-4">
                <Camera className="h-16 w-16 mx-auto text-gray-400" />
                <div>
                  <p className="text-lg font-medium text-gray-600 dark:text-gray-300">Camera Preview</p>
                  <p className="text-sm text-gray-500">Click to activate scanner</p>
                </div>
                <Button className="mt-4">
                  <Camera className="h-4 w-4 mr-2" />
                  Start Scanning
                </Button>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Scanner Status</span>
                <Badge variant="secondary">Ready</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Auto-focus</span>
                <Badge variant="outline">Enabled</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Sound Alerts</span>
                <Badge variant="outline">On</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Scans</CardTitle>
            <p className="text-sm text-muted-foreground">
              Latest check-in activity
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {[
                {
                  name: "Sarah Wijaya",
                  event: "Tech Conference",
                  time: "2 minutes ago",
                  status: "success",
                  ticketId: "TC-001-425"
                },
                {
                  name: "Ahmad Rahman",
                  event: "Tech Conference",
                  time: "5 minutes ago",
                  status: "success",
                  ticketId: "TC-001-398"
                },
                {
                  name: "Lisa Chen",
                  event: "Innovation Summit",
                  time: "8 minutes ago",
                  status: "success",
                  ticketId: "IS-002-276"
                },
                {
                  name: "Invalid Ticket",
                  event: "Unknown",
                  time: "12 minutes ago",
                  status: "error",
                  ticketId: "INV-999-000"
                },
                {
                  name: "Budi Santoso",
                  event: "Tech Conference",
                  time: "15 minutes ago",
                  status: "success",
                  ticketId: "TC-001-123"
                },
                {
                  name: "Maria Garcia",
                  event: "Innovation Summit",
                  time: "18 minutes ago",
                  status: "success",
                  ticketId: "IS-002-089"
                }
              ].map((scan, index) => (
                <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                  <div className={`w-2 h-2 rounded-full mt-2 ${scan.status === 'success' ? 'bg-green-500' : 'bg-red-500'
                    }`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium truncate">{scan.name}</p>
                      {scan.status === 'success' ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{scan.event}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                      <span>{scan.time}</span>
                      <span>#{scan.ticketId}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Events */}
      <Card>
        <CardHeader>
          <CardTitle>Active Events Today</CardTitle>
          <p className="text-sm text-muted-foreground">
            Events currently accepting check-ins
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                name: "Jakarta Tech Conference 2025",
                time: "09:00 - 17:00",
                location: "Jakarta Convention Center",
                registered: 425,
                checkedIn: 89,
                status: "active"
              },
              {
                name: "Digital Innovation Summit",
                time: "13:00 - 18:00",
                location: "Grand Ballroom Hotel",
                registered: 310,
                checkedIn: 34,
                status: "active"
              },
              {
                name: "Startup Networking Event",
                time: "18:00 - 22:00",
                location: "Co-working Space Hub",
                registered: 150,
                checkedIn: 4,
                status: "starting-soon"
              }
            ].map((event, index) => (
              <Card key={index} className="relative">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm leading-tight">{event.name}</h4>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                        <Clock className="h-3 w-3" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <Badge
                      variant={event.status === 'active' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {event.status === 'active' ? 'Active' : 'Starting Soon'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Check-ins</span>
                      <span className="font-medium">
                        {event.checkedIn} / {event.registered}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-muted-foreground">
                        {((event.checkedIn / event.registered) * 100).toFixed(1)}% checked in
                      </div>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
