import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons, FontAwesome5 } from '@expo/vector-icons'

import colors from '../styled-components/colors'

import ProfilePage from '../pages/ProfilePage'
import TimelinePage from '../pages/TimelinePage'

import { TBottomRoutes } from '../types'
import { BottomOptions } from './styled-components/styles'

const Tab = createBottomTabNavigator()

const bottomRoutes: TBottomRoutes = [
  {
    name: 'Profile',
    component: ProfilePage,
    Icon: ({ color, size }) => (
      <FontAwesome5
        name={color === colors.primary ? 'user-alt' : 'user'}
        color={colors.tertiary}
        size={size}
      />
    )
  },
  {
    name: 'Home',
    component: TimelinePage,
    Icon: ({ color, size }) => (
      <Ionicons
        name={color === colors.primary ? 'home' : 'home-outline'}
        color={colors.tertiary}
        size={size}
      />
    )
  }
]

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={BottomOptions}
    >
      {bottomRoutes
        .map(({ name, component, Icon }) => (
          <Tab.Screen
            key={name}
            name={name}
            component={component}
            options={{
              tabBarIcon: Icon,
              tabBarShowLabel: false
            }}
          />
        ))
      }
    </Tab.Navigator>
  )
}

export default BottomNavigation