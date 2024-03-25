import {NextResponse} from "next/server";
import prisma from "@/lib/prisma";
import {CompetitionSchema} from "@/lib/schema/zod";

export const GET = async (request: Request) => {
  const competitions = await prisma.competition.findMany()

  return NextResponse.json({ competitions });
}

export const POST = async (request: Request) => {
  const rawData = await request.json()
  const data = CompetitionSchema.omit({ id: true }).parse(rawData)

  const competition = await prisma.competition.create({ data })

  return NextResponse.json(competition)
}
