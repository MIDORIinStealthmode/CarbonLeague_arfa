import prisma from "@/lib/prisma";
import {NextResponse} from "next/server";

type Params = {
  params: {
    id: string
  }
}

export const GET = async (request: Request, { params }: Params) => {
  const rewards = await prisma.competitionReward.findMany({
    where: {
      competitionId: params.id
    }
  })

  return NextResponse.json({ rewards });
}

export const PATCH = async (request: Request, { params }: Params) => {
  const rawData = await request.json()

  const data = rawData.rewards

  await prisma.$transaction([
    prisma.competitionReward.deleteMany({
      where: {
        competitionId: params.id
      }
    }),
    prisma.competitionReward.createMany({
      data: data.map((reward: any) => ({
        ...reward,
        competitionId: params.id
      }))
    })
  ])

  return NextResponse.json({ message: 'Success' });
}