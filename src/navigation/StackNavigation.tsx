import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { TStackRoutes } from '../types'
import { StackOptions } from './styled-components/styles'

import LoginPage from '../pages/LoginPage'
import BottomNavigation from './BottomNavigation'

const Stack = createNativeStackNavigator()

const stackRoutes: TStackRoutes = [
  {
    name: 'Login',
    component: LoginPage,
    requireAuth: false,
    options: {
      headerShown: false
    }
  },
  {
    name: 'SignIn',
    component: BottomNavigation,
    requireAuth: true,
    options: {
      headerShown: false
    }
  }
]

const StackNavigation = () => {

  return (
    <Stack.Navigator
      initialRouteName={stackRoutes[1].name}
      screenOptions={StackOptions}
    >
      {stackRoutes
        .map(({ name, component, options }) => (
          <Stack.Screen
            key={name}
            name={name}
            component={component}
            options={options}
          />
        ))}
    </Stack.Navigator>
  )
}

export default StackNavigation