
import { useCallback, useMemo, useState } from "react";
import { ActivityIndicator, RefreshControl } from "react-native";
import { Stack as StackRouter, useFocusEffect } from "expo-router";
import { Divider, VStack, Stack, FlatList, Box, ScrollView, Text } from "native-base";

import Container from "@/components/Container";
import MovieCarousel from "@/components/MainComponents/MovieCarousel";
import { colors } from "@/constants/Colors";
import useLoading from "@/hooks/useLoading";
import reviewsData from "@/static/reviewsData";
import { TReview, TTag } from "@/types/Post.Type";
import ReviewCard from "@/components/MainComponents/Feed/ReviewCard";
import useCustomToast from "@/hooks/useCustomToast";
import { TouchableOpacity } from "react-native";

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
  const [categorySelected, setCategorySelected] = useState<TTag>(tags[0]);

  const [currentPage, setCurrentPage] = useState(1);
  const [isNextPage, setIsNextPage] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const { isLoading, startLoading, stopLoading } = useLoading();
  const { showErrorToast } = useCustomToast();

  const handleCategory = (item: TTag) => {
    setCategorySelected(item);
    setCurrentPage(1);
    setIsNextPage(true);
  };

  const onRefresh = useCallback(() => {
    getData().catch(err => showErrorToast(err));
    setCurrentPage(1);
    setIsNextPage(true);
  }, [])

  useFocusEffect(
    useCallback(() => {
      getData()
        .catch(err => showErrorToast(err));
    }, [currentPage, categorySelected])
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
      let data = categorySelected.name === "Todo" ?
        reviewsData :
        reviewsData.filter(item => item.tags.find(tag =>
          tag.name === categorySelected.name));

      setReviews(data);
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
        <Divider bgColor={colors.divider} />
        <MovieCarousel />
        <Divider bgColor={colors.divider} />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          minH={7}
          maxH={7}
        >
          {badges.map((tag, index) => (
            <Stack
              key={index}
              m={1}
            >
              <TouchableOpacity
                activeOpacity={.9}
                onPress={() => handleCategory(tag)}
              >
                <Box
                  h={5}
                  w="full"
                  px={5}
                  bgColor={tag.id === categorySelected.id ? colors.badge.primary : colors.white}
                  borderRadius={50}
                  shadow={3}
                >
                  <Text
                    bold
                    fontSize="xs"
                    color={tag.id === categorySelected.id ? colors.white : colors.secondary}
                    textAlign="center"
                  >
                    {tag.name}
                  </Text>
                </Box>
              </TouchableOpacity>
            </Stack>
          ))}
        </ScrollView>

        <Divider bgColor={colors.divider} />
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
            maxH="68%"
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