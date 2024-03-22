import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = (): PrismaClient => {
  return new PrismaClient()
}

declare global {
  var _prisma: PrismaClient
}

const prisma: PrismaClient = globalThis._prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis._prisma = prisma
