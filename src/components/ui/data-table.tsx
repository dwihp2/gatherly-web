"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { DataTableToolbar } from "./data-table-toolbar"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  searchKey?: string
  searchPlaceholder?: string
  onAdd?: () => void
  onExport?: () => void
  onRefresh?: () => void
  onBulkDelete?: (selectedRows: TData[]) => void
  onBulkStatusChange?: (selectedRows: TData[], status: string) => void
  filterableColumns?: {
    key: string
    title: string
    options: { label: string; value: string; count?: number }[]
  }[]
  isLoading?: boolean
  error?: Error | null
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  searchPlaceholder,
  onAdd,
  onExport,
  onRefresh,
  onBulkDelete,
  onBulkStatusChange,
  filterableColumns,
  isLoading = false,
  error = null,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  if (error) {
    return (
      <div className="rounded-md border border-destructive/20 p-8 text-center">
        <div className="text-sm text-destructive">
          Error loading data: {error.message}
        </div>
        {onRefresh && (
          <Button 
            variant="outline" 
            onClick={onRefresh}
            className="mt-4"
          >
            Try Again
          </Button>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <DataTableToolbar
        table={table}
        searchKey={searchKey}
        searchPlaceholder={searchPlaceholder}
        onAdd={onAdd}
        onExport={onExport}
        onRefresh={onRefresh}
        onBulkDelete={onBulkDelete}
        onBulkStatusChange={onBulkStatusChange}
        filterableColumns={filterableColumns}
      />
      
      <div className="rounded-md border overflow-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const meta = header.column.columnDef.meta as { sticky?: string; className?: string } | undefined
                  const stickyClass = meta?.sticky === 'right' ? 'sticky right-0 bg-background border-l z-10' : ''
                  return (
                    <TableHead 
                      key={header.id} 
                      className={`h-12 ${stickyClass} ${meta?.className || ''}`}
                      style={{ 
                        width: header.column.getSize() !== 150 ? `${header.column.getSize()}px` : undefined,
                        minWidth: header.column.getSize() !== 150 ? `${header.column.getSize()}px` : undefined,
                        maxWidth: header.column.getSize() !== 150 ? `${header.column.getSize()}px` : undefined
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              // Loading skeleton rows
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  {columns.map((column, colIndex) => {
                    const meta = column.meta as { sticky?: string; className?: string } | undefined
                    const stickyClass = meta?.sticky === 'right' ? 'sticky right-0 bg-background border-l' : ''
                    return (
                      <TableCell 
                        key={colIndex}
                        className={stickyClass}
                        style={{ 
                          width: column.size !== 150 ? `${column.size}px` : undefined,
                          minWidth: column.size !== 150 ? `${column.size}px` : undefined,
                          maxWidth: column.size !== 150 ? `${column.size}px` : undefined
                        }}
                      >
                        <Skeleton className="h-8 w-full" />
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="h-16"
                >
                  {row.getVisibleCells().map((cell) => {
                    const meta = cell.column.columnDef.meta as { sticky?: string; className?: string } | undefined
                    const stickyClass = meta?.sticky === 'right' ? 'sticky right-0 bg-background border-l' : ''
                    return (
                      <TableCell 
                        key={cell.id}
                        className={stickyClass}
                        style={{ 
                          width: cell.column.getSize() !== 150 ? `${cell.column.getSize()}px` : undefined,
                          minWidth: cell.column.getSize() !== 150 ? `${cell.column.getSize()}px` : undefined,
                          maxWidth: cell.column.getSize() !== 150 ? `${cell.column.getSize()}px` : undefined
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
