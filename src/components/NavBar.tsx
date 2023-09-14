import { useState } from "react";
import { TouchableOpacity, useWindowDimensions } from "react-native";
import { Avatar, Button, Divider, HStack, Stack, Text, VStack } from "native-base";

import { INavBarProps } from "@/interfaces/NavBar.Interface";
import useAuthContext from "@/hooks/useAuthContext";
import { setSession } from "@/services/jwt";

import SVGImg from "@/assets/images/logo.svg";
import { colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import StyledModal from "./StyledModal";

const NavBar = ({ hidden = false }: INavBarProps) => {
  const { width } = useWindowDimensions();

  const router = useRouter();

  const {
    dispatch
  } = useAuthContext();

  const logoutButton = () => {
    console.info("Logout Button on NavBar is pressed...")
    setSession({ id: null, token: null })
    dispatch({ type: "LOGOUT" });
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
        >
          <Stack>
            <TouchableOpacity
              onPress={() => router.push("/")}
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
            <TouchableOpacity
              onPress={() => console.log("Search Nav Button is pressed...")}
            >
              <Ionicons
                name="search"
                color={colors.secondary}
                size={20}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => console.log("Notification Nav Button is pressed...")}
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
                source={require("../assets/example/avatar16.jpg")}
                bg={colors.secondary}
              >
                GR
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
                    router.push({
                      pathname: "/",
                      params: {
                        id: 1,
                        email: 'Durandal@gmail.com',
                        name: 'Durandal',
                        surname: 'Rossweise',
                        username: 'Dudu',
                        bio: 'No me pagan lo suficiente para acomodar el perfil.',
                        birthday: new Date().toString(),
                        avatar: require('../assets/example/avatar16.jpg')
                      }
                    });
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
              size="lg"
            >
              <VStack
                justifyContent="center"
                alignItems="center"
                space={2}
              >
                <Text>
                  ¿Está seguro que desea cerrar sesión?
                </Text>

                <Button.Group space={2}>
                  <Button
                    w="40"
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
                    w="40"
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