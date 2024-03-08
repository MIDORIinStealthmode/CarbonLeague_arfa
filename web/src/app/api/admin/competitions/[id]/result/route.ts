import {NextResponse} from "next/server";
import {getSuperpowerContract} from "@/lib/contracts/superpowerContract";

export const dynamic = 'force-dynamic'

type Params = {
  params: {
    id: string
  }
}

// コンペの結果を作ってリワードを配布
export const POST = async (request: Request, {params}: Params) => {
  const { tokenId, toAddress } = await request.json()

  const superpower = await getSuperpowerContract()
  const approveResult = await superpower.call(
    'approve',
    [process.env.ADMIN_ADDRESS, tokenId]
  )

  const transferResult = await superpower.call(
    'safeTransferFrom',
    [process.env.ADMIN_ADDRESS, toAddress, tokenId]
  )

  return NextResponse.json({status: "success"})
}
