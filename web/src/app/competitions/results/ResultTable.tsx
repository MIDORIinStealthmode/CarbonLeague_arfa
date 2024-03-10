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

import {Category, Company, Superpower} from "@/lib/schema/zod";
import {useMemo, useState} from "react";
import {Button} from "@/components/ui/button";
import { ResultCall } from "./ResultCall";
import Image from "next/image";

type Props = {
  superpowers: (Superpower & { company: Company, category: Category })[]
}

export function ResultTable({superpowers}: Props) {
  const columns: ColumnDef<Superpower>[] = useMemo(() => [
    {accessorKey: "id"},
    {accessorKey: "name"},
    {
      accessorKey: "imageUrl",
      cell: ({ getValue }) => (
        <Image
          src={getValue() as string}
          alt="NFTの画像"
          className="w-20 h-20"
          width={160}
          height={160}
        />
      )
    },
    {accessorKey: "description"},
    {accessorKey: "year"},
    {accessorKey: "category.name"},
    {accessorKey: "company.name"},
    {accessorKey: "Score"},
  ], [])

  const table = useReactTable({
    data: superpowers,
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
