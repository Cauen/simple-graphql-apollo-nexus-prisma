import { PrismaClient } from '@prisma/client'
import { ExpressContext } from 'apollo-server-express'

const prisma = new PrismaClient()

export type Context = {
  prisma: PrismaClient
  params: ExpressContext
}

export const createContext = (e: ExpressContext): Context => ({
  prisma,
  params: e,
})
