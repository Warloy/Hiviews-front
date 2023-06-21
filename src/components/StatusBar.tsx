import React from 'react'
import { SafeAreaView, StatusBar as Bar } from 'react-native'
import { colors } from '../styled-components/colors'
import styles from './styled-components/styles'
import { IStatusBarProps } from '../interfaces/StatusBar.Interface'

const StatusBar = ({ backgroundColor = colors.primary, hidden = false, statusBarStyle = 'default' }: IStatusBarProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <Bar
        animated={true}
        backgroundColor={backgroundColor}
        barStyle={statusBarStyle}
        hidden={hidden} />
    </SafeAreaView>
  )
}

export default StatusBar