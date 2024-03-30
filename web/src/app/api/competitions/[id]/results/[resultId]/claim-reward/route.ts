import prisma from "@/lib/prisma";
import {NextResponse} from "next/server";
import {SuperpowerService} from "@/lib/services/Superpower";
import {inngest} from "@/lib/inngest";

type Params = {
  params: {
    id: string
    resultId: string
  }
}

export const POST = async (request: Request, { params }: Params) => {
  const result = await prisma.competitionResult.findUniqueOrThrow({
    where: { id: params.resultId },
    include: { user: true }
  })
  const rewards = await prisma.competitionReward.findMany({
    where: {
      competitionId: result.competitionId,
      rank: result.rank,
    }
  })
  const address = result.user.address

  if (result.rewardReceived) {
    return NextResponse.json({ message: 'リワードはすでに受け取っています' });
  }

  await Promise.all(rewards.map(async (reward) => {
    // ここでリワードを付与する
    if (reward.superpowerId) {
      await inngest.send({ name: 'superpower.mint',  data: { superpowerId: reward.superpowerId, address } })
    }
    if (reward.rewardAmount) {
      // sendRewardAmount(address, reward.rewardAmount)
    }
  }))

  await prisma.competitionResult.update({
    where: { id: params.resultId },
    data: { rewardReceived: true }
  })

  return NextResponse.json({ message: 'リワードを付与しました' });
}
