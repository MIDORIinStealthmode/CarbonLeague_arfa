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

import {Competition, CompetitionResult, Superpower, User} from "@/lib/schema/zod";
import {useEffect, useMemo, useState} from "react";
import Image from "next/image";
import {UserEntry} from "@/app/api/competitions/[id]/entries/schema";
import {useAddress} from "@thirdweb-dev/react";
import {Loader2} from "lucide-react";
import {Button} from "@/components/ui/button";
import {ClaimReward} from "@/app/(app)/competitions/[competitionId]/ClaimReward";


type Props = {
  competition: Competition
}

type ResultWithSuperpower = CompetitionResult & { superpower: Superpower, user: User }

export const ResultTable = ({ competition }: Props) => {
  const [data, setData] = useState<ResultWithSuperpower[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const selfAddress = useAddress()

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const res = await fetch(`/api/competitions/${competition.id}/results`)
      const jsonData = await res.json() as { results: ResultWithSuperpower[] }
      setIsLoading(false)
      setData(jsonData.results)
      console.log(jsonData)
    };
    void fetchData();
  }, [competition]);

  const columns: ColumnDef<ResultWithSuperpower>[] = [
    {
      header: "Ranking",
      accessorKey: "rank",
      cell: ({ row }) => (
        <div className="font-bold text-lg">{row.index + 1}</div>
      )
    },
    {
      header: "User",
      accessorKey: "user",
      cell: ({ row: { original: result } }) => {
        const address = result.user.address
        const isMe = address === selfAddress

        return (
          <div className="flex flex-col gap-4">
            {isMe && <p className="text-lg text-gray-400">You</p>}
            <p className={isMe ? "font-bold" : ''}>{address}</p>
            {isMe && <ClaimReward competitionId={competition.id} resultId={result.id} received={result.rewardReceived}/>}
          </div>
        )
      }
    },
    {
      header: "totalScore",
      accessorKey: "totalScore",
      cell: ({ cell }) => (
        <div className="font-bold text-lg">{cell.getValue<UserEntry['totalScore']>()}</div>
      )
    },
    {
      header: "Superpowers",
      accessorKey: "entries",
      cell: ({ cell }) => {
      const entries = cell.getValue<UserEntry['entries']>()
        return (
          <div className="flex flex-col gap-1">
            {entries.map(({ superpower }) => (
              <div key={superpower.id} className="flex gap-1">
                <Image
                  src={superpower.imageUrl}
                  alt="NFTの画像"
                  className="w-20 h-20"
                  width={160}
                  height={160}
                />
                <div>
                  <p className="text-xs font-bold">{superpower.name}</p>
                  <p className="text-xs">SCORE: {superpower.score}</p>
                  <p className="text-xs">YEAR: {superpower.year}</p>
                </div>
              </div>
            ))}
          </div>
        )
      }
    },
  ]
  
  const table = useReactTable<ResultWithSuperpower>({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  const rows = table.getRowModel().rows

  return (
    <div className="rounded-md border bg-white">
      {isLoading ? (
        <div className="flex flex-col gap-8 flex-1 justify-center items-center">
          <Loader2 className="h-20 w-20 animate-spin" />
        </div>
      ) :
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
      }
    </div>
  )
}
