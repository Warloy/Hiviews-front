import React, { useState, useRef } from 'react'
import { TouchableOpacity } from 'react-native'
import {
    View,
    Box,
    Text,
    VStack,
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
import useAuthContext from '../../hooks/useAuthContext'
import useCustomToast from '../../hooks/useCustomToast'
import colors from '../../styled-components/colors'
import { IAuthContextType } from '../../interfaces/AuthContext.Interfaces'

const LoginForm = ({}) => {
    const { showSuccessToast, showErrorToast } = useCustomToast()
    const { dispatch }:IAuthContextType = useAuthContext()

    return (
        <View
            alignItems={'center'}
            justifyContent={'center'}
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
                backgroundColor={colors.primary}
                
            >
                <VStack
                    alignItems={'center'}
                    maxW={'90%'}
                    py={5}
                >
                    <Text
                        color={colors.quaternary}
                    >
                        Logo
                    </Text>
                </VStack>
                <VStack
                    alignItems={'center'}
                    maxW={'90%'}
                    pt={5}
                    pb={1}
                >
                    <Input
                        color={colors.quaternary}
                        bgColor={colors.base}
                        focusOutlineColor={colors.quaternary}
                        invalidOutlineColor={colors.error.primary}
                        mx={3}
                        placeholder={`Nombre de usuario`}
                        w={'75%'}
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
                            bgColor={colors.base}
                            focusOutlineColor={colors.quaternary}
                            invalidOutlineColor={colors.error.primary}
                            mx={3}
                            placeholder={`Contraseña`}
                            w={'75%'}
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
                    >
                        <Stack
                            alignItems={'center'}
                            justifyContent={'center'}
                        >
                            <Text
                                color={colors.base}
                            >
                                Iniciar sesión
                            </Text>
                        </Stack>
                    </Button>
                </VStack>
                <VStack
                    alignItems={'center'}
                    maxW={'90%'}
                    py={5}
                >
                    <Divider my={3} w='100%' h={1} thickness='2' orientation='horizontal' bg={colors.quaternary}/>
                    <Text
                        color={colors.quaternary}
                    >
                        Tremenda puta Wilder
                    </Text>
                </VStack>
                <VStack
                    alignItems={'center'}
                    maxW={'90%'}
                    py={5}
                >
                    <Text
                        color={colors.quaternary}
                    >
                        Tremenda puta Wilder
                    </Text>
                </VStack>
            </Box>
        </View>
    )
    
}

export default LoginForm