"use client"

import * as React from "react"
import { Table } from "@tanstack/react-table"
import { X, Search, Filter, Plus, Trash2, Download, RotateCcw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { DataTableViewOptions } from "./data-table-view-options"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
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
  className?: string
}

export function DataTableToolbar<TData>({
  table,
  searchKey,
  searchPlaceholder = "Search...",
  onAdd,
  onExport,
  onRefresh,
  onBulkDelete,
  onBulkStatusChange,
  filterableColumns = [],
  className,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
  const selectedRows = table.getFilteredSelectedRowModel().rows
  const hasSelection = selectedRows.length > 0

  const handleClearFilters = () => {
    table.resetColumnFilters()
  }

  const handleGlobalSearch = (value: string) => {
    if (searchKey) {
      table.getColumn(searchKey)?.setFilterValue(value)
    }
  }

  const getFilterValue = (columnKey: string) => {
    return (table.getColumn(columnKey)?.getFilterValue() as string[]) ?? []
  }

  const setFilterValue = (columnKey: string, value: string[]) => {
    table.getColumn(columnKey)?.setFilterValue(value.length ? value : undefined)
  }

  const handleFilterChange = (columnKey: string, value: string, checked: boolean) => {
    const currentFilter = getFilterValue(columnKey)
    let newFilter = [...currentFilter]

    if (checked) {
      newFilter.push(value)
    } else {
      newFilter = newFilter.filter(item => item !== value)
    }

    setFilterValue(columnKey, newFilter)
  }

  return (
    <div className={`flex flex-wrap items-center justify-between gap-3 ${className}`}>
      <div className="flex items-center gap-3 flex-wrap">
        {/* Global Search */}
        {searchKey && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={searchPlaceholder}
              value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
              onChange={(event) => handleGlobalSearch(event.target.value)}
              className="min-w-60 pl-9 pr-9"
            />
            {(table.getColumn(searchKey)?.getFilterValue() as string) && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 p-0 hover:bg-transparent"
                onClick={() => handleGlobalSearch("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}

        {/* Column Filters */}
        {filterableColumns.map((column) => {
          const selectedValues = getFilterValue(column.key)
          return (
            <Popover key={column.key}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="border-dashed">
                  <Filter className="mr-2 h-4 w-4" />
                  {column.title}
                  {selectedValues.length > 0 && (
                    <Badge variant="secondary" className="ml-2 h-5 min-w-5 p-0 text-xs">
                      {selectedValues.length}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto min-w-48 p-3" align="start">
                <div className="space-y-3">
                  <div className="text-sm font-medium text-muted-foreground">
                    Filter by {column.title.toLowerCase()}
                  </div>
                  <div className="space-y-2">
                    {column.options.map((option) => (
                      <div key={option.value} className="flex items-center gap-2">
                        <Checkbox
                          id={`${column.key}-${option.value}`}
                          checked={selectedValues.includes(option.value)}
                          onCheckedChange={(checked) =>
                            handleFilterChange(column.key, option.value, !!checked)
                          }
                        />
                        <Label
                          htmlFor={`${column.key}-${option.value}`}
                          className="flex grow justify-between gap-2 font-normal cursor-pointer"
                        >
                          {option.label}
                          {option.count !== undefined && (
                            <span className="text-muted-foreground text-xs">
                              {option.count}
                            </span>
                          )}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )
        })}

        {/* Clear Filters */}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={handleClearFilters}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}

        {/* Column Visibility */}
        <DataTableViewOptions table={table} />
      </div>

      <div className="flex items-center gap-3">
        {/* Bulk Actions */}
        {hasSelection && (
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              {selectedRows.length} selected
            </Badge>
            
            {onBulkDelete && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete ({selectedRows.length})
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete{" "}
                      {selectedRows.length} selected item{selectedRows.length > 1 ? "s" : ""}.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => onBulkDelete(selectedRows.map(row => row.original))}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}

            {onBulkStatusChange && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onBulkStatusChange(selectedRows.map(row => row.original), "published")}
              >
                Publish ({selectedRows.length})
              </Button>
            )}
          </div>
        )}

        {/* Action Buttons */}
        {onRefresh && (
          <Button variant="outline" size="sm" onClick={onRefresh}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        )}

        {onExport && (
          <Button variant="outline" size="sm" onClick={onExport}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        )}

        {onAdd && (
          <Button onClick={onAdd} size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add New
          </Button>
        )}
      </div>
    </div>
  )
}
