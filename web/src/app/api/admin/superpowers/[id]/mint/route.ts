import {getSuperpowerContract} from "@/lib/contracts/superpowerContract";
import {MintResponse} from "@/lib/contracts/types";
import {hexToNumber} from "web3-utils";
import prisma from "@/lib/prisma";
import {NextResponse} from "next/server";

type Params = {
  params: {
    id: string
  }
}

export const POST = async (request: Request, {params: { id } }: Params) => {
  const { address } = await request.json() as { address: string }
  const superpowerContract = await getSuperpowerContract()
  const res = await (await superpowerContract.call('safeMint', [address])) as MintResponse
  const tokenId = hexToNumber(res.receipt.logs[0].topics[3])
  const superpower = await prisma.superpower.update({ where: { id }, data: { tokenId } })

  return NextResponse.json(superpower)
}
