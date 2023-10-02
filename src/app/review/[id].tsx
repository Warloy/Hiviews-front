import { useCallback, useEffect, useState } from "react";
import { useLocalSearchParams, Stack, useRouter, useFocusEffect } from "expo-router";
import Container from "@/components/Container";
import { colors } from "@/constants/Colors";
import ReviewPost from "@/components/MainComponents/ReviewPost";
import CommentSection from "@/components/MainComponents/Comment/CommentSection";
import { TReview } from "@/types/Post.Type";

import useConnection from "@/hooks/useConnection";
import useLoading from "@/hooks/useLoading";
import useCustomToast from "@/hooks/useCustomToast";
import ReviewService from "@/services/Review/Review.Service";
//static
import comments from "@/static/commentData";
import { ActivityIndicator } from "react-native";
import { Box } from "native-base";


const ReviewPage = () => {
  const { id } : { id: string } = useLocalSearchParams();  
  const router = useRouter()
  const [review, setReview] = useState<TReview | null>(null);
  
  const reviewAPI = new ReviewService();
  const { isConnected } = useConnection();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const { showErrorToast, showSuccessToast } = useCustomToast();
  
  useFocusEffect(
    useCallback(() => {
      getReview().catch(err => showErrorToast(err));
    }, [id, isConnected])
  );

  const getReview = async () => {
    startLoading();
    try {
      if (isConnected) {

        const { data }: { data: TReview } = await reviewAPI.findOne(id);
        console.log(data)

        if (data?.statusCode === 404 ) {
          console.log("Data not found");
          showErrorToast("Review no encontradaa.");
          router.push(`/(tabs)/feed`);
          return
        }
        setReview(data);
      } else {
        setReview(null);
      }
      stopLoading();
    } catch (error: any) {
      console.log(error);
      showErrorToast("Ocurrió un error al obtener la review.");
    }
  }


  return (
    <Container
      hiddenNavBar
      statusBarColor={colors.white}
      statusBarStyle="dark-content"
    >
      <Stack.Screen options={{ headerShown: true, headerTitle: "Ver review", animation: "fade_from_bottom" }} />
      { !isLoading ? <>
          { review &&
            <ReviewPost review={review}>
              <CommentSection comments={comments} listHeight="68%"/>
            </ReviewPost>
          }
        </> : <>
          <Box h="100%" w="100%" backgroundColor={colors.white} alignItems='center' justifyContent='center' alignContent='center' alignSelf='center'>
            <ActivityIndicator size='large' color={colors.secondary}/>
          </Box>
        </>
      }
    </Container>
  );
};

export default ReviewPage;