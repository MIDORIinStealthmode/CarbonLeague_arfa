import {NextResponse} from "next/server";
import prisma from "@/lib/prisma";
import {SuperpowerSchema} from "@/lib/schema/zod";

export const GET = async (request: Request) => {
  const superpowers = await prisma.superpower.findMany()

  return NextResponse.json({ superpowers });
}

export const POST = async (request: Request) => {
  const rawData = await request.json()
  const data = SuperpowerSchema.omit({ id: true, tokenId: true }).parse(rawData)

  const superpower = await prisma.superpower.create({ data })

  return NextResponse.json(superpower)
}
