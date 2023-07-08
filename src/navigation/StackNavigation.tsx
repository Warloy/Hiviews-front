import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { TStackRoutes } from '../types'
import { StackOptions } from './styled-components/styles'

import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import ChangePasswPage from '../pages/ChangePasswPage'
import PasswRecoveryPage from '../pages/PasswRecoveryPage'
import ProfilePage from '../pages/ProfilePage'
import BottomNavigation from './BottomNavigation'

import useAuthContext from '../hooks/useAuthContext'

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
  },
  
  {
    name: 'RegisterPage',
    component: RegisterPage,
    requireAuth: false,
    options: {
      headerShown: false
    }
  },
  {
    name: 'ChangePasswPage',
    component: ChangePasswPage,
    requireAuth: true,
    options: {
      headerShown: false
    }
  },
  {
    name: 'PasswRecoveryPage',
    component: PasswRecoveryPage,
    requireAuth: false,
    options: {
      headerShown: false
    }
  },
  {
    name: 'ProfilePage',
    component: ProfilePage,
    requireAuth: true,
    options: {
      headerShown: false
    }
  }
]

const StackNavigation = () => {

  const {
    state: { isAuthenticated }
  } = useAuthContext()

  return (
    <Stack.Navigator
      initialRouteName={stackRoutes[0].name}
      screenOptions={StackOptions}
    >
      {stackRoutes
        .filter(({ requireAuth }) => requireAuth === isAuthenticated)
        .map(({ name, component, options }, index) => (
          <Stack.Screen
            key={index}
            name={name}
            component={component}
            options={options}
          />
        ))}
    </Stack.Navigator>
  )
}

export default StackNavigation