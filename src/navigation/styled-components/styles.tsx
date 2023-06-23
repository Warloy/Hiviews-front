import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'
import { NativeStackNavigationOptions } from '@react-navigation/native-stack'

import colors from '../../styled-components/colors'

export const BottomOptions: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarActiveTintColor: colors.primary,
  tabBarInactiveTintColor: colors.gray0,
  tabBarInactiveBackgroundColor: colors.base,
  tabBarActiveBackgroundColor: colors.base,
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