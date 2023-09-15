
import { useCallback, useState } from "react";
import { ActivityIndicator, RefreshControl } from "react-native";
import { Stack as StackRouter, useFocusEffect } from "expo-router";
import { Divider, Text, VStack, Stack, FlatList } from "native-base";

import Container from "@/components/Container";
import MovieCarousel from "@/components/MainComponents/MovieCarousel";
import { colors } from "@/constants/Colors";
import useLoading from "@/hooks/useLoading";
import reviewsData from "@/static/reviewsData";
import { TReview, TTag } from "@/types/Post.Type";
import TagCarousel from "@/components/MainComponents/Feed/TagCarousel";
import ReviewCard from "@/components/MainComponents/Feed/ReviewCard";

const FeedPage = () => {

  const tags: TTag[] = [
    {
      id: -1,
      name: 'Todo'
    },
    {
      id: 1,
      name: 'Acción'
    },
    {
      id: 2,
      name: 'Ciencia Ficción'
    },
    {
      id: 3,
      name: 'Aventura'
    },
    {
      id: 4,
      name: 'Drama'
    },
    {
      id: 5,
      name: 'Terror'
    },
    {
      id: 6,
      name: 'Suspenso'
    }
  ];

  const [reviews, setReviews] = useState(reviewsData);
  const [badges, setBadges] = useState<TTag[]>(tags);
  const [categoriesSelected, setCategoriesSelected] = useState([tags[0]]);

  const [currentPage, setCurrentPage] = useState(1);
  const [isNextPage, setIsNextPage] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const { isLoading } = useLoading();

  const handleCategories = (item: TTag) => {
    setCategoriesSelected([item]);
    setCurrentPage(1);
    setIsNextPage(true);
  };

  const onRefresh = useCallback(() => {
    setReviews(reviewsData);
    setCurrentPage(1);
    setIsNextPage(true);
  }, [])

  const getCategory = (value: TTag) => {
    return categoriesSelected.find(item => item.name === value.name);
  };

  useFocusEffect(
    useCallback(() => {
      setReviews(reviewsData)
    }, [currentPage, categoriesSelected])
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
        <Divider bgColor={colors.divider} />
        <MovieCarousel />
        <Divider bgColor={colors.divider} />
        <TagCarousel
          tags={badges}
          handleCategories={handleCategories}
          getCategory={getCategory}
          selectedTags={categoriesSelected}
        />
        <Divider bgColor={colors.divider} />

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
          maxH="68%"
          keyExtractor={(item, key) => `${item.id}${new Date().toISOString()}${key}`}
          renderItem={renderItem}
          ListFooterComponent={renderLoader}
          onEndReached={loadMoreItem}
        />

      </VStack>
    </Container>
  );
};

export default FeedPage;