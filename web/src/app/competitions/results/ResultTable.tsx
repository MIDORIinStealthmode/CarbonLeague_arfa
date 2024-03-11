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

import {Superpower} from "@/lib/schema/zod";
import {useEffect, useMemo, useState} from "react";
import Image from "next/image";
import { set } from "zod";
import { json } from "stream/consumers";


type Props = {
  competitionId: string
  newYear: number
}

export const ResultTable = ({ competitionId, newYear}: Props) => {
  const [data, setData] = useState([])
  const [address, setAddress] = useState('')

  useEffect(() => {
  const fetchData = async () => {
    const res = await fetch(`/api/admin/competitions/${competitionId}/database?newYear=${newYear}&competitionID=${competitionId}`);
    const jsonData = await res.json()
    setData(jsonData)
    console.log(jsonData)
  };
  fetchData();
  }, [competitionId, newYear]);

    const columns: ColumnDef<any>[] = useMemo(() => [
      {header: "ID", accessorKey: "id"},
      {header: "name", accessorKey: "name"},
      {header: "totalScore", accessorKey: "totalScore"},
      {
        header: "imageUrl",
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
      {header: "description", accessorKey: "description"},
      {header: "year", accessorKey: "year"},
    ], [])
  
    const table = useReactTable({
      data: data,
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
  