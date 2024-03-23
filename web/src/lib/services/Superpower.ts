import {getSuperpowerContract} from "@/lib/contracts/superpowerContract";
import {MintResponse} from "@/lib/contracts/types";
import {hexToNumber} from "web3-utils";
import prisma from "@/lib/prisma";

export const SuperpowerService = {
  mint: async ({ superpowerId, address }: { superpowerId: string, address: string }) => {
    const superpowerContract = await getSuperpowerContract()
    const res = await (await superpowerContract.call('safeMint', [address])) as MintResponse
    const tokenId = Number(hexToNumber(res.receipt.logs[0].topics[3]))
    return prisma.superpower.update({where: {id: superpowerId}, data: {tokenId}});
  },
}
