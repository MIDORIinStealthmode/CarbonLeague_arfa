import {NextResponse} from "next/server";
import prisma from "@/lib/prisma";

type Params = {
  params: {
    tokenId: string
  }
}

export const GET = async (request: Request, {params}: Params) => {
  const superpower = await prisma.superpower.findFirstOrThrow({
    where: {
      tokenId: Number(params.tokenId)
    },
    include: {
      company: {
        select: {
          name: true,
        }
      },
      category: {
        select: {
          name: true,
        }
      },
    }
  })

  const metadata = {
    "image": superpower.imageUrl,
    "external_url": `${process.env.HOST}/superpowers/${superpower.tokenId}`,
    "description": superpower.description,
    "name": superpower.name,
    "attributes": [
      { "trait_type": "rank", "value": superpower.rank },
      { "trait_type": "score", "value": superpower.company.scoreReport.totalScore },
      { "trait_type": "company", "value": superpower.company.name },
      { "trait_type": "year", "value": superpower.year },
      { "trait_type": "category", "value": superpower.category.name }
    ],
  }

  return NextResponse.json(metadata)
}
