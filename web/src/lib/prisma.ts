import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

// @ts-ignore
const prisma = globalThis.prisma ?? prismaClientSingleton()

export default prisma

// @ts-ignore
if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma
