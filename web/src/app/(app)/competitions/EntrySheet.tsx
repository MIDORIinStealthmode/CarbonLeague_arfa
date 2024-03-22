import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {Competition, CompetitionEntry, Superpower} from "@/lib/schema/zod";
import {EntryForm} from "@/app/(app)/competitions/EntryForm";
import {getUserModel} from "@/app/(app)/thirdwebAuth";
import Link from "next/link";
import prisma from "@/lib/prisma";
import {Button} from "@/components/ui/button";

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
        competition.status === "UPCOMING" ? null : // 開始前はエントリーできない
          competition.status === 'OPEN' ? (// OPENはエントリー
            user ? (
              <SheetTrigger asChild>
                <Button>
                  {
                    entries ? "Edit Entry" : "Entry" // エントリー済みなら編集、未エントリーならエントリー
                  }
                </Button>
              </SheetTrigger>
            ) : (
              <Button disabled>
                Entry
              </Button>
            )
          ) :
            competition.status === 'CLOSED' ? null : // CLOSEDはエントリーできない
              competition.status === 'FINISHED' ? ( // FINISHEDは結果を見る
                <Link href={`/competitions/${competition.id}`}>
                  <Button>
                    Result
                  </Button>
                </Link>
              ) : null
      }
      <SheetContent hideClose className="max-w-full w-full sm:w-full sm:max-w-full bg-white bg-opacity-75">
        <div className="absolute inset-0 bg-[url('/logo.webp')] bg-no-repeat bg-center bg-cover -z-10 opacity-20"/>
        <SheetHeader>
          <SheetTitle>Entry &quot;{competition.name}&quot;</SheetTitle>
        </SheetHeader>

        <EntryForm competition={competition} entries={entries} />
      </SheetContent>
    </Sheet>
  )
}
