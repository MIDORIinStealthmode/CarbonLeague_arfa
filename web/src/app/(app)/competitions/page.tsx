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

type CompetitionStatus = 'upcoming' | '開催中' | 'finished'

type Competition = {
  id: string
  title: string
  status: CompetitionStatus
}

export default function CompetitionsPage() {
  return (
    <div>
      <h1>コンペ一覧</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          
        </TableBody>
      </Table>
    </div>
  )
}
