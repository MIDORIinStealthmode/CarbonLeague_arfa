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
  // 認証
  const user = await getUserModel()

  if (!user) {
    return new Response(null, { status: 401 })
  }

  // パラメータ
  const rawData = await request.json()
  const result = CompetitionEntryBodySchema.safeParse(rawData)
  const competitionId = params.id

  if (!result.success) {
    return new Response(null, { status: 400 })
  }

  const superpowers = await prisma.superpower.findMany({
    where: {
      tokenId: {
        in: result.data.tokenIds.map(i => Number(i))
      }
    }
  });

  if (superpowers.length !== 3) {
    return new Response(null, { status: 400 })
  }

  const query = superpowers.map((superpower, i) => (
    prisma.competitionEntry.upsert({
      where: {
        competitionId_userId_order: {
          userId: user.id,
          competitionId: params.id,
          order: i
        }
      },
      update: {
        superpowerId: superpower.id,
      },
      create: {
        superpowerId: superpower.id,
        userId: user.id,
        competitionId: params.id,
        order: i
      },
    })
  ))
  const entries = await prisma.$transaction([...query])

  return NextResponse.json(entries);
}
