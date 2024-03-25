import prisma from "@/lib/prisma";
import {NextResponse} from "next/server";
import {SuperpowerService} from "@/lib/services/Superpower";

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

  rewards.forEach((reward) => {
    // ここでリワードを付与する
    if (reward.superpowerId) {
      sendSuperpower(address, reward.superpowerId)
    }
    if (reward.rewardAmount) {
      // sendRewardAmount(address, reward.rewardAmount)
    }
  })

  await prisma.competitionResult.update({
    where: { id: params.resultId },
    data: { rewardReceived: true }
  })

  return NextResponse.json({ message: 'リワードを付与しました' });
}

// 将来的には、リワードを付与する関数はバックグラウンド処理で実行する
const sendSuperpower = async (address: string, superpowerId: string) => {
  const superpower = await SuperpowerService.mint({superpowerId, address})
}


