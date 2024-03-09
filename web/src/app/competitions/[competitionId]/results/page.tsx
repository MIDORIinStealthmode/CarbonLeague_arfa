import prisma from "@/lib/prisma";
import {ResultList} from "./ResultList";


const competitionID = "60eef0b9-d9f0-4d29-b7c2-f603107a9c7f";
const newYear = 2022;

async function getSuperpowerIDsByTotalScore(competitionID: string, newYear: number) {
    // Step 1: 特定のcompetitionIdに紐づくCompetitionEntryを取得
    const competitionEntries = await prisma.competitionEntry.findMany({
      where: { competitionId: competitionID },
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
      .map(entry => entry.superpowerId); // 最終的にsuperpowerIdの配列を返す
  
    return sortedEntries;
    console.log(sortedEntries);
  }
  
    getSuperpowerIDsByTotalScore(competitionID, newYear);