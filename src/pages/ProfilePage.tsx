import React from 'react'
import { Stack, Text } from 'native-base'
import { NavigationProp } from '@react-navigation/native'

import Container from '../components/Container'

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

      </Stack>
    </Container>
  )
}

export default ProfilePage