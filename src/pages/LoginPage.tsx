import React from 'react'
import { Stack, Text } from 'native-base'
import { NavigationProp } from '@react-navigation/native'

import StatusBar from '../components/StatusBar'
import Container from '../components/Container'
import colors from '../styled-components/colors'

interface LoginPageProps {
  navigation?: NavigationProp<any>
}

const LoginPage: React.FC<LoginPageProps> = ({  }) => {
  return (
    <Container>
      <Stack
        justifyContent='center'
        alignItems='center'
        minH='100%'
        maxH='100%'
      >
        <Text
          fontSize='6xl'
        >
          Perfil
        </Text>
      </Stack>
    </Container>
  )
}

export default LoginPage