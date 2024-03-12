import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {Competition, CompetitionEntry, Superpower} from "@/lib/schema/zod";
import {EntryForm} from "@/app/(app)/competitions/EntryForm";
import {getUserModel} from "@/app/(app)/thirdwebAuth";
import Link from "next/link";
import prisma from "@/lib/prisma";

type Props = {
  competition: Competition
}

export const EntrySheet = async ({ competition }: Props) => {
  const user = await getUserModel()
  const entries = user && await prisma.competitionEntry.findMany({
    where: {
      competitionId: competition.id,
      userId: user.id,
    },
    include: {
      superpower: true,
    },
    orderBy: {
      order: 'asc' as any,
    }
  }) as (CompetitionEntry & { superpower: Superpower })[]

  return (
    <Sheet>
      {
        competition.status === "UPCOMING" ? null :
          competition.status === 'OPEN' ? (
            user ? <SheetTrigger>{entries ? "Edit Entry" : "Entry"}</SheetTrigger> : <SheetTrigger disabled={true}>Entry</SheetTrigger>
          ) :
            competition.status === 'CLOSED' ? null :
              competition.status === 'FINISHED' ? (
                <Link href={`/competitions/${competition.id}`}>Result</Link>
              ) : null
      }
      <SheetContent hideClose className="max-w-full w-full sm:w-full sm:max-w-full">
        <SheetHeader>
          <SheetTitle>Entry &quot;{competition.name}&quot;</SheetTitle>
        </SheetHeader>

        <EntryForm competition={competition} entries={entries} />
      </SheetContent>
    </Sheet>
  )
}
