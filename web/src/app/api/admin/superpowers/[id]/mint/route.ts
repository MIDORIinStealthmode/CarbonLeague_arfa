import {getSuperpowerContract} from "@/lib/contracts/superpowerContract";
import {MintResponse} from "@/lib/contracts/types";
import prisma from "@/lib/prisma";
import {NextResponse} from "next/server";
import {hexToNumber} from "web3-utils";
import {SuperpowerService} from "@/lib/services/Superpower";
import {inngest} from "@/lib/inngest";

type Params = {
  params: {
    id: string
  }
}

export const maxDuration = 10

export const POST = async (request: Request, {params: { id } }: Params) => {
  const { address } = await request.json() as { address: string }
  const superpower = await prisma.superpower.findUniqueOrThrow({ where: { id } })
  await inngest.send({ name: 'superpower.mint',  data: { superpowerId: superpower.id, address } })

  return NextResponse.json(superpower)
}
