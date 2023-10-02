import { useState } from "react";
import { Stack as StackRouter, useLocalSearchParams } from "expo-router";
import { Divider, HStack, Stack, Text, VStack } from "native-base";
import Container from "@/components/Container";
import NewPostComponent from "@/components/MainComponents/NewPost/NewPostComponent";
import { colors } from "@/constants/Colors";
import { TouchableOpacity } from "react-native";
import NewReviewComponent from "@/components/MainComponents/NewPost/NewReviewComponent";
import EditReviewComponent from "@/components/MainComponents/EditPost/EditReviewComponent";
import { TReview } from "@/types/Post.Type";


const EditReviewPage = ( ) => {
  const { id } = useLocalSearchParams();
  const review = id=="2" ? {
    _id: 2,
    authorID: 2,
    author: 'Manuel',
    description: 'Es cine. Scorsese celebra que por primera vez se reúne tanto talento en un mismo lugar, y no es a practicar lavandería.',
    movie: 'Inglorious Basterds (2009)',
    image: require('@/assets/example/movie07.jpg'),
    date: new Date().toISOString(),
    rate: 5,
    likes: 99,
    comments: 1,
    tags: [
      {
        _id: 4,
        name: 'Inglorious'
      },
      {
        _id: 2,
        name: 'Acción'
      }
    ]
  } : null

  return (
    <Container
      hiddenNavBar={true}
      statusBarColor={colors.white}
      statusBarStyle="dark-content"
      backgroundTopColor={colors.white}
      backgroundBottomColor={colors.white}
    >
      <StackRouter.Screen options={{ headerShown: true, title: "Editar review", animation: "slide_from_bottom" }} />
      <VStack
        minH="100%"
      >
        {review && 
          <EditReviewComponent 
            review={review}
          />
        }
      </VStack>
    </Container>
  );
};

export default EditReviewPage;