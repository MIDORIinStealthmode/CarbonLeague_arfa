import {inngest} from "@/lib/inngest";
import {getSuperpowerContract} from "@/lib/contracts/superpowerContract";
import prisma from "@/lib/prisma";

export const mintSuperpower = inngest.createFunction(
  { id: "mint-superpower" },
  { event: "superpower.mint" },
  async ({ event }) => {
    const { superpowerId, address, tokenId } = event.data;

    if (!tokenId) { // tokenIdが指定されていない場合は、最大のtokenIdを取得して、+1したものをtokenIdとして設定する
      const maxTokenId = await prisma.superpower.aggregate({ _max: { tokenId: true } });
      const nextTokenId = (maxTokenId._max.tokenId || -1) + 1;
      await prisma.superpower.update({where: {id: superpowerId}, data: { tokenId: nextTokenId, minted: false }});
      await inngest.send({ name: 'superpower.mint', data: { superpowerId, address, tokenId: nextTokenId } })
      return;
    } else {
      const superpowerContract = await getSuperpowerContract()
      const superpower = await prisma.superpower.findUniqueOrThrow({ where: { id: superpowerId } })

      if (!superpower.mintcalled) {
        void superpowerContract.call('safeMint', [address])
        await prisma.superpower.update({where: {id: superpowerId}, data: { mintcalled: true }})
        await inngest.send({ name: 'superpower.mint', data: { superpowerId, address, tokenId } })
        return;
      } else {
        if (superpower.minted) { return } // 既にmint済みの場合は何もしない
        await superpowerContract.call('ownerOf', [tokenId]) // tokenIdがmintされているか確認 いなければエラーが発生する
        await prisma.superpower.update({where: {id: superpowerId}, data: {minted: true}})
        return;
      }
    }
  }
)
