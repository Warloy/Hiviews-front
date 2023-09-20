import { useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Router, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
  Button,
  FormControl,
  HStack,
  Stack,
  Text,
  VStack,
  WarningOutlineIcon
} from "native-base";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

import SVGImg from "@/assets/images/logo.svg";
import Cinema from "@/assets/resources/Movie-Night-Pink.svg"
import { colors } from "@/constants/Colors";
import useAuthContext from "@/hooks/useAuthContext";
import useLoading from "@/hooks/useLoading";
import useCustomToast from "@/hooks/useCustomToast";

import { loginDefaultValues, loginSchema } from "@/schemas/LoginSchema";
import { setSession } from "@/services/jwt";
import CardContainer from "../CardContainer";
import StyledField from "../StyledField";
import { emailColor, passwordColor } from "@/utils/colorValidators";
import { TLogin, TUser } from "@/types/User.Type";
import { loginAdapter } from "@/adapters/UserAdapter";
import { login } from "@/features/user/userSlice";
import { useAppDispatch } from "@/hooks/useRedux";

const BottomChildren = ({ router }: { router: Router }) => {
  return (
    <Stack
      w="100%"
      h="55%"
      space={3}
      alignItems="center"
      justifyContent="center"
    >
      <SVGImg
        width={60}
        height={60}
      />
      <HStack
        w="100%"
        justifyContent="center"
        alignItems="center"
        space={1}
      >
        <Text
          fontSize="sm"
          color={colors.gray4}
        >
          ¿Eres nuevo?
        </Text>
        <Text
          fontSize="sm"
          color={colors.secondary}
          onPress={() => {
            router.push("/(auth)/register")
          }}
        >
          Regístrate aquí
        </Text>
      </HStack>
    </Stack>
  );
};

const LoginForm = () => {

  const ref = useRef();

  const router = useRouter();

  const [show, setShow] = useState(false);

  const appDispatch = useAppDispatch();

  const {
    dispatch
  } = useAuthContext();

  const { isLoading, startLoading, stopLoading } = useLoading();
  const { showSuccessToast, showErrorToast } = useCustomToast();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid, errors }
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(loginSchema),
    defaultValues: loginDefaultValues
  })

  const onSubmit = async (values: TLogin) => {
    startLoading();

    console.log("Login button is pressed");

    try {

      if (!isValid) {

        errors.email && showErrorToast(errors.email.message);
        errors.password && showErrorToast(errors.password.message);

      } else {

        showSuccessToast("¡Bienvenido a Hiviews!");

        console.log("User data:", loginAdapter(values));

        const user: TUser = {
          id: "1",
          email: 'gatocuantico@gmail.com',
          name: 'Gato',
          surname: 'Cuántico',
          username: 'quantacat',
          bio: 'Gato muy cuántico del mar de Quanta.',
          birthday: new Date(1997, 11, 12).toISOString(),
          avatar: require('@/assets/example/avatar15.jpg')
        }

        const USER_ID = "1", USER_TOKEN = "token";

        dispatch(({
          type: "LOGIN",
          payload: {
            user: {
              id: USER_ID,
              token: USER_TOKEN
            }
          }
        }));

        await setSession({
          id: USER_ID,
          token: USER_TOKEN
        });

        appDispatch(login(user));

        router.push("/(tabs)/feed");

      }

    } catch (error) {
      showErrorToast(`Error: ${error}`);
    } finally {
      reset(loginDefaultValues);
      stopLoading();
    }
  }

  return (
    <KeyboardAwareScrollView>
      <CardContainer
        topChildren={
          <Cinema
            height="65%"
            width="65%"
          />
        }
        bottomChildren={
          <BottomChildren
            router={router}
          />
        }
      >
        <VStack
          minH="100%"
          maxH="100%"
          w="100%"
          space={1}
        >
          <Text
            bold
            fontSize='xl'
            textAlign='center'
            color='#8A2F62'
            pb={5}
          >
            ¡BIENVENIDO!
          </Text>

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
                        name="person"
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

          <Stack
            w="100%"
            justifyContent="center"
            alignItems="center"
          >
            <Button
              w="100%"
              isLoading={isLoading}
              isDisabled={isLoading}
              onPress={handleSubmit(onSubmit)}
              borderRadius={50}
              style={{
                backgroundColor: colors.secondary
              }}
              shadow={1}
            >
              Ingresar
            </Button>
          </Stack>

          <VStack
            pt={5}
            w="100%"
            justifyContent="center"
            alignItems="center"
            space={0}
          >
            <Text
              textAlign="center"
              color={colors.gray4}
              fontSize="xs"
            >
              ¿No recuerdas alguno de tus datos?
            </Text>
            <HStack
              justifyContent="center"
              space={1}
            >
              <Text
                textAlign="center"
                color={colors.gray4}
                fontSize="xs"
              >
                No te preocupes,
              </Text>
              <Text
                fontSize="xs"
                color={colors.secondary}
                onPress={() => router.push("/(auth)/recovery")}
              >
                ingresa aquí
              </Text>
            </HStack>
          </VStack>
        </VStack>
      </CardContainer>
    </KeyboardAwareScrollView>
  );
};

export default LoginForm;