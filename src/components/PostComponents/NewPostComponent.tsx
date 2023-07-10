import React, { useRef, useState } from 'react'
import {
  Text,
  VStack,
  ScrollView,
  Stack,
  HStack,
  FormControl,
  WarningOutlineIcon,
  Button,
  Image,
  Divider
} from 'native-base'

import { NavigationProp } from '@react-navigation/native'

import { Ionicons } from '@expo/vector-icons'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { RegisterDefaultValues, registerSchema } from '../../schemas/registerSchema'

import colors from '../../styled-components/colors'

import Cinema from '../../assets/Image post-amico.svg'
import CardContainer from '../CardContainer'

import useLoading from '../../hooks/useLoading'
import useCustomToast from '../../hooks/useCustomToast'
import StyledField from '../StyledField'
import { TouchableOpacity } from 'react-native'
import { emailValidator, passwordValidator, nameValidator, lastNameValidator, usernameValidator } from '../../utils/validators'
import { IRegisterAdapter, registerAdapter } from '../../adapters/RegisterAdapter'
import StyledModal from '../../components/StyledModal'
import SVGImg from '../../assets/Image post-amico.svg';

interface INewPostProps {
  navigation?: NavigationProp<any>
}

const NewPostComponent = ({ navigation }: INewPostProps) => {
  const ref = useRef()
  const [viewModal, setViewModal] = useState(false)

  const [show, setShow] = useState(false)
  const [isReview, setIsReview] = useState(true)

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
    formState: { isValid, errors },
    reset
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(registerSchema),
    defaultValues: RegisterDefaultValues
  })

  const onSubmit = async (values: IRegisterAdapter) => {
    startLoading()
    try {
      console.log(registerAdapter(values))
      showSuccessToast('Si se pudo Vzla')
      reset()
    } catch (error) {
      console.log(error)
      showErrorToast(`Error: ${error}`)
    }
    stopLoading()
  }

  return (
    <CardContainer
      h={0.75}
      top='10%'

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
        <HStack
            h={45}
            px={2}
            space={1}
            justifyContent='space-between'
        >
            <TouchableOpacity
                onPress={() => setIsReview(true)}
            >
                <Text
                    bold
                    fontSize='xl'
                    textAlign='center'
                    color={isReview ? '#8A2F62' : colors.gray0}
                    pb={5}
                >
                    Nueva reseña
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => setIsReview(false)}
            >
                <Text
                    bold
                    fontSize='xl'
                    textAlign='center'
                    color={isReview ? colors.gray0 : '#8A2F62'}
                    pb={5}
                >
                    Nuevo hilo
                </Text>
            </TouchableOpacity>
        </HStack>
        <Divider
            mb={2}
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
                  {errors?.name?.message}
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
                  {errors?.lastName?.message}
                </FormControl.ErrorMessage>
              )}
            </FormControl>
          )}
        />

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
                  {errors?.email?.message}
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
                  {errors?.username?.message}
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
                  {errors?.password?.message}
                </FormControl.ErrorMessage>
              )}
            </FormControl>
          )}
        />

        <Controller
          name='passwordConfirm'
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
                placeholder='Cofirmar contraseña'
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
                  {errors?.password?.message}
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
            onPress={() => navigation?.goBack()}
            borderRadius={50}
            style={{
              backgroundColor: colors.tertiary
            }}
            shadow={1}
          >
            Cancelar
          </Button>
          

          <Button
            w='40%'
            isLoading={isLoading}
            isDisabled={isLoading || !isValid}
            onPress={() => {
              handleSubmit(onSubmit);
              setViewModal(true);
            }}
            borderRadius={50}
            style={{
              backgroundColor: colors.secondary
            }}
            shadow={1}
          >
            Registrarse
          </Button>
    

        </HStack>
        <StyledModal
              isOpen={viewModal}
              onClose={() => setViewModal(false)}
            >
              <VStack
                justifyContent='center'
                alignItems='center'
                space={3}
              >
                {/* <Icon size="5" mt="0.5" color="emerald.500" /> */}
                
                <SVGImg
                    width={60} 
                    height={60}
                  />

                <Text textAlign={'center'} fontSize="lg" bold color={'#863A6F'}>Registro completado.</Text>
                  <Text textAlign={'center'}>
                    Se ha enviado un código de verificación a tu dirección de correo electrónico.
                  </Text>
                  <Button
                    w='60%'
                    borderRadius={50}
                    style={{
                      backgroundColor: colors.secondary
                    }}
                    shadow={1}
                    onPress={() => navigation?.navigate('Login')}
                  >
                    Aceptar
                  </Button>
              </VStack>
            </StyledModal>


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

export default NewPostComponent