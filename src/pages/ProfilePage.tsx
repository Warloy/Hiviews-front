import React from 'react'
import { Stack, Text } from 'native-base'
import { NavigationProp } from '@react-navigation/native'

import StatusBar from '../components/StatusBar'
import Container from '../components/Container'
import colors from '../styled-components/colors'

interface ProfilePageProps {
  navigation?: NavigationProp<any>
}

const ProfilePage: React.FC<ProfilePageProps> = ({  }) => {
  return (
    <Container
      statusBarStyle = {'default'} 
      statusBarColor = {colors.primary} 
      hiddenStatusBar = {false}
      hiddenNavBar = {false}
      backgroundTopColor = {colors.primary}
      backgroundBottomColor = {colors.base}
    >
      <Stack
        justifyContent='center'
        alignItems='center'
      >
        <StatusBar />
        <Text
          fontSize='6xl'
        >
          Perfil
        </Text>
      </Stack>
    </Container>
  )
}

export default ProfilePage