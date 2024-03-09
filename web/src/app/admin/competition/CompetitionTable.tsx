"use client"

import {
  ColumnDef,
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

import {Competition} from "@/lib/schema/zod";
import {useState} from "react";
import {Button} from "@/components/ui/button";

type Props = {
  competitions: Competition[]
  onEdit: (id: string) => void
}


export function CompetitionTable({competitions, onEdit}: Props) {
  const columns: ColumnDef<Competition>[] = 
  [
    {accessorKey: "id"},
    {accessorKey: "name"},
    {accessorKey: "startDate"},
    {accessorKey: "endDate"},
    {
      accessorKey: "action",
      cell: ({ row, getValue }) => (
        <div className="flex gap-2">
          <Button onClick={() => onEdit(row.getValue('id'))}>End Competition</Button>
        </div>
      )
    }]


  const table = useReactTable({
    data: competitions,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  const rows = table.getRowModel().rows

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
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
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {rows?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}