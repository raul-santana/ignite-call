import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient({
  log: ['query'], // o prisma traz o log de todas as querys executadas no bd dentro do nosso terminal
})
