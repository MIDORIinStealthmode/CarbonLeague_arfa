import { ResultTable } from "./ResultTable";
import prisma from "@/lib/prisma";

type Params = {
  params: {
    competitionId: string
  }
}

export default async function ResultPage({ params }: Params) {
  const competition = await prisma.competition.findUniqueOrThrow({ where: { id: params.competitionId }});

  return (
    <div>
      <div className="flex justify-between">
        <div className="">
          <h1 className="font-bold text-neutral-900 text-2xl mb-2">Competition Result</h1>
          <p className="font-bold text-neutral-600">説明</p>
        </div>
      </div>

      <ResultTable competition={competition}/>
    </div>
  );
}
