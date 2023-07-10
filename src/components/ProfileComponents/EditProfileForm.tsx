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
  TextArea,
} from 'native-base'
import { NavigationProp } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { editProfileSchema } from '../../schemas/EditProfileSchema'
import colors from '../../styled-components/colors'
import Container from '../../components/Container'
import StyledField from '../../components/StyledField'
import { TouchableOpacity } from 'react-native'

interface EditProfileFormProps {
  navigation?: NavigationProp<any>
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({ navigation }) => {
  const ref = useRef()
  const [show, setShow] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
    reset
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(editProfileSchema),
  })

  const onSubmit = async (data: any) => {
    console.log(data)
    // Aquí puedes realizar la lógica para actualizar el perfil
  }

  return (
    <Container>
      <ScrollView>
        <VStack alignItems='center' space={5} p={5}>
          <Text fontSize='xl' color={colors.secondary}>
            Editar perfil
          </Text>

          <Controller
            name='username'
            control={control}
            render={({ field: { onChange, value = '' } }) => (
              <FormControl
                isInvalid={!isValid && value !== ''}
                h={75}
                w='100%'
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
                        color={colors.gray0}
                      />
                    </Stack>
                  }
                />
                {!isValid && value !== '' && (
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
            name='name'
            control={control}
            render={({ field: { onChange, value = '' } }) => (
              <FormControl
                isInvalid={!isValid && value !== ''}
                h={75}
                w='100%'
              >
                <StyledField
                  ref={ref}
                  placeholder='Nombre'
                  onChangeText={onChange}
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
                        color={colors.gray0}
                      />
                    </Stack>
                  }
                />
                {!isValid && value !== '' && (
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
                isInvalid={!isValid && value !== ''}
                h={75}
                w='100%'
              >
                <StyledField
                  ref={ref}
                  placeholder='Apellido'
                  onChangeText={onChange}
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
                        color={colors.gray0}
                      />
                    </Stack>
                  }
                />
                {!isValid && value !== '' && (
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
            name='birthday'
            control={control}
            render={({ field: { onChange, value = '' } }) => (
              <FormControl
                isInvalid={!isValid && value !== ''}
                h={75}
                w='100%'
              >
                <StyledField
                  ref={ref}
                  placeholder='Fecha de nacimiento'
                  //onChangeText={onChange}
                  InputLeftElement={
                    <Stack
                      pl={2}
                      h='full'
                      justifyContent='center'
                      alignItems='center'
                    >
                      <Ionicons
                        name='calendar-outline'
                        size={20}
                        color={colors.gray0}
                      />
                    </Stack>
                  }
                />
                {!isValid && value !== '' &&(
                  <FormControl.ErrorMessage
                    leftIcon={
                      <WarningOutlineIcon
                        size='xs'
                      />
                    }
                  >
                    {errors?.birthday?.message}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>
            )}
          />

          <Controller
            name='profilepic'
            control={control}
            render={({ field: { onChange, value = '' } }) => (
              <FormControl
                isInvalid={!isValid && value !== ''}
                h={75}
                w='100%'
              >
                {/* Aquí puedes agregar la lógica para seleccionar una imagen de perfil */}
              </FormControl>
            )}
          />

          {/* <Controller
            name='bio'
            control={control}
            render={({ field: { onChange, value = '', ...field } }) => (
              <FormControl
                isInvalid={!isValid && value !== ''}
                h={150}
                w='100%'
              >
                 <TextArea 
                  placeholder='Biografia'
                  onChangeText={onChange}
                  value={value}
                  {...field}
                />
                {!isValid && value !== '' && (
                  <FormControl.ErrorMessage
                    leftIcon={
                      <WarningOutlineIcon
                        size='xs'
                      />
                    }
                  >
                    {errors?.bio?.message}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>
            )}
          /> */}

          <Button
            onPress={handleSubmit(onSubmit)}
            disabled={!isValid}
          >
            Guardar cambios
          </Button>
        </VStack>
      </ScrollView>
    </Container>
  )
}

export default EditProfileForm
