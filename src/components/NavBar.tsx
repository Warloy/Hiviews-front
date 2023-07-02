import React from 'react'
import { ScaledSize, TouchableOpacity, useWindowDimensions } from 'react-native'
import { Avatar, HStack, Image, Stack, Text } from 'native-base'

import { setSession } from '../services/jwt'

import { useNavigation } from '@react-navigation/native'
import colors from '../styled-components/colors'
import { INavBarProps } from '../interfaces/NavBar.Interface'
import { Ionicons } from '@expo/vector-icons'
import useAuthContext from '../hooks/useAuthContext'
import SVGImg  from '../assets/hilogo-7V2.svg';


const NavBar = ({ hidden = false }: INavBarProps) => {

  const layout: ScaledSize = useWindowDimensions()

  const {
    dispatch
  } = useAuthContext()

  const navigation = useNavigation()

  const logoButton = () => {
    console.log('Logo press nav button')
    setSession(null, null)
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
                
                <SVGImg
                  width={45} 
                  height={45}
                />
                <Text
                  bold
                  fontSize='xl'
                  color={colors.primary}
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
                color={colors.secondary}
                size={20}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => console.log('Notification nav button')}
            >
              <Ionicons
                name='notifications-outline'
                color={colors.secondary}
                size={20}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                console.log('Profile nav button')
                navigation?.navigate('Profile')
              }}

            >
              <Avatar
                alignSelf='center'
                size='sm'
                source={{
                  uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                }}
                bg={colors.secondary}
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