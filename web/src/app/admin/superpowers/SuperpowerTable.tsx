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
import {SuperpowerEditDialog} from "@/app/admin/superpowers/SuperpowerEditDialog";
import Image from "next/image";
import {Mint} from "@/app/admin/superpowers/Mint";

type Props = {
  superpowers: (Superpower & { company: Company, category: Category })[]
}

export function SuperpowerTable<TData, TValue>({superpowers}: Props) {
  const [editId, setEditId] = useState<string>()
  const [create, setCreate] = useState(false)

  const columns: ColumnDef<Superpower>[] = useMemo(() => [
    {accessorKey: "id"},
    {accessorKey: "nftId"},
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
    {accessorKey: "rank"},
    {accessorKey: "score"},
    {accessorKey: "year"},
    {accessorKey: "category.name"},
    {accessorKey: "company.name"},
    {
      accessorKey: "action",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button onClick={() => setEditId(row.getValue('id'))}>edit</Button>
          <Mint superpowerId={row.id} />
        </div>
      )
    },
  ], [])

  const table = useReactTable({
    data: superpowers,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  const rows = table.getRowModel().rows

  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="flex w-full justify-between align-center">
        <h1>Superpower一覧</h1>
        <Button onClick={() => setCreate(true)}>新規作成</Button>
      </div>
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
        <SuperpowerEditDialog
          editId={editId}
          create={create}
          onClose={() => {
            setEditId(undefined)
            setCreate(false)
          }}
        />
      </div>
    </div>
  )
}
