
import { useRef } from "react";
import { useRouter } from "expo-router";
import {
  Text,
  ScrollView,
  Stack,
  HStack,
  FormControl,
  WarningOutlineIcon,
  Button,
  Divider,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { passwordRecoveryDefaultValues, passwordRecoverySchema } from "@/schemas/PasswordRecoverySchema";

import { colors } from "@/constants/Colors";

import CardContainer from "../CardContainer";
import StyledField from "../StyledField";

import useLoading from "@/hooks/useLoading";
import useCustomToast from "@/hooks/useCustomToast";

import { TPasswordRecovery } from "@/types/User.Type";
import { passwordRecoveryAdapter } from "@/adapters/UserAdapter";
import { emailColor } from "@/utils";

import PassSVG from "@/assets/resources/3-hiviews-password.svg";

const PasswordRecoveryForm = () => {

  const ref = useRef();
  const router = useRouter();
  const dummy = false;

  const { isLoading, startLoading, stopLoading } = useLoading();
  const { showSuccessToast, showErrorToast } = useCustomToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(passwordRecoverySchema),
    defaultValues: passwordRecoveryDefaultValues
  });

  const onSubmit = async (values: TPasswordRecovery) => {
    startLoading()
    try {

      console.log(passwordRecoveryAdapter(values));

      showSuccessToast("¡Excelente! Ahora, revisa tu correo");

      reset(passwordRecoveryDefaultValues);

    } catch (error) {

      console.log(error);
      showErrorToast(`Error: ${error}`);

    } finally {
      stopLoading();
    }
  }


  return (
    <KeyboardAwareScrollView>
      <CardContainer
        h={0.35}
        top="30%"
        topChildren={
          <PassSVG
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
          Recuperar Contraseña
        </Text>

        <Divider />

        <Text
          fontSize="xs"
          textAlign="center"
          lineHeight={14}
          color={colors.gray4}
          py={2}
        >
          Ingresa tu correo electrónico y sigue los pasos para recuperar tu contraseña.
        </Text>

        <ScrollView
          maxH="100%"
          w="100%"
          mt={2}
        >
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
                {errors?.email && (
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
        </ScrollView>
        { dummy && <Text
          fontSize="xs"
          textAlign="center"
          color={colors.secondary}
          onPress={() => {
            router.push("/(auth)/recovery/Goose")
          }}
        >
          Dominio total del mundo
        </Text>}
        <HStack
          w="100%"
          justifyContent="center"
          alignItems="center"
          space={2}
          my={2}
          pb={2}
        >
          <Button
            w="45%"
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
            w="45%"
            isLoading={isLoading}
            isDisabled={isLoading}
            onPress={handleSubmit(onSubmit)}
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
export default PasswordRecoveryForm