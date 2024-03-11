import {NextRequest, NextResponse} from "next/server";
import prisma from "@/lib/prisma";
  
type Params = {
    searchParams: {
        competitionID: string,
        newYear: string
    }
}

let competitionId = "60eef0b9-d9f0-4d29-b7c2-f603107a9c7f";
let newYear = 2022;


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



      //step 3: 取得したsuperpowerIdを元に、superpowerのデータを取得する
      const superpowerIds = sortedEntries.map(entry => entry.superpowerId);

      const superpowerData = await prisma.superpower.findMany({
        where: {id: { in: superpowerIds}},
      });

      console.log(sortedEntries);
      console.log(superpowerData);
  
      return NextResponse.json(sortedEntries, superpowerData);
  }


// export const GET = async (request: NextRequest, params: Params) => {    
//       //APIコールして、コンペティションの結果（superpower, total score）を取得する
//         const apicall = async () => {
//           const res = await fetch(`/api/competition/?competitionID=${competitionId}&newYear=${newYear}`);
//           if (!res.ok) {
//             throw new Error('Fetching error');
//           }
//           const data = await res.json();
//           console.log(data);
//           const superpowerIdArray = data.map(obj => obj.superpowerId);
//           return superpowerIdArray;

//           data
//         }

//        const databasecall = async (superpowerId: string) => {
//         const superpowerData = await prisma.superpower.findMany({
//             where: {id: superpowerId},
//         });

//         const getsuperpower = async () => {
//             const superpowerIdArray = await apicall();
//             const superpowerData = superpowerIdArray.forEach((superpowerId: string) => databasecall(superpowerId));
//             return superpowerData;
//         };
//     }
//     return NextResponse.json(superpowerData);
// }

