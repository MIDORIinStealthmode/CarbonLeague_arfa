import {getUserModel} from "@/app/(app)/thirdwebAuth";
import prisma from "@/lib/prisma";

export const GET = async (request: Request) => {
  const user = await getUserModel()

  if (!user) {
    return new Response(null, { status: 401 })
  }

  const entries = await prisma.competitionEntry.findFirst({
    where: {
      userId: user.id
    }
  })

  // エントリーがあればtrue
  const hasEntry = !!entries

  return new Response(JSON.stringify({ hasEntry }), { status: 200 })
}
