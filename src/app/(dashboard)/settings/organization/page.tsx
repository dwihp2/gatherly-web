/**
 * Organization Settings Page
 * Location: app/(dashboard)/settings/organization/page.tsx
 * 
 * Organization management and team settings
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import {
  ArrowLeft,
  Building,
  Users,
  Plus,
  MoreHorizontal,
  Mail,
  Shield,
  Settings,
  Trash2
} from 'lucide-react'
import Link from 'next/link'

export default function OrganizationSettingsPage() {
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
          <h1 className="text-3xl font-bold">Organization Settings</h1>
          <p className="text-muted-foreground">
            Manage your organization details and team members
          </p>
        </div>
      </div>

      {/* Organization Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Organization Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="orgName">Organization Name</Label>
              <Input
                id="orgName"
                placeholder="Enter organization name"
                defaultValue="Gatherly Events Co."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="orgEmail">Organization Email</Label>
              <Input
                id="orgEmail"
                type="email"
                placeholder="Enter organization email"
                defaultValue="hello@gatherly-events.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="orgPhone">Phone Number</Label>
              <Input
                id="orgPhone"
                type="tel"
                placeholder="Enter phone number"
                defaultValue="+62 21-1234-5678"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="orgWebsite">Website</Label>
              <Input
                id="orgWebsite"
                type="url"
                placeholder="Enter website URL"
                defaultValue="https://gatherly-events.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="orgAddress">Address</Label>
            <Textarea
              id="orgAddress"
              placeholder="Enter organization address..."
              defaultValue="Jl. Sudirman No. 123, Jakarta Pusat, DKI Jakarta 10110"
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="orgDescription">Description</Label>
            <Textarea
              id="orgDescription"
              placeholder="Describe your organization..."
              defaultValue="We are a full-service event management company specializing in tech conferences, workshops, and corporate events across Indonesia."
              rows={3}
            />
          </div>

          <Button>Save Organization Details</Button>
        </CardContent>
      </Card>

      {/* Team Members */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Team Members
            </CardTitle>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Invite Member
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                name: "John Doe",
                email: "john.doe@gatherly-events.com",
                role: "Owner",
                avatar: "/placeholder-avatar-1.jpg",
                initials: "JD",
                status: "active",
                lastActive: "Online now"
              },
              {
                name: "Sarah Wilson",
                email: "sarah.wilson@gatherly-events.com",
                role: "Admin",
                avatar: "/placeholder-avatar-2.jpg",
                initials: "SW",
                status: "active",
                lastActive: "2 hours ago"
              },
              {
                name: "Michael Chen",
                email: "michael.chen@gatherly-events.com",
                role: "Editor",
                avatar: "/placeholder-avatar-3.jpg",
                initials: "MC",
                status: "active",
                lastActive: "1 day ago"
              },
              {
                name: "Lisa Rodriguez",
                email: "lisa.rodriguez@gatherly-events.com",
                role: "Viewer",
                avatar: "/placeholder-avatar-4.jpg",
                initials: "LR",
                status: "pending",
                lastActive: "Invitation sent"
              }
            ].map((member, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{member.name}</h4>
                      <Badge
                        variant={member.status === 'active' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {member.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{member.email}</p>
                    <p className="text-xs text-muted-foreground">{member.lastActive}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">
                    {member.role}
                  </Badge>
                  {member.role !== 'Owner' && (
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Permissions & Roles */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Roles & Permissions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Owner</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Full access to all features
                  </p>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="text-sm space-y-1">
                    <li>• Manage organization settings</li>
                    <li>• Invite and remove team members</li>
                    <li>• Create and manage events</li>
                    <li>• Access billing and subscription</li>
                    <li>• View all analytics</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Admin</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Manage events and team
                  </p>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="text-sm space-y-1">
                    <li>• Create and manage events</li>
                    <li>• Invite team members</li>
                    <li>• Access event analytics</li>
                    <li>• Manage event check-ins</li>
                    <li>• Export event data</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Editor</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Create and edit events
                  </p>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="text-sm space-y-1">
                    <li>• Create events</li>
                    <li>• Edit assigned events</li>
                    <li>• Manage event check-ins</li>
                    <li>• View event analytics</li>
                    <li>• Cannot invite members</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Organization Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Organization Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Auto-approve events</p>
                  <p className="text-sm text-muted-foreground">
                    Automatically publish new events
                  </p>
                </div>
                <Badge variant="outline">Disabled</Badge>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Event notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Notify team about new events
                  </p>
                </div>
                <Badge variant="default">Enabled</Badge>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Data retention</p>
                  <p className="text-sm text-muted-foreground">
                    Keep event data for 2 years
                  </p>
                </div>
                <Button variant="ghost" size="sm">
                  Configure
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Communication Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Email templates</p>
                  <p className="text-sm text-muted-foreground">
                    Custom event confirmation emails
                  </p>
                </div>
                <Button variant="ghost" size="sm">
                  Customize
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Branding</p>
                  <p className="text-sm text-muted-foreground">
                    Add your logo to emails and tickets
                  </p>
                </div>
                <Button variant="ghost" size="sm">
                  Upload Logo
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Support contact</p>
                  <p className="text-sm text-muted-foreground">
                    Support email for attendees
                  </p>
                </div>
                <Button variant="ghost" size="sm">
                  Configure
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Danger Zone */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <Trash2 className="h-5 w-5" />
            Danger Zone
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
              <div>
                <h4 className="font-medium text-red-600">Transfer Ownership</h4>
                <p className="text-sm text-muted-foreground">
                  Transfer organization ownership to another team member
                </p>
              </div>
              <Button variant="outline" size="sm">
                Transfer
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
              <div>
                <h4 className="font-medium text-red-600">Delete Organization</h4>
                <p className="text-sm text-muted-foreground">
                  Permanently delete organization and all associated data
                </p>
              </div>
              <Button variant="destructive" size="sm">
                Delete Organization
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
