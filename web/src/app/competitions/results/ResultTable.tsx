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


type Props = {
  competitionId: string
  newYear: number
}
type Entry = {
  superpowerId: string
  totalScore: number
  superpowername: string
  imageUrl: string
  description: string
  year: number
}
export const ResultTable = ({ competitionId, newYear}: Props) => {
  const [data, setData] = useState<Entry[]>([])

  useEffect(() => {
  const fetchData = async () => {
    const res = await fetch(`/api/competition?newYear=${newYear}&competitionID=${competitionId}`);
    const jsonData = await res.json()
    setData(jsonData.sortedEntries)
    console.log(jsonData)
  };
  fetchData();
  }, [competitionId, newYear]);


    const columns: ColumnDef<Entry>[] = useMemo(() => [
      {header: "ID", accessorKey: "superpowerId"},
      {header: "totalScore", accessorKey: "totalScore"},
      {header: "name", accessorKey: "superpowername"},
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
  
    const table = useReactTable<Entry>({
      data: data,
      columns,
      getCoreRowModel: getCoreRowModel(),
    })
    const rows = table.getRowModel().rows

    console.log(data)

  
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
  