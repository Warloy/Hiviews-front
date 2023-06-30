import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'
import { NativeStackNavigationOptions } from '@react-navigation/native-stack'

import colors from '../../styled-components/colors'

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