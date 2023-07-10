import React, { useState } from 'react'
import { TouchableOpacity, useWindowDimensions } from 'react-native'
import { Avatar, Button, HStack, Stack, Text, VStack, Icon, Menu, Divider} from 'native-base';

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
                source={require('../assets/example/avatar16.jpg')}
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
                space={3}
              >
                
                <TouchableOpacity
                  onPress={() => {navigation?.navigate('ProfilePage', {user:{
                    id: 1,
                    email: 'Durandal@gmail.com',
                    name: 'Durandal',
                    surname: 'Rossweise',
                    username: 'Dudu',
                    bio: 'No me pagan lo suficiente para acomodar el perfil.',
                    birthday: new Date(),
                    avatar: require('../assets/example/avatar16.jpg'),
                    }})
                    setViewModal(false)}
                  }
                >
                  
                  <Text
                    color={colors.text}
                    bold
                  >
                    Ver perfil
                  </Text>
                </TouchableOpacity>
                <Divider />
                <TouchableOpacity
                  onPress={() => navigation?.navigate('ChangePasswPage')}
                >
                  
                  <Text
                    color={colors.text}
                    bold
                  >
                    Editar perfil
                  </Text>
                </TouchableOpacity>
                <Divider />
                <TouchableOpacity
                  onPress={() => navigation?.navigate('ChangePasswPage')}
                >
                  
                  <Text
                    color={colors.text}
                    bold
                  >
                    Cambiar contraseña
                  </Text>
                </TouchableOpacity>
                <Divider />
                <TouchableOpacity
                  onPress={() => {
                    setViewModal(false)
                    setLogoutModal(true)
                  }}
                  
                >
                  <Text
                    color={colors.text}
                    bold
                  >
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