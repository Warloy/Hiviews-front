import React from 'react'
import { Stack, Text } from 'native-base'
import { NavigationProp } from '@react-navigation/native'

import StatusBar from '../components/StatusBar'

interface LoginPageProps {
  navigation?: NavigationProp<any>
}

const LoginPage: React.FC<LoginPageProps> = ({  }) => {
  return (
    <Stack
      justifyContent='center'
      alignItems='center'
    >
      <StatusBar />
      <Text
        fontSize='6xl'
      >
        Wilder puta
      </Text>
    </Stack>
  )
}

export default LoginPage