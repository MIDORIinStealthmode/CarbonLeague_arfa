import {NextRequest, NextResponse} from "next/server";
import prisma from "@/lib/prisma";
  
type Params = {
    searchParams: {
        competitionID: string,
    }
}

export const GET = async (request: NextRequest, params: Params) => {
    const url = new URL(request.url);
    const competitionID = url.searchParams.get("competitionID");
    const competition = await prisma.competition.findUniqueOrThrow({
      where: { id: String(competitionID) }
    });
    const newYear = competition.year;
    // Step 1: 特定のcompetitionIdに紐づくCompetitionEntryを取得
    const competitionEntries = await prisma.competitionEntry.findMany({
      where: { competitionId: String(competitionID) },
      include: {
        superpower: {
          include: {
            company: {
              include: {
                carbonEmissions: {
                    where: { year: newYear }, // 指定された年に絞り込む
                    include: {
                        scoreReport: true
                    }
              }
            }
          }
        }
      }
    }});

    // Step 2: 取得したデータからtotalScoreを基にソート
    const sortedEntries = competitionEntries
      .map(entry => ({
        superpowerId: entry.superpowerId,
        superpowername: entry.superpower.name,
        totalScore: entry.superpower.company.carbonEmissions[0]?.scoreReport?.totalScore??0,
        imageUrl: entry.superpower.imageUrl,
        description: entry.superpower.description,
        year: entry.superpower.year
      }))
      .sort((a, b) => b.totalScore - a.totalScore) // totalScoreで降順ソート;

      return NextResponse.json({sortedEntries});
  }
