import { useRef, useState } from "react";
import { TouchableOpacity, useWindowDimensions } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, Feather } from "@expo/vector-icons";
import { Button, Divider, FormControl, HStack, ScrollView, Stack, Text, VStack, WarningOutlineIcon } from "native-base";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CalendarPicker from "react-native-calendar-picker";

import useLoading from "@/hooks/useLoading";
import useCustomToast from "@/hooks/useCustomToast";
import { registerDefaultValues, registerSchema } from "@/schemas/RegisterSchema";
import { TRegister } from "@/types/User.Type";
import CardContainer from "../CardContainer";
import StyledField from "../StyledField";
import { birthdayColor, emailColor, nameColor, passwordColor, usernameColor } from "@/utils/colorValidators";
import { formatDate, months, shortDays } from "@/utils/formatters";
import { colors } from "@/constants/Colors";
import StyledModal from "../StyledModal";

import SignUpSVG from "@/assets/resources/SignUp-amico.svg";

const RegisterForm = () => {

  const router = useRouter();

  const ref = useRef();
  const [viewModal, setViewModal] = useState(false);
  const [username, setUsername] = useState("");

  const [show, setShow] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const { isLoading, startLoading, stopLoading } = useLoading();
  const { showSuccessToast, showErrorToast } = useCustomToast();

  const { width } = useWindowDimensions();

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
    reset
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(registerSchema),
    defaultValues: registerDefaultValues
  });

  const onSubmit = async (values: TRegister) => {
    startLoading();
    try {

      if (!isValid) {

        errors.name && showErrorToast(errors.name.message);
        errors.lastName && showErrorToast(errors.lastName.message);
        errors.birthday && showErrorToast(errors.birthday.message);
        errors.email && showErrorToast(errors.email.message)

      } else {
        setViewModal(true);
        console.log("Register values: ", values);
        showSuccessToast("¡Excelente! Tú registro fue exitoso.");
        reset(registerDefaultValues);
      }

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
        <Text
            bold
            fontSize="xl"
            textAlign="center"
            color="#8A2F62"
            pb={2}
        >
            Registro de usuarios
        </Text>
        <Divider/>
        <ScrollView
          maxH="100%"
          w="100%"
          pt={2}
        >

          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, value = "" } }) => (
              <FormControl
                isInvalid={Boolean(errors.name)}
                h={75}
              >
                <StyledField
                  ref={ref}
                  placeholder="Nombre"
                  onChangeText={onChange}
                  borderColor={nameColor(value, errors.name)}
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
                        color={nameColor(value, errors.name)}
                      />
                    </Stack>
                  }
                />
                {errors.name && (
                  <FormControl.ErrorMessage
                    leftIcon={
                      <WarningOutlineIcon
                        size="xs"
                      />
                    }
                  >
                    {errors.name.message}
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
                isInvalid={Boolean(errors.lastName)}
                h={75}
              >
                <StyledField
                  ref={ref}
                  placeholder="Apellido"
                  onChangeText={onChange}
                  borderColor={nameColor(value, errors.lastName)}
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
                        color={nameColor(value, errors.lastName)}
                      />
                    </Stack>
                  }
                />
                {errors.lastName && (
                  <FormControl.ErrorMessage
                    leftIcon={
                      <WarningOutlineIcon
                        size="xs"
                      />
                    }
                  >
                    {errors.lastName.message}
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
                isInvalid={Boolean(errors.birthday)}
                h={75}
              >
                <StyledField
                  ref={ref}
                  placeholder="Fecha de nacimiento"
                  value={formatDate(value)}
                  borderColor={birthdayColor(formatDate(value), errors.birthday)}
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
                          color={birthdayColor(formatDate(value), errors.birthday)}
                        />
                      </Stack>
                    </TouchableOpacity>
                  }
                />
                {showDatePicker &&
                  <StyledModal
                    size="xl"
                    isOpen={showDatePicker}
                  >
                    <VStack
                      justifyContent="center"
                      alignItems="center"
                      space={2}
                    >
                      <Text
                        bold
                        fontSize="md"
                        textAlign="center"
                        color="#8A2F62"
                      >
                        Fecha de nacimiento
                      </Text>
                      <Divider />
                      <CalendarPicker
                        width={width * .85}
                        previousTitle="Anterior"
                        nextTitle="Siguiente"
                        selectMonthTitle="Seleccione el mes en "
                        selectYearTitle="Selecione el año"
                        minDate={new Date(
                          new Date().getFullYear() - 100,
                          new Date().getMonth(),
                          new Date().getDate()
                        )}
                        maxDate={new Date()}
                        initialDate={new Date()}
                        months={months}
                        weekdays={shortDays}
                        todayBackgroundColor={colors.gray0}
                        selectedDayColor={colors.secondary}
                        onDateChange={(date) => onChange(new Date(date.toDate() ?? new Date()))}
                      />
                      <Divider />
                      <Button
                        w="60%"
                        borderRadius={50}
                        style={{
                          backgroundColor: colors.secondary
                        }}
                        shadow={1}
                        onPress={() => setShowDatePicker(false)}
                      >
                        Aceptar
                      </Button>
                    </VStack>
                  </StyledModal>
                }
                {errors.birthday && (
                  <FormControl.ErrorMessage
                    leftIcon={
                      <WarningOutlineIcon
                        size="xs"
                      />
                    }
                  >
                    {errors.birthday.message}
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
                isInvalid={Boolean(errors.email)}
                h={75}
              >
                <StyledField
                  ref={ref}
                  placeholder="Correo electrónico"
                  onChangeText={onChange}
                  borderColor={emailColor(value, errors.email)}
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
                        color={emailColor(value, errors.email)}
                      />
                    </Stack>
                  }
                />
                {errors.email && (
                  <FormControl.ErrorMessage
                    leftIcon={
                      <WarningOutlineIcon
                        size="xs"
                      />
                    }
                  >
                    {errors.email.message}
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
                isInvalid={Boolean(errors.username)}
                h={75}
              >
                <StyledField
                  ref={ref}
                  placeholder="Nombre de usuario"
                  onChangeText={(value) => {
                    onChange(value);
                    setUsername(value);
                  }}
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
                        color={usernameColor(value, errors.username)}
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
                {errors.username && (
                  <FormControl.ErrorMessage
                    leftIcon={
                      <WarningOutlineIcon
                        size="xs"
                      />
                    }
                  >
                    {errors.username.message}
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
                isInvalid={Boolean(errors.password)}
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
                        color={passwordColor(value, errors.password)}
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
                          color={passwordColor(value, errors.password)}
                        />
                      </TouchableOpacity>
                    </Stack>
                  }
                />
                {errors.password && (
                  <FormControl.ErrorMessage
                    leftIcon={
                      <WarningOutlineIcon
                        size="xs"
                      />
                    }
                  >
                    {errors.password.message}
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
                isInvalid={Boolean(errors.passwordConfirm)}
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
                        color={passwordColor(value, errors.passwordConfirm)}
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
                          color={passwordColor(value, errors.passwordConfirm)}
                        />
                      </TouchableOpacity>
                    </Stack>
                  }
                />
                {errors.passwordConfirm && (
                  <FormControl.ErrorMessage
                    leftIcon={
                      <WarningOutlineIcon
                        size="xs"
                      />
                    }
                  >
                    {errors.passwordConfirm.message}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>
            )}
          />
          <StyledModal
            isOpen={viewModal}
            onClose={() => setViewModal(false)}
            header="Registro completado"
            size="xl"
          >
            <VStack
              justifyContent="center"
              alignItems="center"
              space={1}
            >
              <Feather
                name="check-circle"
                size={20}
                color={colors.primary}
              />
              <Text
                mt={2}
                fontSize="sm"
                textAlign="center"
              >
                Cuando puedas, confirma tu correo electrónico con el enlace que te hemos enviado.
              </Text>
              <Text
                fontSize="sm"
                textAlign="center"
              >
                ¡Bienvenido <Text bold>{username}</Text> a Hiviews!
              </Text>
              <Button
                mt={3}
                w="60%"
                borderRadius={50}
                style={{
                  backgroundColor: colors.secondary
                }}
                shadow={1}
                onPress={() => router.push("/login")}
              >
                Aceptar
              </Button>
            </VStack>
          </StyledModal>
        </ScrollView>
        <Divider my={2}/>
        <HStack
            w="100%"
            justifyContent="center"
            alignItems="center"
            space={2}
            pb={3}
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
              isDisabled={isLoading}
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
      </CardContainer>
    </KeyboardAwareScrollView>
  );
};

export default RegisterForm;