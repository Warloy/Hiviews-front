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
        name={color === colors.secondary ? 'user-alt' : 'user'}
        color={colors.secondary}
        size={size}
      />
    )
  },
  {
    name: 'Home',
    component: TimelinePage,
    Icon: ({ color, size }) => (
      <Ionicons
        name={color === colors.secondary ? 'home' : 'home-outline'}
        color={colors.secondary}
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
        .map(({ name, component, Icon }, index) => (
          <Tab.Screen
            key={index}
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