"use client"

import React from "react"
import {
  ColumnDef,
  Row,
  flexRender,
  getCoreRowModel,
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

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const tbodyRef = React.useRef<HTMLTableSectionElement>(null)
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const handleKeyDown = (event: React.KeyboardEvent, row: Row<TData>) => {
    console.log(event, row)
    event.stopPropagation()
    const rows = tbodyRef.current?.children
    if (!rows) return

    const currentRow = event.currentTarget.parentElement
    if (!currentRow) return
    const currentRowIndex = Array.from(rows).indexOf(currentRow)
    const nextRow = rows[currentRowIndex + 1] as HTMLTableRowElement
    const previousRow = rows[currentRowIndex - 1] as HTMLTableRowElement

    const currentColumn = event.currentTarget
    if (!currentColumn) return
    const currentColumnIndex = Array.from(currentRow.children).indexOf(
      currentColumn
    )
    const nextColumn = currentRow.children[
      currentColumnIndex + 1
    ] as HTMLTableCellElement
    const previousColumn = currentRow.children[
      currentColumnIndex - 1
    ] as HTMLTableCellElement

    switch (event.key) {
      case "ArrowUp":
        if (previousRow) {
          ;(previousRow.children[currentColumnIndex] as HTMLElement).focus()
        }
        break
      case "ArrowDown":
        if (nextRow) {
          ;(nextRow.children[currentColumnIndex] as HTMLElement).focus()
        }
        break
      case "ArrowLeft":
        if (previousColumn) {
          ;(previousColumn as HTMLElement).focus()
        }
        break
      case "ArrowRight":
        if (nextColumn) {
          ;(nextColumn as HTMLElement).focus()
        }
        break
      default:
        break
    }
  }

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              <>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </>
            </TableRow>
          ))}
        </TableHeader>
        <TableBody ref={tbodyRef}>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                id={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    id={cell.id}
                    tabIndex={0}
                    onKeyDown={(event) => handleKeyDown(event, row)}
                    className="focus:ring-2 focus:ring-indigo-400 focus:outline-none focus:ring-inset"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
