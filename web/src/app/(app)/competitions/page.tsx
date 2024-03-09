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
import Prisma from "@/lib/prisma";

type CompetitionStatus = 'upcoming' | '開催中' | 'finished'

type Competition = {
  id: string
  title: string
  status: CompetitionStatus
}

export default async function CompetitionsPage() {
  const competitions = await prisma.competition.findMany({
    orderBy: {
      startDate: Prisma.SortOrder.desc,
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
              <TableCell className="font-medium">{competition.id}</TableCell>
              <TableCell>
                <Link href={`/competitions/${competition.id}`}>
                  {competition.name}
                </Link>
              </TableCell>
              <TableCell>{competition.status}</TableCell>
              <TableCell>{competition.startDate.toLocaleDateString()}</TableCell>
              <TableCell>{competition.endDate.toLocaleDateString()}</TableCell>
              <TableCell className="text-right">
                <Link href={`/competitions/${competition.id}/entry`}>
                  Entry
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
