import { Avatar, Heading, Text } from '@ignite-ui/react'
import { Container, UserHeader } from './styles'
import { GetStaticPaths, GetStaticProps } from 'next'
import { prisma } from '@/lib/prisma'
import { ScheduleForm } from './ScheduleForm'
import { NextSeo } from 'next-seo'

interface ScheduleProps {
  user: {
    name: string
    bio: string
    avatarUrl: string
  }
}

export default function Schedule({ user }: ScheduleProps) {
  return (
    <>
      <NextSeo title={`Agendar com ${user.name} | Ignite Call`} />
      <Container>
        <UserHeader>
          <Avatar src={user.avatarUrl} />
          <Heading> {user.name} </Heading>
          <Text> {user.bio} </Text>
        </UserHeader>

        <ScheduleForm />
      </Container>
    </>
  )
}

// Em uma página estática, quando temos um parâmetro dinâmico, como o username que é passado através da URL, é necessário que tenhamos o getStaticPaths para indicar com quais parâmetros vamos gerar o build... Porém nesse caso, vamos deixar ele vazio já que teremos diversos usuários e nesse caso a página estática será gerada no momento de acesso do usuário.
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking', // quando o usuário tentar acessar uma página estática que ainda não está pronta, ele vai buscar o dado no server side e vai gerar a página e aí sim irá permitir o acesso.
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const username = String(params?.username)

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      user: {
        name: user.name,
        bio: user.bio,
        avatarUrl: user.avatar_url,
      },
    },
    revalidate: 60 * 60 * 24, // 1 day
  }
}
