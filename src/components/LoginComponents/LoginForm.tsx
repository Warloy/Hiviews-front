import React, { useState, useRef } from 'react'
import { ImageBackground, TouchableOpacity } from 'react-native'
import {
    View,
    Box,
    Text,
    VStack,
    Image,
    Icon,
    Checkbox,
    Stack,
    FormControl,
    WarningOutlineIcon,
    Button,
    Divider,
    HStack,
    Input,
    WarningTwoIcon,
  } from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import useAuthContext from '../../hooks/useAuthContext'
import useCustomToast from '../../hooks/useCustomToast'
import colors from '../../styled-components/colors'
import { IAuthContextType } from '../../interfaces/AuthContext.Interfaces'

const image = {uri: 'https://img.freepik.com/free-vector/vector-background-seamless-retro-film_2065-725.jpg?w=826&t=st=1687964006~exp=1687964606~hmac=e4d104d3e14b27fb7ba29769ef7b8625a293fd6dcab748b8d66c6aaa76266a0e'}

const LoginForm = ({}) => {
    const { showSuccessToast, showErrorToast } = useCustomToast()
    const { dispatch }:IAuthContextType = useAuthContext()

    return (
        <ImageBackground source={image} resizeMode='repeat'>
        <View
            alignItems={'center'}
            justifyContent={'flex-start'}
            minW={'100%'}
            maxH={'100%'}
            minH={'100%'}
        >
            <Box
                minH={'80%'}
                minW={'90%'}
                alignItems={'center'}
                justifyContent={'center'}
                my={10}
                backgroundColor={'rgba(255, 230, 189, 0.95)'}
                rounded={15}
                
            >
                <VStack
                    alignItems={'center'}
                    maxW={'90%'}
                    pt={5}
                    pb={2}
                >
                    <Image
                    source={require('../../assets/logoPro.png')}
                    alt='Hiviews logo'
                    h={75}
                    w={75}
                    />
                    <Text
                        bold
                        color={colors.tertiary}
                        fontSize='xl'
                    >
                        Hiviews
                    </Text>
                </VStack>
                <VStack
                    alignItems={'center'}
                    maxW={'90%'}
                    pt={3}
                    pb={1}
                >
                    <Input
                        color={colors.quaternary}
                        bgColor={colors.white}
                        focusOutlineColor={colors.quaternary}
                        invalidOutlineColor={colors.error.primary}
                        mx={3}
                        placeholder={`Nombre de usuario`}
                        w={'75%'}
                        InputLeftElement={ <Icon as={<Ionicons
                            name='person-circle-outline'
                            />}
                            ml={2} 
                            size={5}
                            color={colors.tertiary}
                            />
                        }
                    />
                </VStack>
                <VStack
                    alignItems={'center'}
                    maxW={'90%'}
                    pt={1}
                    pb={3}
                >
                    <FormControl 
                        isInvalid={true}
                        w={'100%'}
                    >
                        <Input 
                            type={'password'}
                            color={colors.quaternary}
                            bgColor={colors.white}
                            focusOutlineColor={colors.quaternary}
                            invalidOutlineColor={colors.error.primary}
                            mx={3}
                            placeholder={`Contraseña`}
                            w={'75%'}
                            InputLeftElement={ <Icon as={<Ionicons
                                name='key-outline'
                                />}
                                ml={2}
                                size={5}
                                color={colors.tertiary}
                                />
                            }
                        />
                    </FormControl>
                </VStack>
                <VStack
                    alignItems={'center'}
                    maxW={'90%'}
                    py={2}
                >
                    <Button 
                        background={colors.tertiary}
                        shadow={5}
                        rounded={5}
                        onPress={() => console.log('Login: Login button')}
                    >
                        <Stack
                            alignItems={'center'}
                            justifyContent={'center'}
                        >
                            <TouchableOpacity onPress={() => console.log('Login: Login button')}>
                                <Text
                                    bold
                                    color={colors.base}
                                >
                                    Iniciar sesión
                                </Text>
                            </TouchableOpacity>
                        </Stack>
                    </Button>
                </VStack>
                <VStack
                    alignItems={'center'}
                    maxW={'90%'}
                >
                    <HStack
                        alignItems={'center'}
                        maxW={'100%'}
                    >
                        <Text
                            color={colors.quaternary}
                            pr={1}
                        >
                            ¿Olvidaste tu contraseña?
                        </Text>
                        <TouchableOpacity onPress={() => console.log('Login: Forgot password')}>
                        <Text
                            bold
                            color={colors.tertiary}
                        >
                            Haz clic aquí 
                        </Text>
                    </TouchableOpacity>
                    </HStack>
                    
                    
                </VStack>
                <VStack
                    alignItems={'center'}
                    maxW={'90%'}
                >
                    <HStack
                        alignItems={'center'}
                        maxW={'100%'}
                    >
                        <Text
                            color={colors.quaternary}
                            pr={1}
                        >
                            ¿No tienes una cuenta?
                        </Text>
                        <TouchableOpacity onPress={() => console.log('Login: Register')}>
                            <Text
                                bold
                                color={colors.tertiary}
                            >
                                Regístrate
                            </Text>
                        </TouchableOpacity>
                    </HStack>
                </VStack>
            </Box>
        </View>
        </ImageBackground>
    )
    
}

export default LoginForm