import { EntryForm } from "../../EntryForm"
import prisma from "@/lib/prisma";

type Props = {
  params: {
    competitionId: string
  }
}

export default async function CompetitionEntryPage({ params }: Props) {
  const competition = await prisma.competition.findUniqueOrThrow({
    where: {
      id: params.competitionId,
    },
  })

  return (
    <div className="w-full flex flex-col">
      <div className="py-16">
        <h1 className="font-bold text-neutral-900 text-5xl mb-2">Entry &quot;{competition.name}&quot;</h1>
        <p className="font-bold text-neutral-600">Select 3 Superpowers.</p>
      </div>

      <EntryForm competition={competition} />
    </div>
  )
}
