import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import {SuperpowerSchema} from "@/lib/schema/zod";

type Params = {
  params: {
    id: string
  }
}

export const GET = async (request: Request, {params}: Params) => {
  const superpower = await prisma.superpower.findUnique({ 
    where: { 
      id: params.id
    }
  })

  return NextResponse.json(superpower);
}

export const PUT = async (request: Request, {params}: Params) => {
  const rawData = await request.json()
  const data = SuperpowerSchema.omit({ id: true }).parse(rawData)
  const superpower = await prisma.superpower.update({ where: { id: params.id }, data })

  return NextResponse.json(superpower);
}
