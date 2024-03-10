import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from "next/link";
import prisma from "@/lib/prisma";
import {EntrySheet} from "@/app/(app)/competitions/EntrySheet";

export const dynamic="force-dynamic"

export default async function CompetitionsPage() {
  const competitions = await prisma.competition.findMany({
    orderBy: {
      startDate: 'desc' as any,
    }
  })

  return (
    <div>
      <h1>Competitions</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Start</TableHead>
            <TableHead>End</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
        </TableBody>
      </Table>
    </div>
  )
}
