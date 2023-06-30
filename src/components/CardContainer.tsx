import React from 'react'
import { useWindowDimensions } from 'react-native'

import { View, Stack, KeyboardAvoidingView } from 'native-base'

import styles from './styled-components/styles'
import ICardContainerProps from '../interfaces/CardContainer.Interface'


const CardContainer = ({ topChildren, children, bottomChildren }: ICardContainerProps) => {
  
  const { height } = useWindowDimensions()

  return (
    <KeyboardAvoidingView>
      <View
        minH={height}
        maxH={height}
        position='relative'
      >
        <View
          bgColor='white'
          h={height * 0.5}
          style={styles.cardContainer}
        >
          {children}
        </View>
        <Stack
          minH={height * 0.5}
          maxH={height * 0.5}
          alignItems='center'
        >
          {topChildren}
        </Stack>
        <Stack
          minH={height * 0.5}
          maxH={height * 0.5}
          bgColor='white'
          justifyContent='flex-end'
          alignItems='center'
        >
          {bottomChildren}
        </Stack>
      </View>
    </KeyboardAvoidingView>
  )
}

export default CardContainer
