import { View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'

import colors from '../styled-components/colors'

import ProfilePage from '../pages/ProfilePage'
import TimelinePage from '../pages/TimelinePage'
import ThreadTimelinePage from '../pages/ThreadTimelinePage'

import { TBottomRoutes } from '../types'
import { BottomOptions, setStyle, styles } from './styled-components/styles'

const Tab = createBottomTabNavigator()

const bottomRoutes: TBottomRoutes = [
  {
    name: 'Forum',
    options: {
      tabBarShowLabel: true,
      tabBarLabel: 'Foro',
    },
    component: ThreadTimelinePage,
    Icon: ({ color, size }) => (
      <MaterialCommunityIcons
        name={color === colors.secondary ? 'forum' : 'forum-outline'}
        color={colors.secondary}
        size={size}
      />
    )
  },
  {
    name: 'Home',
    component: TimelinePage,
    options: {
      tabBarShowLabel: true,
      tabBarLabel: ''
    },
    Icon: ({ color, size }) => (
      <View
        style={setStyle(color)}
      >
        <Ionicons
          name={color === colors.secondary ? 'home' : 'home-outline'}
          color={color === colors.secondary ? colors.white : colors.secondary}
          size={size}
        />
      </View>
    )
  },
  {
    name: 'Profile',
    component: ProfilePage,
    options: {
      tabBarShowLabel: true,
      tabBarLabel: 'Perfil',
    },
    Icon: ({ color, size }) => (
      <FontAwesome5
        name={color === colors.secondary ? 'user-alt' : 'user'}
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
        .map(({ name, component, Icon, options }, index) => (
          <Tab.Screen
            key={index}
            name={name}
            component={component}
            options={{
              tabBarIcon: Icon,
              ...options
            }}
          />
        ))
      }
    </Tab.Navigator>
  )
}

export default BottomNavigation