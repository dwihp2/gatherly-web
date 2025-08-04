"use client"

import * as React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Eye, Edit, Share2, QrCode, Download, Unlock, Lock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { formatIDR } from "@/lib/utils/currency"
import type { Event } from "../../models/interfaces/event"

interface EventColumnsProps {
  onViewEvent?: (eventId: string) => void
  onEditEvent?: (eventId: string) => void
  onPublishEvent?: (eventId: string) => void
  onUnpublishEvent?: (eventId: string) => void
  onShareEvent?: (eventId: string) => void
  onShowQRScanner?: (eventId: string) => void
  onDownloadAttendees?: (eventId: string) => void
}

export function createEventColumns({
  onViewEvent,
  onEditEvent,
  onPublishEvent,
  onUnpublishEvent,
  onShareEvent,
  onShowQRScanner,
  onDownloadAttendees,
}: EventColumnsProps): ColumnDef<Event>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
      size: 40,
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 font-semibold hover:bg-transparent"
          >
            Event
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const event = row.original
        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={event.posterUrl || undefined} alt={event.name} />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                {event.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <div className="font-medium text-sm truncate" title={event.name}>
                {event.name}
              </div>
              <div className="text-xs text-muted-foreground truncate" title={event.location}>
                {event.location}
              </div>
            </div>
          </div>
        )
      },
      size: 280,
    },
    {
      accessorKey: "dateTime",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 font-semibold hover:bg-transparent"
          >
            Date & Time
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const dateTime = new Date(row.getValue("dateTime"))
        return (
          <div className="text-sm">
            <div className="font-medium">
              {dateTime.toLocaleDateString("id-ID", {
                weekday: "short",
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </div>
            <div className="text-muted-foreground">
              {dateTime.toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
              })} WIB
            </div>
          </div>
        )
      },
      size: 160,
    },
    {
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 font-semibold hover:bg-transparent"
          >
            Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        const statusConfig = {
          draft: { label: "Draft", variant: "secondary" as const },
          published: { label: "Published", variant: "default" as const },
          cancelled: { label: "Cancelled", variant: "destructive" as const },
        }

        const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft

        return <Badge variant={config.variant}>{config.label}</Badge>
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
      size: 120,
    },
    {
      accessorKey: "ticketsSold",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 font-semibold hover:bg-transparent"
          >
            Tickets Sold
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const ticketsSold = row.getValue("ticketsSold") as number
        const totalTickets = row.original.totalTickets
        const percentage = totalTickets > 0 ? (ticketsSold / totalTickets) * 100 : 0

        return (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">{ticketsSold}</span>
              <span className="text-muted-foreground">/ {totalTickets}</span>
            </div>
            <Progress value={percentage} className="h-2" />
          </div>
        )
      },
      size: 140,
    },
    {
      accessorKey: "totalRevenue",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 font-semibold hover:bg-transparent"
          >
            Revenue
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const revenue = row.getValue("totalRevenue") as number
        return (
          <div className="font-medium text-sm">
            {formatIDR(revenue)}
          </div>
        )
      },
      size: 140,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const event = row.original
        const isPublished = event.status === "published"

        return (
          <div className="flex justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />

                {onViewEvent && (
                  <DropdownMenuItem onClick={() => onViewEvent(event.id)}>
                    <Eye className="mr-2 h-4 w-4" />
                    View Event
                  </DropdownMenuItem>
                )}

                {onEditEvent && (
                  <DropdownMenuItem onClick={() => onEditEvent(event.id)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Event
                  </DropdownMenuItem>
                )}

                <DropdownMenuSeparator />

                {!isPublished && onPublishEvent && (
                  <DropdownMenuItem onClick={() => onPublishEvent(event.id)}>
                    <Lock className="mr-2 h-4 w-4" />
                    Publish Event
                  </DropdownMenuItem>
                )}

                {isPublished && onUnpublishEvent && (
                  <DropdownMenuItem onClick={() => onUnpublishEvent(event.id)}>
                    <Unlock className="mr-2 h-4 w-4" />
                    Unpublish Event
                  </DropdownMenuItem>
                )}

                {onShareEvent && (
                  <DropdownMenuItem onClick={() => onShareEvent(event.id)}>
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Event
                  </DropdownMenuItem>
                )}

                {onShowQRScanner && (
                  <DropdownMenuItem onClick={() => onShowQRScanner(event.id)}>
                    <QrCode className="mr-2 h-4 w-4" />
                    QR Scanner
                  </DropdownMenuItem>
                )}

                {onDownloadAttendees && (
                  <DropdownMenuItem onClick={() => onDownloadAttendees(event.id)}>
                    <Download className="mr-2 h-4 w-4" />
                    Download Attendees
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      },
      enableSorting: false,
      enableHiding: false,
      size: 40,
      meta: {
        sticky: 'right',
        className: 'sticky right-0 bg-background'
      }
    },
  ]
}
