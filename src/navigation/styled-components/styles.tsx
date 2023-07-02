import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'
import { NativeStackNavigationOptions } from '@react-navigation/native-stack'

import colors from '../../styled-components/colors'
import { StyleSheet } from 'react-native'

export const BottomOptions: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarActiveTintColor: colors.secondary,
  tabBarInactiveTintColor: colors.gray0,
  tabBarInactiveBackgroundColor: colors.white,
  tabBarActiveBackgroundColor: colors.white,
  tabBarHideOnKeyboard: true,
  tabBarShowLabel: false,
  tabBarStyle: {
    height: '7%',
  }
}

export const StackOptions: NativeStackNavigationOptions = {
  headerStyle: {
    backgroundColor: colors.white
  },
  headerTintColor: colors.primary
}

export const styles = StyleSheet.create({
  homePage: {
    width: 45,
    height: 45,
    top: 5,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadow: 6,
    backgroundColor: colors.white,
    borderColor: colors.secondary,
    borderWidth: 1,
  }
})

export const setStyle = (color: string) => {

  const styles = StyleSheet.create({
    homePage: {
      width: 45,
      height: 45,
      top: 5,
      borderRadius: 30,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      shadow: 6,
      backgroundColor: color === colors.secondary ? colors.secondary : colors.white,
      borderColor: colors.secondary,
      borderWidth: 1,
    }
  })

  return styles.homePage
}