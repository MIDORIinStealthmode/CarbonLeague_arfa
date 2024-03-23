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
    where: {
      status: {
        in: ['UPCOMING', 'OPEN', 'CLOSED', 'FINISHED'],
      },
    },
    orderBy: {
      startDate: 'desc' as any,
    }
  })

  return (
    <div>
      <div className="flex justify-between">
        <div className="">
          <h1 className="font-bold text-neutral-900 text-2xl mb-2">Competition</h1>
          <p className="font-bold text-neutral-600">説明</p>
        </div>
      </div>

      <div className="rounded-md border bg-white mt-8">
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
            {competitions.map((competition) => (
              <TableRow key={competition.id}>
                <TableCell>
                  <Link href={`/competitions/${competition.id}`}>
                    {competition.name}
                  </Link>
                </TableCell>
                <TableCell>{competition.status}</TableCell>
                <TableCell>{competition.startDate.toLocaleDateString()}</TableCell>
                <TableCell>{competition.endDate.toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <EntrySheet competition={competition} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
