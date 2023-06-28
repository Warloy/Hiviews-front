import React from 'react'
import { Stack, Text } from 'native-base'
import { NavigationProp } from '@react-navigation/native'

import StatusBar from '../components/StatusBar'
import Container from '../components/Container'
import colors from '../styled-components/colors'
import LoginForm from '../components/LoginComponents/LoginForm'

interface RegisterPageProps {
  navigation?: NavigationProp<any>
}

const RegisterPage: React.FC<RegisterPageProps> = ({  }) => {
  return (
    <Container>
      <Stack
        justifyContent='center'
        alignItems='center'
        h='100%'
      >
        <LoginForm/>
      </Stack>
    </Container>
  )
}

export default RegisterPage