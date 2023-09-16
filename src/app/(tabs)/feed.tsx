
import { useCallback, useState } from "react";
import { ActivityIndicator, RefreshControl } from "react-native";
import { Stack as StackRouter, useFocusEffect } from "expo-router";
import { VStack, Stack, FlatList } from "native-base";

import Container from "@/components/Container";
import { colors } from "@/constants/Colors";
import useLoading from "@/hooks/useLoading";
import reviewsData from "@/static/reviewsData";
import { TReview } from "@/types/Post.Type";
import ReviewCard from "@/components/MainComponents/Feed/ReviewCard";
import useCustomToast from "@/hooks/useCustomToast";

const FeedPage = () => {

  const [reviews, setReviews] = useState(reviewsData);

  const [currentPage, setCurrentPage] = useState(1);
  const [isNextPage, setIsNextPage] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const { isLoading, startLoading, stopLoading } = useLoading();
  const { showErrorToast } = useCustomToast();

  const onRefresh = useCallback(() => {
    getData().catch(err => showErrorToast(err));
    setCurrentPage(1);
    setIsNextPage(true);
  }, [])

  useFocusEffect(
    useCallback(() => {
      getData()
        .catch(err => showErrorToast(err));
    }, [currentPage])
  );

  const renderItem = ({ item }: { item: TReview }) => {
    return (
      <ReviewCard
        review={item}
      />
    );
  };

  const renderLoader = () => {
    return (
      isLoading &&
      <Stack
        my={2}
        alignItems="center"
        justifyContent="center"
      >
        <ActivityIndicator
          size="large"
          color={colors.secondary}
        />
      </Stack>
    );
  };

  const loadMoreItem = () => {
    if (!isLoading && isNextPage) {
      setCurrentPage(value => value + 1);
    }
  };

  const getData = async () => {
    startLoading();
    try {
      setReviews(reviewsData);
    } catch (error: any) {
      showErrorToast(error);
    } finally {
      stopLoading();
    }
  }

  return (
    <Container
      statusBarStyle="dark-content"
      statusBarColor={colors.white}
      backgroundTopColor={colors.white}
      backgroundBottomColor={colors.white}
    >
      <StackRouter.Screen options={{ headerShown: false }} />
      <VStack
        w="100%"
        maxH="100%"
        minH="100%"
        py={1}
      >
        {isLoading ?
          <Stack
            my={2}
            alignItems="center"
            justifyContent="center"
          >
            <ActivityIndicator
              size="large"
              color={colors.secondary}
            />
          </Stack> :
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
            showsVerticalScrollIndicator={false}
            data={reviews}
            px={3}
            pb={7}
            maxH="90%"
            keyExtractor={(item, key) => `${item.id}${new Date().toISOString()}${key}`}
            renderItem={renderItem}
            ListFooterComponent={renderLoader}
            onEndReached={loadMoreItem}
          />
        }
      </VStack>
    </Container>
  );
};

export default FeedPage;