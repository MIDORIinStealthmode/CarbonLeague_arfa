import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {Competition, CompetitionEntry} from "@/lib/schema/zod";
import {EntryForm} from "@/app/(app)/competitions/EntryForm";
import {getUserModel} from "@/app/api/auth/[...thirdweb]/thirdwebAuth";
import Link from "next/link";

type Props = {
  competition: Competition
}

export const EntrySheet = async ({ competition }: Props) => {
  const user = await getUserModel()
  const entry = user && await prisma.competitionEntry.findFirst({
    where: {
      competitionId: competition.id,
      userId: user.id,
    },
  }) as CompetitionEntry

  return (
    <Sheet>
      {
        competition.status === "UPCOMING" ? null :
          competition.status === 'OPEN' ? (
            user ? <SheetTrigger>{entry ? "Edit Entry" : "Entry"}</SheetTrigger> : <SheetTrigger disabled={true}>Entry</SheetTrigger>
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

        <EntryForm competition={competition} />
      </SheetContent>
    </Sheet>
  )
}
