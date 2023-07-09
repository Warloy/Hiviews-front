import React, { useState } from 'react'
import { TouchableOpacity, useWindowDimensions } from 'react-native'
import { Avatar, Button, HStack, Stack, Text, VStack, Icon,Menu} from 'native-base';

import { setSession } from '../services/jwt'

import colors from '../styled-components/colors'
import { INavBarProps } from '../interfaces/NavBar.Interface'
import { Ionicons } from '@expo/vector-icons'
import useAuthContext from '../hooks/useAuthContext'
import SVGImg from '../assets/1-hilogo-oficial.svg';
import StyledModal from './StyledModal'


const NavBar = ({ navigation, logout, hidden = false }: INavBarProps) => {

  const layout = useWindowDimensions()

  const {
    dispatch
  } = useAuthContext()


  const logoutButton = () => {
    console.log('Logout button')
    setSession(null, null)
    dispatch({ type: 'LOGOUT' })
  }

  const [viewModal, setViewModal] = useState(false)
  const [logoutModal, setLogoutModal] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false);


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
              onPress={() => navigation?.navigate('Reviews')}
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
              onPress={() =>
                setViewModal(true)
              }
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

            <StyledModal
              isOpen={viewModal}
              onClose={() => setViewModal(false)}
            >
              <VStack
                justifyContent='center'
                alignItems='center'
                space={2}
              >
                
                <TouchableOpacity
                  onPress={() => navigation?.navigate('ProfilePage')}
                >
                  
                  <Text>
                    Perfil
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  onPress={() => navigation?.navigate('ChangePasswPage')}
                >
                  
                  <Text>
                    Cambiar Contraseña
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setViewModal(false)
                    setLogoutModal(true)
                  }}
                  
                >
                  <Text>
                    Cerrar sesión
                  </Text>
                </TouchableOpacity>

              </VStack>
            </StyledModal>

            <StyledModal
              isOpen={logoutModal}
              onClose={() => setLogoutModal(false)}
            >
              <VStack
                justifyContent='center'
                alignItems='center'
                space={2}
              >
                
                <Text>
                  ¿Está seguro que desea cerrar sesión?
                </Text>

                <Button.Group space={2}>
                  <Button
                    w='40%'
                    borderRadius={50}
                    style={{
                      backgroundColor: colors.tertiary
                    }}
                    shadow={1}
                    onPress={() => setLogoutModal(false)}
                  >
                    No
                  </Button>

                  <Button
                    w='40%'
                    borderRadius={50}
                    style={{
                      backgroundColor: colors.secondary
                    }}
                    shadow={1}
                    onPress={logoutButton}
                  >
                    Sí
                  </Button>
                </Button.Group>

              </VStack>
            </StyledModal>
          </HStack>
        </HStack>
      }
    </>
  )
}

export default NavBar