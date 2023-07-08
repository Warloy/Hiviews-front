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
} from 'native-base'

import { NavigationProp } from '@react-navigation/native'

import { Ionicons } from '@expo/vector-icons'
import { Controller, set, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { passwRecoveryDefaultValues, passwRecoverySchema } from '../../schemas/passwRecoverySchema'

import colors from '../../styled-components/colors'

import Passw from '../../assets/3-hiviews-password.svg'
import CardContainer from '../CardContainer'

import useLoading from '../../hooks/useLoading'
import useCustomToast from '../../hooks/useCustomToast'
import StyledField from '../StyledField'
import {emailValidator} from '../../utils/validators'
import useAuthContext from '../../hooks/useAuthContext'
import { IPasswRecoveryAdapter, PasswRecoveryAdapter } from '../../adapters/PasswRecoveryAdapter'


interface IPasswRecoveryForm {
    navigation?: NavigationProp<any>
  }

const PasswRecoveryForm = ({ navigation }: IPasswRecoveryForm) => {
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

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
    reset
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(passwRecoverySchema),
    defaultValues: passwRecoveryDefaultValues
  })



  const onSubmit = async (values: IPasswRecoveryAdapter) => {
    startLoading()
    try {
      console.log(PasswRecoveryAdapter(values))
      showSuccessToast('Front es mi pasion')
      reset()
    } catch (error) {
      console.log(error)
      showErrorToast(`Error: ${error}`)
    }
    stopLoading()
  }


  return (
    <CardContainer

    h={0.35}
    top='30%'

      topChildren={
        <Passw
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
          Recuperar Contraseña
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
                  {errors?.email?.message}
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

            w='45%'
            height={60}
            onPress={() => navigation?.navigate('Login')}
            borderRadius={50}
            style={{
              backgroundColor: colors.tertiary
            }}
            shadow={1}
          >
            <Text
              textAlign={'center'}
              color={'white'}
              fontSize={'xs'}
              lineHeight={14}
           > 
              Volver al inicio 
            </Text>
          </Button>
          

          <Button 
            w='45%'
            height={60}
            isLoading={isLoading}
            isDisabled={isLoading || !isValid}
            onPress={() => {
              handleSubmit(onSubmit);
            }}
            borderRadius={50}
            style={{
              backgroundColor: colors.secondary
            }}
            shadow={1}
          >
           <Text
              textAlign={'center'}
              color={'white'}
              fontSize={'xs'}
              lineHeight={14}
           > 
           Restablecer mis credenciales 
            </Text> 
            
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

export default PasswRecoveryForm


