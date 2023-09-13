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
import { Ionicons } from '@expo/vector-icons'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { colors } from "@/constants/Colors";
import Passw from '@/assets/resources/3-hiviews-password.svg'
import CardContainer from '../CardContainer'
import StyledField from '../StyledField'
import useLoading from '@/hooks/useLoading'
import useCustomToast from '@/hooks/useCustomToast'
import { passwordColor } from "@/utils/colorValidators";
import useAuthContext from '@/hooks/useAuthContext'
import { IPasswRestoreAdapter, PasswRestoreAdapter } from '@/adapters/PasswRestoreAdapter'
import { useRouter } from 'expo-router'
import { passwRestoreDefaultValues, passwRestoreSchema } from '@/schemas/PasswRestoreSchema'
import { TouchableOpacity } from 'react-native'


const PasswRestoreForm = ({ token }: { token: string | string[] }) => {
  const router = useRouter();
  const ref = useRef()
  const [show, setShow] = useState(false)
  const { dispatch } = useAuthContext()

  const { isLoading, startLoading, stopLoading } = useLoading()
  const { showSuccessToast, showErrorToast } = useCustomToast()

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
    reset
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(passwRestoreSchema),
    defaultValues: passwRestoreDefaultValues
  })


  const onSubmit = async (values: IPasswRestoreAdapter) => {
    startLoading()
    try {
      console.log(PasswRestoreAdapter(values))
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
            Ingresa la nueva contraseña. El token utilizado es: {token}
        </Text>
        <Divider/>
        <ScrollView
            maxH='100%'
            w='100%'
            mt={3}      
        >
            <Controller
            name="newpassword"
            control={control}
            render={({ field: { onChange, value = "" } }) => (
              <FormControl
                isInvalid={errors.newpassword ? true : false}
                h={75}
              >
                <StyledField
                  ref={ref}
                  placeholder="Nueva contraseña"
                  onChangeText={onChange}
                  secureTextEntry={!show}
                  InputLeftElement={
                    <Stack
                      pl={2}
                      h="full"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Ionicons
                        name="lock-closed"
                        size={20}
                        color={passwordColor(value, errors.newpassword)}
                      />
                    </Stack>
                  }
                  InputRightElement={
                    <Stack
                      pr={2}
                      h="full"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <TouchableOpacity
                        onPress={() => setShow(!show)}
                      >
                        <Ionicons
                          name={show ? "eye-outline" : "eye-off-outline"}
                          size={20}
                          color={passwordColor(value, errors.newpassword)}
                        />
                      </TouchableOpacity>
                    </Stack>
                  }
                />
                {errors.newpassword && (
                  <FormControl.ErrorMessage
                    leftIcon={
                      <WarningOutlineIcon
                        size="xs"
                      />
                    }
                  >
                    {errors.newpassword.message}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>
            )}
          />
          <Controller
            name="newpasswordconfirm"
            control={control}
            render={({ field: { onChange, value = "" } }) => (
              <FormControl
                isInvalid={errors.newpasswordconfirm ? true : false}
                h={75}
              >
                <StyledField
                  ref={ref}
                  placeholder="Ingresa nuevamente la contraseña"
                  onChangeText={onChange}
                  secureTextEntry={!show}
                  InputLeftElement={
                    <Stack
                      pl={2}
                      h="full"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Ionicons
                        name="lock-closed"
                        size={20}
                        color={passwordColor(value, errors.newpasswordconfirm)}
                      />
                    </Stack>
                  }
                  InputRightElement={
                    <Stack
                      pr={2}
                      h="full"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <TouchableOpacity
                        onPress={() => setShow(!show)}
                      >
                        <Ionicons
                          name={show ? "eye-outline" : "eye-off-outline"}
                          size={20}
                          color={passwordColor(value, errors.newpasswordconfirm)}
                        />
                      </TouchableOpacity>
                    </Stack>
                  }
                />
                {errors.newpasswordconfirm && (
                  <FormControl.ErrorMessage
                    leftIcon={
                      <WarningOutlineIcon
                        size="xs"
                      />
                    }
                  >
                    {errors.newpasswordconfirm.message}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>
            )}
          />
        </ScrollView>
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
export default PasswRestoreForm