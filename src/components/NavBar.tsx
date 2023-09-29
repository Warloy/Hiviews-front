import { useState } from "react";
import { TouchableOpacity, useWindowDimensions } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Avatar, Button, Divider, HStack, Stack, Text, VStack } from "native-base";

import { INavBarProps } from "@/interfaces/NavBar.Interface";
import useAuthContext from "@/hooks/useAuthContext";
import { setSession } from "@/services/jwt";

import SVGImg from "@/assets/images/logo.svg";
import { colors } from "@/constants/Colors";
import StyledModal from "./StyledModal";
import StyledTwoButtons from "./StyledTwoButtons";

import useCustomToast from "@/hooks/useCustomToast";
import useConnection from "@/hooks/useConnection";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { logout } from "@/features/user/userSlice";

const NavBar = ({ hidden = false }: INavBarProps) => {

  const { width } = useWindowDimensions();
  const router = useRouter();
  const { showSuccessToast } = useCustomToast();

  const appDispatch = useAppDispatch();

  const { isConnected, recognizeConnection } = useConnection();

  const {
    dispatch
  } = useAuthContext();

  const { user } = useAppSelector(state => state.user);

  const logoutButton = () => {
    console.info("Logout Button on NavBar is pressed...");
    showSuccessToast("Esperamos verte pronto, ¡hasta luego!");
    appDispatch(logout());
    dispatch({ type: "LOGOUT" });
    setSession(null);
  };

  const [viewModal, setViewModal] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);

  return (
    <>
      {!hidden &&
        <HStack
          mt={5}
          p={2}
          minW={width}
          alignItems="center"
          justifyContent="space-between"
          borderBottomWidth={0.2}
          borderColor={colors.gray0}
        >
          <Stack>
            <TouchableOpacity
              onPress={() => router.push("/(tabs)/feed")}
            >
              <HStack
                alignItems="flex-end"
                space={2}
              >
                <SVGImg
                  width={45}
                  height={45}
                />
                <Text
                  bold
                  fontSize="xl"
                  color={colors.primary}
                >
                  HIVIEWS
                </Text>
              </HStack>
            </TouchableOpacity>
          </Stack>

          <HStack
            alignItems="center"
            space={2}
          >
            {isConnected ?
              <StyledTwoButtons /> :
              <TouchableOpacity
                onPress={recognizeConnection}
              >
                <MaterialCommunityIcons
                  name="connection"
                  color={colors.gray2}
                  size={20}
                />
              </TouchableOpacity>
            }

            <TouchableOpacity
              onPress={() => {
                console.log("Search Nav Button is pressed...")
                router.push("/search/")
              }}
            >
              <Ionicons
                name="search"
                color={colors.secondary}
                size={20}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                console.log("Notification Nav Button is pressed...")
                router.push("/notifications/")
              }}
            >
              <Ionicons
                name="notifications-outline"
                color={colors.secondary}
                size={20}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setViewModal(true)}
            >
              <Avatar
                alignSelf="center"
                size="sm"
                source={user?.avatar}
                bg={colors.secondary}
              >
                {user?.name.charAt(0)}{user?.surname.charAt(0)}
              </Avatar>
            </TouchableOpacity>

            <StyledModal
              isOpen={viewModal}
              onClose={() => setViewModal(false)}
            >
              <VStack
                justifyContent="center"
                alignItems="center"
                space={3}
              >
                <TouchableOpacity
                  onPress={() => {
                    router.push(`/profile/${user?.id}`);
                    setViewModal(false);
                  }}
                >
                  <Text
                    bold
                    color={colors.text}
                  >
                    Ver perfil
                  </Text>
                </TouchableOpacity>

                <Divider />

                <TouchableOpacity
                  onPress={() => router.push("/")}
                >
                  <Text
                    bold
                    color={colors.text}
                  >
                    Editar perfil
                  </Text>
                </TouchableOpacity>

                <Divider />

                <TouchableOpacity
                  onPress={() => {
                    setViewModal(false);
                    setLogoutModal(true)
                  }}
                >
                  <Text
                    bold
                    color={colors.text}
                  >
                    Cerrar sesión
                  </Text>
                </TouchableOpacity>
              </VStack>
            </StyledModal>

            <StyledModal
              isOpen={logoutModal}
              onClose={() => setLogoutModal(false)}
              size="xl"
            >
              <VStack
                justifyContent="center"
                alignItems="center"
                space={3}
                w="100%"
              >
                <Text
                  bold
                  color={colors.primary}
                >
                  ¿Está seguro que desea cerrar sesión?
                </Text>

                <Button.Group space={3}>
                  <Button
                    w="20%"
                    borderRadius={50}
                    style={{
                      backgroundColor: colors.tertiary
                    }}
                    shadow={1}
                    onPress={() => setLogoutModal(false)}
                  >
                    No
                  </Button>
                  <Button
                    w="20%"
                    borderRadius={50}
                    style={{
                      backgroundColor: colors.secondary
                    }}
                    shadow={1}
                    onPress={logoutButton}
                  >
                    Sí
                  </Button>
                </Button.Group>
              </VStack>
            </StyledModal>
          </HStack>
        </HStack>
      }
    </>
  );
};

export default NavBar;