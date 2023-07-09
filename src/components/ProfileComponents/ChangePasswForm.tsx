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
import { ChangePasswDefaultValues,changePasswSchema } from '../../schemas/changePasswSchema'

import colors from '../../styled-components/colors'

import Passw from '../../assets/3-hiviews-password.svg'
import CardContainer from '../CardContainer'

import useLoading from '../../hooks/useLoading'
import useCustomToast from '../../hooks/useCustomToast'
import StyledField from '../StyledField'
import { TouchableOpacity } from 'react-native'
import {passwordValidator} from '../../utils/validators'
import useAuthContext from '../../hooks/useAuthContext'
import { setSession } from '../../services/jwt';
import { IChangePasswAdapter, changePasswAdapter } from '../../adapters/ChangePasswAdapter'


interface IChangePasswForm {
    navigation?: NavigationProp<any>
  }

const ChangePasswForm = ({ navigation }: IChangePasswForm) => {
  const ref = useRef()
  const [currentpassw, setCurrentPassw] = useState(false)
  const [newpassw, setNewPassw] = useState(false)
  const [confirmNewPassw, setConfirmNewPassw] = useState(false)
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



  const onSubmit = async (values: IChangePasswAdapter) => {
    startLoading()
    try {
      console.log(changePasswAdapter(values))
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

    h={0.55}
    top='25%'

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
                secureTextEntry={!currentpassw}
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
                      onPress={() => setCurrentPassw(!currentpassw)}
                    >
                      <Ionicons
                        name={currentpassw ? 'eye-outline' : 'eye-off-outline'}
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
          name='newPassw'
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
                secureTextEntry={!newpassw}
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
                      onPress={() => setNewPassw(!newpassw)}
                    >
                      <Ionicons
                        name={newpassw ? 'eye-outline' : 'eye-off-outline'}
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
          name='newPasswConfirm'
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
                placeholder='Confirmar nueva contraseña'
                onChangeText={onChange}
                secureTextEntry={!confirmNewPassw}
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
                      onPress={() => setConfirmNewPassw(!confirmNewPassw)}
                    >
                      <Ionicons
                        name={confirmNewPassw ? 'eye-outline' : 'eye-off-outline'}
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
            height={50}
            onPress={() => navigation?.navigate('TimelinePage')}
            borderRadius={50}
            style={{
              backgroundColor: colors.tertiary
            }}
            shadow={1}
          >
            <Text
              textAlign={'center'}
              color={'white'}
              fontSize={'sm'}
              lineHeight={14}
           > 
              Cancelar 
            </Text>
          </Button>
          

          <Button 
            w='40%'
            height={50}
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
              fontSize={'sm'}
              lineHeight={14}
           > 
           Cambiar contraseña 
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

export default ChangePasswForm

