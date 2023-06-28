import React from 'react'
import { Stack, Text } from 'native-base'
import { NavigationProp } from '@react-navigation/native'

import StatusBar from '../components/StatusBar'
import Container from '../components/Container'
import colors from '../styled-components/colors'
import LoginForm from '../components/LoginComponents/LoginForm'

interface ProfilePageProps {
  navigation?: NavigationProp<any>
}

const ProfilePage: React.FC<ProfilePageProps> = ({  }) => {
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

export default ProfilePage