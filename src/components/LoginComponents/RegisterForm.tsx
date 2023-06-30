import React, { useRef, useState } from 'react'
import {
  Text,
  VStack,
  ScrollView,
  Image,
  Stack,
  HStack,
  FormControl,
  Icon,
  WarningOutlineIcon,
  Button,
} from 'native-base'

import { NavigationProp } from '@react-navigation/native'

import { Ionicons } from '@expo/vector-icons'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { RegisterDefaultValues,registerSchema } from '../../schemas/registerSchema'

import colors from '../../styled-components/colors'

import Cinema from '../../assets/MovieNight-amico.svg'
import CardContainer from '../CardContainer'

import useLoading from '../../hooks/useLoading'
import useCustomToast from '../../hooks/useCustomToast'
import StyledField from '../StyledField'
import { TouchableOpacity } from 'react-native'
import { emailValidator, passwordValidator, nameValidator, lastNameValidator,usernameValidator} from '../../utils/validators'
import useAuthContext from '../../hooks/useAuthContext'
import { setSession } from '../../services/jwt'


interface IRegisterForm {
    navigation?: NavigationProp<any>
  }

const RegisterForm = ({ navigation }: IRegisterForm) => {
  const ref = useRef()

  const [show, setShow] = useState(false)

  const { dispatch } = useAuthContext()

  const { isLoading, startLoading, stopLoading } = useLoading()
  const { showSuccessToast, showErrorToast } = useCustomToast()

  const emailVal = (value: string): string => {
    if (!emailValidator(value) && value !== '') {
      return colors.error.primary
    } else if (emailValidator(value) && value !== '') {
      return colors.primary
    } else {
      return colors.gray0
    }
  }

  const usernameVal = (value: string): string => {
    if (!usernameValidator(value) && value !== '') {
      return colors.error.primary
    } else if (usernameValidator(value) && value !== '') {
      return colors.primary
    } else {
      return colors.gray0
    }
  }

  const passVal = (value: string): string => {
    if (!passwordValidator(value) && value !== '') {
      return colors.error.primary
    } else if (passwordValidator(value) && value !== '') {
      return colors.primary
    } else {
      return colors.gray0
    }
  }

  const nameVal = (value: string): string => {
    if (!nameValidator(value) && value !== '') {
      return colors.error.primary
    } else if (nameValidator(value) && value !== '') {
      return colors.primary
    } else {
      return colors.gray0
    }
  }

  const lastNameVal = (value: string): string => {
    if (!lastNameValidator(value) && value !== '') {
      return colors.error.primary
    } else if (lastNameValidator(value) && value !== '') {
      return colors.primary
    } else {
      return colors.gray0
    }
  }

  const {
    control,
    handleSubmit,
    formState: { isValid },
    reset
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(registerSchema),
    defaultValues: RegisterDefaultValues
  })



  const onSubmit = async (value: any) => {
    startLoading()
    try {
      showSuccessToast(`¡Bienvenido a Hiviews!`)
      await setSession('1', 'token')
      dispatch({
        type: 'LOGIN',
        payload: {
          user: {
            id: '1',
            token: 'token',
            user: 'user'
          }
        }
      })
      reset(RegisterDefaultValues)
    } catch (error) {
      showErrorToast(`Error: ${error}`)
    }
    stopLoading()
  }

  return (
    <CardContainer
      topChildren={
        <Cinema
          height='65%'
          width='65%'
        />
      }
    >
      <ScrollView
        minH='100%'
        maxH='100%'
        w='100%'        
      >
        <Text
          bold
          fontSize='xl'
          textAlign='center'
          color= '#8A2F62'
          pb={5}
        >
          Registro de usuarios
        </Text>

        <Controller
          name='email'
          control={control}
          render={({ field: { onChange, value = '' } }) => (
            <FormControl
              isInvalid={
                !emailValidator(value) && value !== ''
              }
              h={75}
            >
              <StyledField
                ref={ref}
                placeholder='Correo electrónico'
                onChangeText={onChange}
                borderColor={emailVal(value)}
                InputLeftElement={
                  <Stack
                    pl={2}
                    h='full'
                    justifyContent='center'
                    alignItems='center'
                  >
                    <Ionicons
                      name='at-circle-outline'
                      size={20}
                      color={emailVal(value)}
                    />
                  </Stack>
                }
              />
              {emailValidator(value) ? null : (
                <FormControl.ErrorMessage
                  leftIcon={
                    <WarningOutlineIcon
                      size='xs'
                    />
                  }
                >
                  El correo electrónico no es válido
                </FormControl.ErrorMessage>
              )}
            </FormControl>
          )}
        />

        
        <Controller
          name='username'
          control={control}
          render={({ field: { onChange, value = '' } }) => (
            <FormControl
              isInvalid={
                !usernameValidator(value) && value !== ''
              }
              h={75}
            >
              <StyledField
                ref={ref}
                placeholder='Nombre de usuario'
                onChangeText={onChange}
                InputLeftElement={
                  <Stack
                    pl={2}
                    h='full'
                    justifyContent='center'
                    alignItems='center'
                  >
                    <Ionicons
                      name='people-outline'
                      size={20}
                      color={usernameVal(value)}
                    />
                  </Stack>
                }
                InputRightElement={
                  <Stack
                    pr={2}
                    h='full'
                    justifyContent='center'
                    alignItems='center'
                  >
                    <TouchableOpacity
                      onPress={() => setShow(!show)}
                    >
            
                    </TouchableOpacity>
                  </Stack>
                }
              />
              {usernameValidator(value) ? null : (
                <FormControl.ErrorMessage
                  leftIcon={
                    <WarningOutlineIcon
                      size='xs'
                    />
                  }
                >
                  El nombre de usuario no es válido
                </FormControl.ErrorMessage>
              )}
            </FormControl>
          )}
        />


        <Controller
          name='password'
          control={control}
          render={({ field: { onChange, value = '' } }) => (
            <FormControl
              isInvalid={
                !passwordValidator(value) && value !== ''
              }
              h={75}
            >
              <StyledField
                ref={ref}
                placeholder='Contraseña'
                onChangeText={onChange}
                secureTextEntry={!show}
                InputLeftElement={
                  <Stack
                    pl={2}
                    h='full'
                    justifyContent='center'
                    alignItems='center'
                  >
                    <Ionicons
                      name='lock-closed'
                      size={20}
                      color={passVal(value)}
                    />
                  </Stack>
                }
                InputRightElement={
                  <Stack
                    pr={2}
                    h='full'
                    justifyContent='center'
                    alignItems='center'
                  >
                    <TouchableOpacity
                      onPress={() => setShow(!show)}
                    >
                      <Ionicons
                        name={show ? 'eye-outline' : 'eye-off-outline'}
                        size={20}
                        color={passVal(value)}
                      />
                    </TouchableOpacity>
                  </Stack>
                }
              />
              {passwordValidator(value) ? null : (
                <FormControl.ErrorMessage
                  leftIcon={
                    <WarningOutlineIcon
                      size='xs'
                    />
                  }
                >
                  La contraseña no es válida
                </FormControl.ErrorMessage>
              )}
            </FormControl>
          )}
        />



        <Controller
          name='name'
          control={control}
          render={({ field: { onChange, value = '' } }) => (
            <FormControl
              isInvalid={
                !nameValidator(value) && value !== ''
              }
              h={75}
            >
              <StyledField
                ref={ref}
                placeholder='Nombre'
                onChangeText={onChange}
                borderColor={nameVal(value)}
                InputLeftElement={
                  <Stack
                    pl={2}
                    h='full'
                    justifyContent='center'
                    alignItems='center'
                  >
                    <Ionicons
                      name='person'
                      size={20}
                      color={nameVal(value)}
                    />
                  </Stack>
                }
              />
              {nameValidator(value) ? null : (
                <FormControl.ErrorMessage
                  leftIcon={
                    <WarningOutlineIcon
                      size='xs'
                    />
                  }
                >
                  El nombre no es válido
                </FormControl.ErrorMessage>
              )}
            </FormControl>
          )}
        />

        <Controller
          name='lastName'
          control={control}
          render={({ field: { onChange, value = '' } }) => (
            <FormControl
              isInvalid={
                !lastNameValidator(value) && value !== ''
              }
              h={75}
            >
              <StyledField
                ref={ref}
                placeholder='Apellido'
                onChangeText={onChange}
                borderColor={lastNameVal(value)}
                InputLeftElement={
                  <Stack
                    pl={2}
                    h='full'
                    justifyContent='center'
                    alignItems='center'
                  >
                    <Ionicons
                      name='person'
                      size={20}
                      color={lastNameVal(value)}
                    />
                  </Stack>
                }
              />
              {lastNameValidator(value) ? null : (
                <FormControl.ErrorMessage
                  leftIcon={
                    <WarningOutlineIcon
                      size='xs'
                    />
                  }
                >
                  El apellido no es válido
                </FormControl.ErrorMessage>
              )}
            </FormControl>
          )}
        />

        
              
        <HStack
          w='100%'
          justifyContent='center'
          alignItems='center'
          space={2}
        >
          <Button
            w='40%'
            isLoading={isLoading}
            isDisabled={isLoading || !isValid}
            onPress={handleSubmit(onSubmit)}
            borderRadius={50}
            style={{
              backgroundColor: colors.secondary
            }}
            shadow={1}
          >
            Cancelar
          </Button>
          
          <Button
            w='40%'
            isLoading={isLoading}
            isDisabled={isLoading || !isValid}
            onPress={handleSubmit(onSubmit)}
            borderRadius={50}
            style={{
              backgroundColor: colors.secondary
            }}
            shadow={1}
          >
            Registrarse
          </Button>

        </HStack>

        <VStack
          pt={5}
          w='100%'
          justifyContent='center'
          alignItems='center'
          space={0}
        >
          <HStack
            justifyContent='center'
            space={1}
          >
  
          </HStack>
        </VStack>


      </ScrollView>
    </CardContainer>
  )

}

export default RegisterForm


