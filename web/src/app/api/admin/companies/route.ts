import {NextResponse} from "next/server";
import {CompanyCreateInputSchema} from "@/lib/schema/zod";
import prisma from "@/lib/prisma";

type Params = {}

export const POST = async (request: Request, {params}: Params) => {
  const rawData = await request.json()
  const data = CompanyCreateInputSchema.parse(rawData)

  const company = await prisma.company.create({ data })

  return NextResponse.json(company)
}

export const GET = async (request: Request, {params}: Params) => {
  const companies = await prisma.company.findMany()

  return NextResponse.json(companies);
}
