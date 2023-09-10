import { useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, Feather } from "@expo/vector-icons";
import { Button, FormControl, HStack, ScrollView, Stack, Text, VStack, WarningOutlineIcon } from "native-base";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DateTimePicker from "@react-native-community/datetimepicker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import useLoading from "@/hooks/useLoading";
import useCustomToast from "@/hooks/useCustomToast";
import { registerDefaultValues, registerSchema } from "@/schemas/RegisterSchema";
import { TRegister } from "@/types/User.Type";
import CardContainer from "../CardContainer";
import StyledField from "../StyledField";
import { emailValidator, lastNameValidator, nameValidator, passwordValidator, usernameValidator } from "@/utils/validators";
import { birthdayColor, emailColor, nameColor, passwordColor, usernameColor } from "@/utils/colorValidators";
import { formatDate, locale } from "@/utils/formatters";
import { colors } from "@/constants/Colors";
import StyledModal from "../StyledModal";

import SignUpSVG from "@/assets/resources/SignUp-amico.svg";

const RegisterForm = () => {

  const router = useRouter();

  const ref = useRef();
  const [viewModal, setViewModal] = useState(false);

  const [show, setShow] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const { isLoading, startLoading, stopLoading } = useLoading();
  const { showSuccessToast, showErrorToast } = useCustomToast();

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
    reset
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(registerSchema),
    defaultValues: registerDefaultValues
  });

  const onSubmit = async (values: TRegister) => {
    startLoading();
    try {
      console.log("Register values: ", values);
      showSuccessToast("¡Excelente! Tú registro fue exitoso.");
      reset(registerDefaultValues);
    } catch (error) {
      showErrorToast(`Error: ${error}`);
    } finally {
      stopLoading();
    }
  }

  return (
    <KeyboardAwareScrollView>
      <CardContainer
        h={0.75}
        top="18%"
        topChildren={
          <SignUpSVG
            height="65%"
            width="65%"
          />
        }
      >
        <ScrollView
          minH="100%"
          maxH="100%"
          w="100%"
        >
          <Text
            bold
            fontSize="xl"
            textAlign="center"
            color="#8A2F62"
            pb={5}
          >
            Registro de usuarios
          </Text>

          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, value = "" } }) => (
              <FormControl
                isInvalid={
                  !nameValidator(value) && value !== ""
                }
                h={75}
              >
                <StyledField
                  ref={ref}
                  placeholder="Nombre"
                  onChangeText={onChange}
                  borderColor={nameColor(value)}
                  InputLeftElement={
                    <Stack
                      pl={2}
                      h="full"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Ionicons
                        name="person"
                        size={20}
                        color={nameColor(value)}
                      />
                    </Stack>
                  }
                />
                {nameValidator(value) ? null : (
                  <FormControl.ErrorMessage
                    leftIcon={
                      <WarningOutlineIcon
                        size="xs"
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
            name="lastName"
            control={control}
            render={({ field: { onChange, value = "" } }) => (
              <FormControl
                isInvalid={
                  !lastNameValidator(value) && value !== ""
                }
                h={75}
              >
                <StyledField
                  ref={ref}
                  placeholder="Apellido"
                  onChangeText={onChange}
                  borderColor={nameColor(value)}
                  InputLeftElement={
                    <Stack
                      pl={2}
                      h="full"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Ionicons
                        name="person"
                        size={20}
                        color={nameColor(value)}
                      />
                    </Stack>
                  }
                />
                {lastNameValidator(value) ? null : (
                  <FormControl.ErrorMessage
                    leftIcon={
                      <WarningOutlineIcon
                        size="xs"
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
            name="birthday"
            control={control}
            render={({ field: { onChange, value = new Date() } }) => (
              <FormControl
                isInvalid={
                  !birthdayColor(formatDate(value)) && formatDate(value) !== ""
                }
                h={75}
              >
                <StyledField
                  ref={ref}
                  placeholder="Fecha de nacimiento"
                  value={formatDate(value)}
                  borderColor={birthdayColor(formatDate(value))}
                  isReadOnly
                  InputLeftElement={
                    <TouchableOpacity
                      onPress={() => setShowDatePicker(true)}
                    >
                      <Stack
                        pl={2}
                        h="full"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Ionicons
                          name="calendar-outline"
                          size={20}
                          color={birthdayColor(formatDate(value))}
                        />
                      </Stack>
                    </TouchableOpacity>
                  }
                />
                {showDatePicker &&
                  <DateTimePicker
                    testID="dateTimePicker"
                    mode="date"
                    is24Hour
                    display="spinner"
                    locale={locale}
                    minimumDate={new Date(1923, 0, 1)}
                    maximumDate={new Date()}
                    positiveButton={{
                      label: "Aceptar",
                      textColor: colors.secondary
                    }}
                    negativeButton={{
                      label: "Cancelar",
                      textColor: colors.error.primary
                    }}
                    onChange={(event, date) => {
                      onChange(date ?? new Date())
                      setShowDatePicker(false)
                    }}
                    value={value}
                  />
                }
                {birthdayColor(formatDate(value)) ? null : (
                  <FormControl.ErrorMessage
                    leftIcon={
                      <WarningOutlineIcon
                        size="xs"
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
            name="email"
            control={control}
            render={({ field: { onChange, value = "" } }) => (
              <FormControl
                isInvalid={
                  !emailValidator(value) && value !== ""
                }
                h={75}
              >
                <StyledField
                  ref={ref}
                  placeholder="Correo electrónico"
                  onChangeText={onChange}
                  borderColor={emailColor(value)}
                  InputLeftElement={
                    <Stack
                      pl={2}
                      h="full"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Ionicons
                        name="at-circle-outline"
                        size={20}
                        color={emailColor(value)}
                      />
                    </Stack>
                  }
                />
                {emailValidator(value) ? null : (
                  <FormControl.ErrorMessage
                    leftIcon={
                      <WarningOutlineIcon
                        size="xs"
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
            name="username"
            control={control}
            render={({ field: { onChange, value = "" } }) => (
              <FormControl
                isInvalid={
                  !usernameValidator(value) && value !== ""
                }
                h={75}
              >
                <StyledField
                  ref={ref}
                  placeholder="Nombre de usuario"
                  onChangeText={onChange}
                  InputLeftElement={
                    <Stack
                      pl={2}
                      h="full"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Ionicons
                        name="people-outline"
                        size={20}
                        color={usernameColor(value)}
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

                      </TouchableOpacity>
                    </Stack>
                  }
                />
                {usernameValidator(value) ? null : (
                  <FormControl.ErrorMessage
                    leftIcon={
                      <WarningOutlineIcon
                        size="xs"
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
            name="password"
            control={control}
            render={({ field: { onChange, value = "" } }) => (
              <FormControl
                isInvalid={
                  !passwordValidator(value) && value !== ""
                }
                h={75}
              >
                <StyledField
                  ref={ref}
                  placeholder="Contraseña"
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
                        color={passwordColor(value)}
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
                          color={passwordColor(value)}
                        />
                      </TouchableOpacity>
                    </Stack>
                  }
                />
                {passwordValidator(value) ? null : (
                  <FormControl.ErrorMessage
                    leftIcon={
                      <WarningOutlineIcon
                        size="xs"
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
            name="passwordConfirm"
            control={control}
            render={({ field: { onChange, value = "" } }) => (
              <FormControl
                isInvalid={
                  !passwordValidator(value) && value !== ""
                }
                h={75}
              >
                <StyledField
                  ref={ref}
                  placeholder="Cofirmar contraseña"
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
                        color={passwordColor(value)}
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
                          color={passwordColor(value)}
                        />
                      </TouchableOpacity>
                    </Stack>
                  }
                />
                {passwordValidator(value) ? null : (
                  <FormControl.ErrorMessage
                    leftIcon={
                      <WarningOutlineIcon
                        size="xs"
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
            w="100%"
            justifyContent="center"
            alignItems="center"
            space={2}
          >
            <Button
              w="40%"
              onPress={() => router.back()}
              borderRadius={50}
              style={{
                backgroundColor: colors.tertiary
              }}
              shadow={1}
            >
              Cancelar
            </Button>


            <Button
              w="40%"
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
              justifyContent="center"
              alignItems="center"
              space={3}
            >
              <Feather
                name="check-circle"
                size={20}
                color={colors.primary}
              />

              <Text textAlign={"center"} fontSize="lg" bold color={"#863A6F"}>Registro completado.</Text>
              <Text textAlign={"center"}>
                Se ha enviado un código de verificación a tu dirección de correo electrónico.
              </Text>
              <Button
                w="60%"
                borderRadius={50}
                style={{
                  backgroundColor: colors.secondary
                }}
                shadow={1}
                onPress={() => router.push("/(login)/_layout")}
              >
                Aceptar
              </Button>
            </VStack>
          </StyledModal>


          <VStack
            pt={5}
            w="100%"
            justifyContent="center"
            alignItems="center"
            space={0}
          >
            <HStack
              justifyContent="center"
              space={1}
            >

            </HStack>
          </VStack>


        </ScrollView>
      </CardContainer>
    </KeyboardAwareScrollView>
  );
};

export default RegisterForm;