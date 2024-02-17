import {NextResponse} from "next/server";
import {SuperpowerCreateInputSchema} from "@/lib/schema/zod";
import prisma from "@/lib/prisma";

type Params = {}

export const POST = async (request: Request, {params}: Params) => {
  const rawData = await request.json()
  console.log(rawData)
  const data = SuperpowerCreateInputSchema.parse(rawData)

  const superpower = await prisma.superpower.create({ data })

  return NextResponse.json(superpower)
}

export const GET = async (request: Request, {params}: Params) => {
  const superpowers = await prisma.superpower.findMany()

  return NextResponse.json(superpowers);
}
