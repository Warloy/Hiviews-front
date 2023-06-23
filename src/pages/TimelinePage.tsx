import React from 'react'
import { Stack, Text } from 'native-base'
import { NavigationProp } from '@react-navigation/native'

import StatusBar from '../components/StatusBar'
import Container from '../components/Container'
import colors from '../styled-components/colors'

interface TimelinePageProps {
  navigation?: NavigationProp<any>
}

const TimelinePage: React.FC<TimelinePageProps> = ({ }) => {
  return (
    <Container>
      <Stack
        justifyContent='center'
        alignItems='center'
        py={5}
        h='100%'
      >
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