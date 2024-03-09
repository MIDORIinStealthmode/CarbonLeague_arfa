import prisma from "@/lib/prisma"
import {getUserModel} from "@/app/api/auth/[...thirdweb]/thirdwebAuth"
import { NextResponse } from "next/server"
import {CompetitionEntryBodySchema} from "@/app/api/competitions/[id]/entry/schema";

export const dynamic = 'force-dynamic'

type Params = {
  params: {
    id: string
  }
}

export const POST = async (request: Request, {params}: Params) => {
  const user = await getUserModel()

  if (!user) {
    return new Response(null, { status: 401 })
  }

  const rawData = await request.json()
  const result = CompetitionEntryBodySchema.safeParse(rawData)

  if (!result.success) {
    return new Response(null, { status: 400 })
  }

  const superpowers = await prisma.superpower.findMany({
    where: {
      tokenId: {
        in: result.data.tokenIds
      }
    }
  });

  if (superpowers.length !== 3) {
    return new Response(null, { status: 400 })
  }
  
  const entries = await prisma.competitionEntry.createMany({
    data: superpowers.map((superpower, i) => ({
      competitionId: params.id,
      userId: user.id,
      superpowerId: superpower.id,
      order: i
    }))
  })

  return NextResponse.json(entries);
}
