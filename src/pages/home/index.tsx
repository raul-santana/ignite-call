import { Heading, Text } from '@ignite-ui/react'
import Image from 'next/image'
import { Container, Hero, Preview } from './styles'

import previewImage from '../../assets/app-preview.png'
import { ClaimUsernameForm } from './components/ClaimUsernameForm'

export default function Home() {
  return (
    <Container>
      <Hero>
        <Heading as="h1" size="4xl">
          Agendamento descomplicado
        </Heading>
        <Text size="xl">
          Conecte seu calendário e permita que as pessoas marquem agendamentos
          no seu tempo livre.
        </Text>

        <ClaimUsernameForm />
      </Hero>

      <Preview>
        <Image
          src={previewImage}
          height={400} // maior altura possível que posso mostrar essa imagem
          quality={100} // por padrão o next derruba nossa qualidade para 80%, porém, como essa é uma imagem de home/banner vamos voltar para 100%
          priority // Por padrão o next carrega a nossa página primeiro e depois a imagem, porém, como essa imagem já é exibida na viewport do usuário, vamos adicionar a propiedade priority para que ela seja carregada.
          alt="Calendário simbolizando aplicação em funcionamento"
        />
      </Preview>
    </Container>
  )
}
