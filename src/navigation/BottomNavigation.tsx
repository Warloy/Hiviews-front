import { View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons, FontAwesome5, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'

import colors from '../styled-components/colors'

import TimelinePage from '../pages/TimelinePage'
import ThreadTimelinePage from '../pages/ThreadTimelinePage'
import NewPostPage from '../pages/NewPostPage'

import { TBottomRoutes } from '../types'
import { BottomOptions, setStyle, styles } from './styled-components/styles'

const Tab = createBottomTabNavigator()

const bottomRoutes: TBottomRoutes = [
  {
    name: 'Reviews',
    options: {
      tabBarShowLabel: true,
      tabBarLabel: 'Reseñas',
    },
    component: TimelinePage,
    Icon: ({ color, size }) => (
      <MaterialCommunityIcons
        name={color === colors.secondary ? 'movie-open' : 'movie-open-outline'}
        color={colors.secondary}
        size={size}
      />
    )
  },
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
    name: 'NewPost',
    component: NewPostPage,
    options: {
      tabBarShowLabel: true,
      tabBarLabel: ''
    },
    Icon: ({ color, size }) => (
      <View
        style={setStyle(color)}
      >
        <FontAwesome
          name={color === colors.secondary ? 'plus' : 'plus'}
          color={color === colors.secondary ? colors.white : colors.secondary}
          size={size}
        />
      </View>
    )
  },
  {
    name: 'Reviews-all',
    options: {
      tabBarShowLabel: true,
      tabBarLabel: 'Explorar',
    },
    component: TimelinePage,
    Icon: ({ color, size }) => (
      <Ionicons
        name={color === colors.secondary ? 'compass' : 'compass-outline'}
        color={colors.secondary}
        size={size}
      />
    )
  },
  {
    name: 'Forum-all',
    options: {
      tabBarShowLabel: true,
      tabBarLabel: 'Trending',
    },
    component: ThreadTimelinePage,
    Icon: ({ color, size }) => (
      <Ionicons
        name={color === colors.secondary ? 'flame' : 'flame-outline'}
        color={colors.secondary}
        size={size}
      />
    )
  },
  /*{
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
  }*/
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