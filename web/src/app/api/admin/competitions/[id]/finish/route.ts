import prisma from "@/lib/prisma";
import {NextResponse} from "next/server";

type Params = {
  params: {
    id: string
  }
}

// コンペを終了する
//  - コンペのエントリーを集計して、ランキング(CompetitionResult)を作成する
export const POST = async (request: Request, {params}: Params) => {
  const competition = await prisma.competition.findUniqueOrThrow({where: { id: params.id }})

  // Step 1: 特定のcompetitionIdに紐づくCompetitionEntryを取得
  const competitionEntries = await prisma.competitionEntry.findMany({
    where: { competitionId: competition.id },
    include: { superpower: true }
  });

  // Step 2: EntryしたSuperpowerのスコアとYearを更新
  await Promise.all(
    competitionEntries.map(async (entry) => {
      const company = await prisma.company.findUniqueOrThrow({
        where: { id: entry.superpower.companyId },
      })
      const carbonEmission = await prisma.carbonEmission.findUniqueOrThrow({
        where: { companyId_year: { companyId: company.id, year: competition.year } }
      })
      const scoreReport = await prisma.scoreReport.findUnique({
        where: { carbonEmissionId: carbonEmission.id }
      })
      if (scoreReport && scoreReport.totalScore) {
        await prisma.superpower.update({
          where: { id: entry.superpowerId },
          data: {
            score: scoreReport.totalScore,
            year: competition.year
          }
        })
      }
    })
  )

  // Step:3 ユーザーごとにgroupBy
  const entryByUser = competitionEntries.reduce<Record<string, typeof competitionEntries>>(
    (obj, competitionEntry) => {
      const userId = competitionEntry.userId
      if (!obj[userId]) obj[userId] = [];
      obj[userId].push(competitionEntry)

      return obj
    },
    {}
  )

  // Step: 3 ユーザーごとにtotalScoreを計算してランキングをつける
  const results = Object.entries(entryByUser).map(([userId, entries]) => {
    const totalScore = entries.reduce(
      (sum, entry) => sum + entry.superpower.score,
      0
    )
    return {
      userId,
      totalScore
    }
  }).sort(
    (a, b) => b.totalScore - a.totalScore
  ).map((result, i) => {
    return {
      ...result,
      rank: i + 1
    }
  })

  // Step: 4 ステータスを更新してランキングを保存
  await prisma.$transaction([
    prisma.competitionResult.deleteMany({
      where: { competitionId: competition.id }
    }),
    prisma.competition.update({
      where: { id: competition.id },
      data: { status: 'FINISHED' }
    }),
    ...results.map((result) => prisma.competitionResult.create({
      data: {
        competitionId: competition.id,
        userId: result.userId,
        rank: result.rank,
        totalScore: result.totalScore,
        entries: {
          connect: entryByUser[result.userId].map(entry => ({ id: entry.id }))
        }
      }
    })),
  ])

  return NextResponse.json({});
}
