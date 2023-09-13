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
  Divider,
} from 'native-base'
import { NavigationProp } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { Controller, set, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { passwRecoveryDefaultValues, passwRecoverySchema } from '@/schemas/PasswRecoverySchema'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { colors } from "@/constants/Colors";
import Passw from '@/assets/resources/3-hiviews-password.svg'
import CardContainer from '../CardContainer'
import StyledField from '../StyledField'
import useLoading from '@/hooks/useLoading'
import useCustomToast from '@/hooks/useCustomToast'
import {emailValidator} from '@/utils/validators'
import useAuthContext from '@/hooks/useAuthContext'
import { IPasswRecoveryAdapter, PasswRecoveryAdapter } from '@/adapters/PasswRecoveryAdapter'
import { useRouter } from 'expo-router'


const PasswRecoveryForm = () => {
  const router = useRouter();
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
    <KeyboardAwareScrollView>
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
        <Text
            bold
            fontSize='xl'
            textAlign='center'
            color= '#8A2F62'
            pb={2}
        >
            Recuperar Contraseña
        </Text>
        <Text
            fontSize='sm'
            textAlign='center'
            lineHeight={14}
            color={colors.gray4}
            pb={5}
        >
            Ingresa tu correo electrónico y sigue los pasos para recuperar tu contraseña.
        </Text>
        <Divider/>
        <ScrollView
            maxH='100%'
            w='100%'
            mt={3}      
        >
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
        </ScrollView>
        <Text
          fontSize="sm"
          textAlign='center'
          color={colors.secondary}
          onPress={() => {
            router.push("/recovery/Goose")
          }}
        >
          Dominio total del mundo
        </Text>
        <HStack
            w='100%'
            justifyContent='center'
            alignItems='center'
            space={2}
            my={2}
            pb={2}
        >
            <Button
                w='45%'
                onPress={() => {
                    router.back()
                }}
                borderRadius={50}
                style={{
                backgroundColor: colors.tertiary
                }}
                shadow={1}
            >
                Volver
            </Button>
            <Button 
                w='45%'
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
                Restablecer
            </Button>
        </HStack>
      </CardContainer>
    </KeyboardAwareScrollView>
  )
}
export default PasswRecoveryForm