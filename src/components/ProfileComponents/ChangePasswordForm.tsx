import { useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
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
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import useLoading from "@/hooks/useLoading";
import useCustomToast from "@/hooks/useCustomToast";

import CardContainer from "../CardContainer";
import StyledField from "../StyledField";

import { passwordColor } from "@/utils/colorValidators";
import { passwordRestoreDefaultValues, passwordRestoreSchema } from "@/schemas/PasswordRestoreSchema";

import { colors } from "@/constants/Colors";

import PassSVG from "@/assets/resources/3-hiviews-password.svg";
import { TPasswordRestore } from "@/types/User.Type";
import { passwordRestoreAdapter } from "@/adapters/UserAdapter";

const ChangePasswordForm = ({ } : { }) => {

  const router = useRouter();
  const ref = useRef();

  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { isLoading, startLoading, stopLoading } = useLoading();
  const { showSuccessToast, showErrorToast } = useCustomToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(passwordRestoreSchema),
    defaultValues: passwordRestoreDefaultValues
  });

  const onSubmit = async (values: TPasswordRestore) => {
    startLoading();

    try {

      console.log(passwordRestoreAdapter(values));

      reset(passwordRestoreDefaultValues);
      showSuccessToast("¡Perfecto! La contraseña de tu cuenta ha sido cambiada");

      router.back();

    } catch (error) {

      console.error(error);
      showErrorToast(`Error: ${error}`);

    } finally {
      stopLoading();
    }
  }


  return (
    <KeyboardAwareScrollView>
      <CardContainer
        h={0.41}
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
          Cambiar la contraseña
        </Text>

        <Divider />

        <Text
          fontSize="xs"
          textAlign="center"
          lineHeight={14}
          color={colors.gray4}
          py={2}
        >
          Ingresa la nueva contraseña.
        </Text>

        <ScrollView
          maxH="100%"
          w="100%"
          mt={3}
        >
          <Controller
            name="newPassword"
            control={control}
            render={({ field: { onChange, value = "" } }) => (
              <FormControl
                isInvalid={Boolean(errors.newPassword)}
                h={75}
              >
                <StyledField
                  ref={ref}
                  placeholder="Nueva contraseña"
                  onChangeText={onChange}
                  secureTextEntry={!showPass}
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
                        color={passwordColor(value, errors.newPassword)}
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
                        onPress={() => setShowPass(!showPass)}
                      >
                        <Ionicons
                          name={showPass ? "eye-outline" : "eye-off-outline"}
                          size={20}
                          color={passwordColor(value, errors.newPassword)}
                        />
                      </TouchableOpacity>
                    </Stack>
                  }
                />
                {errors.newPassword && (
                  <FormControl.ErrorMessage
                    leftIcon={
                      <WarningOutlineIcon
                        size="xs"
                      />
                    }
                  >
                    {errors.newPassword.message}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>
            )}
          />
          <Controller
            name="newPasswordConfirm"
            control={control}
            render={({ field: { onChange, value = "" } }) => (
              <FormControl
                isInvalid={Boolean(errors.newPasswordConfirm)}
                h={75}
              >
                <StyledField
                  ref={ref}
                  placeholder="Ingresa nuevamente la contraseña"
                  onChangeText={onChange}
                  secureTextEntry={!showConfirm}
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
                        color={passwordColor(value, errors.newPasswordConfirm)}
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
                        onPress={() => setShowConfirm(!showConfirm)}
                      >
                        <Ionicons
                          name={showConfirm ? "eye-outline" : "eye-off-outline"}
                          size={20}
                          color={passwordColor(value, errors.newPasswordConfirm)}
                        />
                      </TouchableOpacity>
                    </Stack>
                  }
                />
                {errors.newPasswordConfirm && (
                  <FormControl.ErrorMessage
                    leftIcon={
                      <WarningOutlineIcon
                        size="xs"
                      />
                    }
                  >
                    {errors.newPasswordConfirm.message}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>
            )}
          />
        </ScrollView>
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
            onPress={() => router.back()}
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
export default ChangePasswordForm