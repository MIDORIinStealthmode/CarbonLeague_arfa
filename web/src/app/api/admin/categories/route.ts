import {NextResponse} from "next/server";
import {CategorySchema} from "@/lib/schema/zod";
import prisma from "@/lib/prisma";

export const POST = async (request: Request) => {
  const rawData = await request.json()
  const data = CategorySchema.omit({ id: true }).parse(rawData)

  const category = await prisma.category.create({ data })

  return NextResponse.json(category)
}

export const GET = async (request: Request) => {
  const categories = await prisma.category.findMany()

  return NextResponse.json(categories);
}
