import React from 'react'
import { Stack, Text } from 'native-base'
import { NavigationProp } from '@react-navigation/native'

import StatusBar from '../components/StatusBar'
import Container from '../components/Container'
import colors from '../styled-components/colors'

interface TimelinePageProps {
  navigation?: NavigationProp<any>
}

const TimelinePage: React.FC<TimelinePageProps> = ({  }) => {
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
          Timeline
        </Text>
      </Stack>
    </Container>
  )
}

export default TimelinePage