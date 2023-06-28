import React from 'react'
import { ScaledSize, TouchableOpacity, useWindowDimensions } from 'react-native'
import { Avatar, HStack, Image, Stack, Text } from 'native-base'

import colors from '../styled-components/colors'
import { INavBarProps } from '../interfaces/NavBar.Interface'
import { Ionicons } from '@expo/vector-icons'
import useAuthContext from '../hooks/useAuthContext'

const NavBar = ({ hidden = false }: INavBarProps) => {

  const layout: ScaledSize = useWindowDimensions()

  const {
    state: { user },
    dispatch
  } = useAuthContext()

  const logoButton = () => {
    console.log('Logo press nav button')
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <>
      {!hidden &&
        <HStack
          py={2}
          px={2}
          minW={layout.width}
          alignItems='center'
          justifyContent='space-between'
        >
          <Stack>
            <TouchableOpacity
              onPress={logoButton}
            >
              <HStack
                alignItems='flex-end'
                space={2}
              >
                <Image
                  source={require('../assets/logoPro.png')}
                  alt='Hiviews logo'
                  h={10}
                  w={10}
                />
                <Text
                  bold
                  fontSize='xl'
                  color={colors.tertiary}
                >
                  HIVIEWS
                </Text>
              </HStack>
            </TouchableOpacity>
          </Stack>

          <HStack
            alignItems='center'
            space={2}
          >
            <TouchableOpacity
              onPress={() => console.log('Search nav button')}
            >
              <Ionicons
                name='search'
                color={colors.white}
                size={20}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => console.log('Notification nav button')}
            >
              <Ionicons
                name='notifications-outline'
                color={colors.white}
                size={20}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => console.log('Profile nav button')}
            >
              <Avatar
                alignSelf='center'
                size='sm'
                source={{
                  uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                }}
                bg={colors.tertiary}
              >
                GR
              </Avatar>
            </TouchableOpacity>
          </HStack>
        </HStack>
      }
    </>
  )
}

export default NavBar