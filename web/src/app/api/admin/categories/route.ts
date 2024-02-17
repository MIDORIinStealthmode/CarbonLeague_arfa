import {NextResponse} from "next/server";
import {CategoryCreateInputSchema} from "@/lib/schema/zod";
import prisma from "@/lib/prisma";

type Params = {}

export const POST = async (request: Request, {params}: Params) => {
  const rawData = await request.json()
  const data = CategoryCreateInputSchema.parse(rawData)

  const category = await prisma.category.create({ data })

  return NextResponse.json(category)
}

export const GET = async (request: Request, {params}: Params) => {
  const categories = await prisma.category.findMany()

  return NextResponse.json(categories);
}
