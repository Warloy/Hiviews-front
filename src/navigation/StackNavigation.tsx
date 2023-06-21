import { createNativeStackNavigator } from '@react-navigation/native-stack'

import LoginPage from '../pages/LoginPage'

import { TStackRoutes } from '../types'

const Stack = createNativeStackNavigator()

const stackRoutes: TStackRoutes = [
  {
    name: 'Login',
    component: LoginPage,
    requireAuth: false,
    options: {
      headerShown: false
    }
  }
]

const StackNavigation = () => {

  return (
    <Stack.Navigator
      initialRouteName={stackRoutes[0].name}
      screenOptions={{
        headerStyle: {
          backgroundColor: '#F1F1F1'
        },
        headerTintColor: 'd85817'
      }}
    >
      {stackRoutes
        .filter(({ requireAuth }) => !requireAuth)
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