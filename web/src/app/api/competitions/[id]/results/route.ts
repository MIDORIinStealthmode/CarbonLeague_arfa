import prisma from "@/lib/prisma";
import {NextResponse} from "next/server";

type Params = {
  params: {
    id: string
  }
}

export const GET = async (request: Request, { params }: Params) => {
  const results = await prisma.competitionResult.findMany({
    where: { competitionId: params.id },
    include: { user: true, entries: { include: { superpower: true } } }
  })

  return NextResponse.json({ results });
}
