import prisma from "@/lib/prisma"
import {getUserModel} from "@/app/(app)/thirdwebAuth"
import { NextResponse } from "next/server"
import {CompetitionEntryBodySchema, UserEntry, UserEntrySchema} from "@/app/api/competitions/[id]/entries/schema";
import {CompetitionEntry} from "@/lib/schema/zod";

export const dynamic = 'force-dynamic'

type Params = {
  params: {
    id: string
  }
}

// エントリーされているものの一覧
export const GET = async (request: Request, {params}: Params) => {
  const competition = await prisma.competition.findUniqueOrThrow({where: { id: params.id }})
  // Step 1: 特定のcompetitionIdに紐づくCompetitionEntryを取得
  const competitionEntries = await prisma.competitionEntry.findMany({
    where: { competitionId: competition.id },
    include: { superpower: true }
  });
  // Step:2 ユーザーごとにgroupBy
  const entryByUser = competitionEntries.reduce<Record<string, typeof competitionEntries>>(
    (obj, competitionEntry) => {
      const userId = competitionEntry.userId
      if (!obj[userId]) obj[userId] = [];
      obj[userId].push(competitionEntry)

      return obj
    },
    {}
  )
  const users = await prisma.user.findMany({
    where: {
      id: {
        in: Object.keys(entryByUser),
      }
    }
  })
  const userAddressMap = users.reduce<Record<string, string>>((r, v) => ((r[v.id] = v.address), r), {})
  // Step: 3 ユーザーごとにtotalScoreを計算する
  const userEntries: UserEntry[] = Object.entries(entryByUser).map(([userId, entries]) => {
    const totalScore = entries.reduce(
      (sum, entry) => sum + entry.superpower.score,
      0
    )
    return {
      userId,
      userAddress: userAddressMap[userId],
      entries,
      totalScore
    }
  }).sort(
    (a, b) => b.totalScore - a.totalScore
  )

  return NextResponse.json({ userEntries });
}

// コンペにエントリー
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

  const entries = await prisma.$transaction([
    prisma.competitionEntry.deleteMany({
      where: {
        userId: user.id,
        competitionId
      }
    }),
    ...superpowers.map((superpower, i) => (
      prisma.competitionEntry.create({
        data: {
          superpowerId: superpower.id,
          userId: user.id,
          competitionId: params.id,
          order: i
        }
      })
    ))
  ])

  return NextResponse.json(entries);
}
