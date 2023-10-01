import React, { ReactNode, useState } from "react";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Stack, Text, HStack, VStack, Divider, Avatar } from "native-base";

import { colors } from "@/constants/Colors";
import { TUser } from "@/types/User.Type";
import useLoading from "@/hooks/useLoading";
import reviews from "@/static/reviewsData";
import threads from "@/static/threadsData";
import users from "@/static/userData";
import useAuthContext from "@/hooks/useAuthContext";
import { cutText } from "@/utils";
import { useAppSelector } from "@/hooks/useRedux";
import ThreadList from "../MainComponents/Generic/ThreadList";
import ReviewList from "../MainComponents/Generic/ReviewList";
import UserList from "../MainComponents/Generic/UserList";

interface IEditProfileProps {
  children?: ReactNode;
}

const EditProfileComponent = ({ children }: IEditProfileProps) => {

  const router = useRouter();

  const authUser = useAppSelector(state => state.user.user);

  return (
    <Stack
      bgColor={colors.white}
      minH="100%"
    >
      <HStack
        alignItems="center"
        px={5}
        pt={3}
        space={1}
      >
        <Stack
          w="24%"
          h="100%"
        >
          <Avatar
            alignSelf="center"
            size="lg"
            source={user?.avatar}
            bg={colors.secondary}
          >
            {user?.name.charAt(0)}{user?.surname.charAt(0)}
          </Avatar>
        </Stack>
        <VStack
          w="48%"
        >
          <Text
            fontSize={18}
            bold
            color={colors.gray3}
          >
            {user ? `${user.name} ${user.surname}` : "Perfil no encontrado"}
          </Text>
          {user &&
            <Text
              fontSize={16}
              mb={5}
              color={colors.gray2}
            >
              {`@${user.username}`}
            </Text>
          }
        </VStack>
        <Stack
          w="30%"
          alignSelf="flex-start"
          mt={3}
          alignItems="center"
        >
          {user && user.id !== authUser?.id &&
            <TouchableOpacity
              onPress={handleFollowToggle}
              style={{
                backgroundColor: isFollowing ? colors.primary : colors.secondary,
                paddingVertical: 4,
                paddingHorizontal: 13,
                borderRadius: 4,
                alignItems: "center"
              }}
            >
              <Text
                fontSize={14}
                bold
                textAlign="center"
                color={colors.button.text}
              >
                {isFollowing ? "Siguiendo" : "Seguir"}
              </Text>
            </TouchableOpacity>
          }
        </Stack>
      </HStack>
      <Stack
        mx={3}
        maxH="7%"
        mb={2}
      >
        <Text
          fontSize="xs"
          textAlign="justify"
          mx={4}
          color={colors.gray5}
        >
          {cutText(user?.bio, 175)}
        </Text>
      </Stack>
      <Stack
        w="100%"
      >
        {user ?
          <>
            <ProfileTabs
              user={user}
            />
          </> :
          <>
            <Stack
              alignItems="center"
            >
              <VStack
                alignContent="center"
                alignItems="center"
                space={6}
              >
                <Text
                  fontSize={20}
                  color={colors.gray5}
                  bold
                >
                  Este perfil no existe.
                </Text>
                <TouchableOpacity
                  onPress={() => router.back()}
                >
                  <Text
                    fontSize={14}
                    color="#2e78b7"
                  >
                    Volver
                  </Text>
                </TouchableOpacity>
              </VStack>
            </Stack>
          </>
        }
        {children}
      </Stack>
    </Stack>
  );
};

const Tabs = ({ index }: { index: number }) => {
  if (index === 1) {
    return (
      <ReviewList
        reviews={reviews}
        listHeight="89%"
      />
    );
  } else if (index === 2) {
    return (
      <ThreadList 
        threads={threads}
        listHeight="89%"
      />
    );
  } else if (index === 3) {
    return (
      <UserList
        users={users}
        listHeight="89%"
      />
    );
  } else if (index === 4) {
    return (
      <UserList
        users={users}
        listHeight="89%"
      />
    );
  } else {
    return (
      <ReviewList
        reviews={reviews}
        listHeight="89%"
      />
    );
  }
};

const ProfileTabs = ({ user }: { user: TUser }) => {

  const [activeTab, setActiveTab] = useState(1)

  return (
    <Stack
      alignItems="center"
    >
      <HStack
        justifyContent={"space-between"}
        alignContent="center"
        alignItems="center"
        space={6}
      >
        <TouchableOpacity
          onPress={() => setActiveTab(1)}
          style={{ alignItems: "center" }}
        >
          <VStack
            alignItems="center"
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: activeTab === 1 ? colors.secondary : colors.gray0
              }}
            >
              100
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: colors.gray3
              }}
            >
              Reseñas
            </Text>
          </VStack>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab(2)}
          style={{ alignItems: "center" }}
        >
          <VStack
            alignItems="center"
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: activeTab === 2 ? colors.secondary : colors.gray0
              }}
            >
              500
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: colors.gray3
              }}
            >
              Hilos
            </Text>
          </VStack>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab(3)}
          style={{ alignItems: "center" }}
        >
          <VStack
            alignItems="center"
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: activeTab === 3 ? colors.secondary : colors.gray0
              }}
            >
              1
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: colors.gray3
              }}
            >
              Seguidos
            </Text>
          </VStack>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab(4)}
          style={{ alignItems: "center" }}
        >
          <VStack
            alignItems="center"
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: activeTab === 4 ? colors.secondary : colors.gray0
              }}
            >
              1k
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: colors.gray3
              }}
            >
              Seguidores
            </Text>
          </VStack>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab(5)}
          style={{ alignItems: "center" }}
        >
          <VStack
            alignItems="center"
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: activeTab === 5 ? colors.secondary : colors.gray0
              }}
            >
              1.7k
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: colors.gray3
              }}
            >
              Favoritos
            </Text>
          </VStack>
        </TouchableOpacity>
      </HStack>
      <Divider my={4} />
      <Stack>
        <Tabs index={activeTab} />
      </Stack>
    </Stack>
  );
};

export default EditProfileComponent