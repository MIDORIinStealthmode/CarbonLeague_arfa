import {NextResponse} from "next/server";
import {CompanySchema} from "@/lib/schema/zod";
import prisma from "@/lib/prisma";

export const POST = async (request: Request) => {
  const rawData = await request.json()
  const data = CompanySchema.omit({ id: true }).parse(rawData)

  const company = await prisma.company.create({ data })

  return NextResponse.json(company)
}

export const GET = async (request: Request) => {
  const companies = await prisma.company.findMany()

  return NextResponse.json(companies);
}
