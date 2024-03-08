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
  const superpowerContract = await getSuperpowerContract()
  const res = await (await superpowerContract.call('safeMint', ['0x9fD2b1a1BEAd245825ca3F5505a20987eDC57A2A'])) as MintResponse
  const tokenId = hexToNumber(res.receipt.logs[0].topics[3])
  const superpower = await prisma.superpower.update({ where: { id }, data: { tokenId } })

  return NextResponse.json(superpower)
}
