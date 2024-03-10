import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from "next/link";
import prisma from "@/lib/prisma";
import {EntrySheet} from "@/app/(app)/competitions/EntrySheet";

type CompetitionStatus = 'upcoming' | '開催中' | 'finished'

type Competition = {
  id: string
  title: string
  status: CompetitionStatus
}

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
  )
}
