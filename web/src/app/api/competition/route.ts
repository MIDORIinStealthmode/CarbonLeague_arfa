import {NextRequest, NextResponse} from "next/server";
import prisma from "@/lib/prisma";
  
type Params = {
    searchParams: {
        competitionID: string,
        newYear: string
    }
}

export const GET = async (request: NextRequest, params: Params) => {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('competitionID')
    const query2 = searchParams.get('newYear')
    
    const url = new URL(request.url);
    const competitionID = url.searchParams.get("competitionID");
    const newYear = parseInt(url.searchParams.get("newYear"));    // Step 1: 特定のcompetitionIdに紐づくCompetitionEntryを取得
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
        totalScore: entry.superpower.company.carbonEmissions[0]?.scoreReport?.totalScore??0
      }))
      .sort((a, b) => b.totalScore - a.totalScore) // totalScoreで降順ソート
      .map(entry => ({ superpowerId: entry.superpowerId, totalScore: entry.totalScore }));
  
      return NextResponse.json(sortedEntries);
  }