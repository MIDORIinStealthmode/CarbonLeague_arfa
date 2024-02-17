import {NextResponse} from "next/server";
import prisma from "@/lib/prisma";
import {SuperpowerScalarFieldEnumSchema, SuperpowerSchema} from "@/lib/schema/zod";

export const POST = async (request: Request) => {
  const rawData = await request.json()
  console.log(rawData)
  const data = SuperpowerSchema.omit({ id: true }).parse(rawData)

  const superpower = await prisma.superpower.create({ data })

  return NextResponse.json(superpower)
}

export const GET = async (request: Request) => {
  const superpowers = await prisma.superpower.findMany()

  return NextResponse.json(superpowers);
}
