export type EventStatus = 'draft' | 'published' | 'cancelled'

export type EventFilters = {
  status?: EventStatus
  search?: string
  dateRange?: {
    from: Date
    to: Date
  }
}

export type EventSortBy = 'date' | 'name' | 'ticketsSold' | 'revenue'
export type SortOrder = 'asc' | 'desc'
