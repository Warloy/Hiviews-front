import React from 'react'
import { Stack, Text } from 'native-base'
import { NavigationProp } from '@react-navigation/native'

import Container from '../components/Container'
import { colors } from 'react-native-elements'

interface ProfilePageProps {
  navigation?: NavigationProp<any>
}

const ProfilePage: React.FC<ProfilePageProps> = ({ navigation }) => {
  return (
    <Container
      statusBarStyle='dark-content'
      navigation={navigation}
      statusBarColor={colors.white}
      backgroundTopColor={colors.white}
      backgroundBottomColor={colors.white}
    >
      <Stack
        justifyContent='center'
        alignItems='center'
        h='100%'
      >
        <Text>
          Profile page?
        </Text>
      </Stack>
    </Container>
  )
}

export default ProfilePage