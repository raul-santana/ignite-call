// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from '@/lib/prisma'
import { setCookie } from 'nookies'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const { name, username } = req.body

  const userExists = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (userExists) {
    return res.status(400).json({
      message: 'Username already exists',
    })
  }

  const user = await prisma.user.create({
    data: {
      name,
      username,
    },
  })

  setCookie({ res }, '@ignitecall:userId', user.id, {
    // expires: new Date(), // onde passo em formato de data
    maxAge: 60 * 60 * 24 * 7, // onde passo em formato de segundos ou seja, no caso estamos passando: 7 dias.
    path: '/', // também posso passar em quais rotas esse cookie será acessível. Então se eu passar "/teste" somente as rotas que começarem dessa forma poderão acessar esse cookie. Como colocamos a raiz "/" ele estará disponível em toda a aplicação
  })

  return res.status(201).json(user)
}
