import React, { ReactNode, useState } from "react";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Stack, Text, HStack, VStack, Divider, Avatar } from "native-base";

import { colors } from "@/constants/Colors";
import { TUser } from "@/types/User.Type";
import useLoading from "@/hooks/useLoading";
import useAuthContext from "@/hooks/useAuthContext";
import { cutText } from "@/utils";
import { useAppSelector } from "@/hooks/useRedux";

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
            source={authUser?.avatar}
            bg={colors.secondary}
          >
            {authUser?.name.charAt(0)}{authUser?.surname.charAt(0)}
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
            {authUser ? `${authUser.name} ${authUser.surname}` : "Perfil no encontrado"}
          </Text>
          {authUser &&
            <Text
              fontSize={16}
              mb={5}
              color={colors.gray2}
            >
              {`@${authUser.username}`}
            </Text>
          }
        </VStack>
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
          {cutText(authUser?.bio, 175)}
        </Text>
      </Stack>
    </Stack>
  );
};

export default EditProfileComponent