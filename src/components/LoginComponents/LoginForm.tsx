import React, { useRef, useState } from 'react'
import {
  Text,
  VStack,
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
import { loginDefaultValues, loginSchema } from '../../schemas/loginSchema'

import colors from '../../styled-components/colors'

import Cinema from '../../assets/Movie-Night-Pink.svg'
import CardContainer from '../CardContainer'

import useLoading from '../../hooks/useLoading'
import useCustomToast from '../../hooks/useCustomToast'
import StyledField from '../StyledField'
import { TouchableOpacity } from 'react-native'
import { emailValidator, passwordValidator } from '../../utils/validators'
import useAuthContext from '../../hooks/useAuthContext'
import { setSession } from '../../services/jwt'
import SVGImg  from '../../assets/hilogo-7V2.svg';


interface ILoginForm {
  navigation?: NavigationProp<any>
}

const BottomChildren = ({ navigation }: ILoginForm) => {
  return (
    <Stack
      w='100%'
      h='55%'
      space={3}
      alignItems='center'
      justifyContent='center'
    >

      <SVGImg
        width={60} 
        height={60}
      />

      <HStack
        w='100%'
        justifyContent='center'
        alignItems='center'
        space={1}
      >
        <Text
          fontSize='sm'
          color={colors.gray4}
        >
          ¿Eres nuevo?
        </Text>
        <Text
          fontSize='sm'
          color={colors.secondary}
          onPress={() => {
            console.log('Register')
            navigation?.navigate('RegisterPage')
        }}
        > 
          Regístrate aquí
        </Text>
      </HStack>
    </Stack>
  )
}

const LoginForm = ({ navigation }: ILoginForm) => {

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

  const passVal = (value: string): string => {
    if (!passwordValidator(value) && value !== '') {
      return colors.error.primary
    } else if (passwordValidator(value) && value !== '') {
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
    resolver: yupResolver(loginSchema),
    defaultValues: loginDefaultValues
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
      reset(loginDefaultValues)
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
      bottomChildren={
        <BottomChildren 
            navigation={navigation}
        />
      }
    >
      <VStack
        minH='100%'
        maxH='100%'
        w='100%'
        space={1}
      >
        <Text
          bold
          fontSize='xl'
          pb={5}
        >
          ¡BIENVENIDO!
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
                      name='person'
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

        <Stack
          w='100%'
          justifyContent='center'
          alignItems='center'
        >
          <Button
            w='100%'
            isLoading={isLoading}
            isDisabled={isLoading || !isValid}
            onPress={handleSubmit(onSubmit)}
            borderRadius={50}
            style={{
              backgroundColor: colors.secondary
            }}
            shadow={1}
          >
            Ingresar
          </Button>
        </Stack>

        <VStack
          pt={5}
          w='100%'
          justifyContent='center'
          alignItems='center'
          space={0}
        >
          <Text
            textAlign='center'
            color={colors.gray4}
            fontSize='xs'
          >
            ¿No recuerdas alguno de tus datos?
          </Text>
          <HStack
            justifyContent='center'
            space={1}
          >
            <Text
              textAlign='center'
              color={colors.gray4}
              fontSize='xs'
            >
              No te preocupes,
            </Text>
            <Text
              fontSize='xs'
              color={colors.secondary}
              onPress={() => console.log('Forget password')}
            >
              ingresa aquí
            </Text>
          </HStack>
        </VStack>


      </VStack>
    </CardContainer>
  )

}

export default LoginForm