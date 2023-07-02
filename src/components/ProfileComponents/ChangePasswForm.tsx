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
import { ChangePasswDefaultValues,changePasswSchema } from '../../schemas/changePasswSchema'

import colors from '../../styled-components/colors'

import Cinema from '../../assets/Movie-Night-Pink.svg'
import CardContainer from '../CardContainer'

import useLoading from '../../hooks/useLoading'
import useCustomToast from '../../hooks/useCustomToast'
import StyledField from '../StyledField'
import { TouchableOpacity } from 'react-native'
import {passwordValidator} from '../../utils/validators'
import useAuthContext from '../../hooks/useAuthContext'
import { setSession } from '../../services/jwt'


interface IChangePasswForm {
    navigation?: NavigationProp<any>
  }

const ChangePasswForm = ({ navigation }: IChangePasswForm) => {
  const ref = useRef()

  const [show, setShow] = useState(false)

  const { dispatch } = useAuthContext()

  const { isLoading, startLoading, stopLoading } = useLoading()
  const { showSuccessToast, showErrorToast } = useCustomToast()



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
    resolver: yupResolver(changePasswSchema),
    defaultValues: ChangePasswDefaultValues
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
      reset(ChangePasswDefaultValues)
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
          Cambiar contraseña
        </Text>

        
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
                placeholder='Contraseña actual'
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
                placeholder='Nueva contraseña'
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
                placeholder='Confirmar contraseña'
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
            borderRadius='full'
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
            borderRadius='full'
            style={{
              backgroundColor: colors.secondary
            }}
            shadow={1}
          >
            Cambiar contraseña
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

export default ChangePasswForm

