import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import {CompetitionSchema} from "@/lib/schema/zod";

type Params = {
  params: {
    id: string
  }
}

export const GET = async (request: Request, {params}: Params) => {
  const competition = await prisma.competition.findUnique({
    where: {
      id: params.id
    }
  })
  if (!competition) {
    return NextResponse.json({
      message: 'Not found'
    }, {
      status: 404
    });
  }

  return NextResponse.json({
    ...competition,
    startDate: competition.startDate.toISOString().split('T')[0],
    endDate: competition.endDate.toISOString().split('T')[0],
  });
}

export const PUT = async (request: Request, {params}: Params) => {
  const rawData = await request.json()
  const data = CompetitionSchema.omit({ id: true }).parse(rawData)
  const competition = await prisma.competition.update({ where: { id: params.id }, data })

  return NextResponse.json(competition);
}
