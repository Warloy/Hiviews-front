import { useState } from "react";
import { Stack as StackRouter, useLocalSearchParams } from "expo-router";
import { Divider, HStack, Stack, Text, VStack } from "native-base";
import Container from "@/components/Container";
import { colors } from "@/constants/Colors";
import { TouchableOpacity } from "react-native";
import { TThread } from "@/types/Post.Type";
import EditThreadComponent from "@/components/MainComponents/EditPost/EditThreadComponent";


const EditThreadPage = ( ) => {
  const { id } = useLocalSearchParams();
  const thread = id=="2" ? {
    id: 2,
    authorID: 2,
    author: "Manuel",
    description: "no la he visto, pero dicen que es madre pelicula. Lorem ipsum dolor sit amet quinnLorem ipsum dolor sit amet quinnLorem ipsum dolor sit amet quinnLorem ipsum dolor sit amet quinnLorem ipsum dolor sLorem ipsum dolor sit amet quinnLorem ipsum dolor sit amet quinnLorem ipsum dolor sit amet quinnLorem ipsum dolor sit amet quinnLorem ipsum dolor sit amet quinnit amet quinnLorem ipsum dolor sit amet quinnLorem ipsum dolor sit amet quinnLorem ipsum dolor sit amet quinnLorem ipsum dolor sit amet quinnLorem ipsum dolor sLorem ipsum dolor sit amet quinnLorem ipsum dolor sit amet quinnLorem ipsum dolor sit amet quinnLorem ipsum dolor sit amet quinnLorem ipsum dolor sit amet quinnit amet quinn",
    category: {
      id: 2,
      name: "Cinéfilo"
    },
    topic: "Pero es que los planos",
    picture: require("@/assets/example/movie07.jpg"),
    date: new Date().toISOString(),
    likes: 99,
    comments: 1
  } : null

  return (
    <Container
      hiddenNavBar={true}
      statusBarColor={colors.white}
      statusBarStyle="dark-content"
      backgroundTopColor={colors.white}
      backgroundBottomColor={colors.white}
    >
      <StackRouter.Screen options={{ headerShown: true, title: "Editar hilo", animation: "slide_from_bottom" }} />
      <VStack
        minH="100%"
      >
        {thread && 
          <EditThreadComponent 
            thread={thread}
          />
        }
      </VStack>
    </Container>
  );
};

export default EditThreadPage;