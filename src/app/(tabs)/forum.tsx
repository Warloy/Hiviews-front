import { useCallback, useState } from "react";
import { ActivityIndicator, RefreshControl } from "react-native";
import { Stack as StackRouter, useFocusEffect } from "expo-router";
import { VStack, Stack, FlatList } from "native-base";

import Container from "@/components/Container";
import { colors } from "@/constants/Colors";
import useLoading from "@/hooks/useLoading";
import threadsData from "@/static/threadsData";
import { TThread } from "@/types/Post.Type";
import ForumCard from "@/components/MainComponents/Feed/ForumCard";
import useCustomToast from "@/hooks/useCustomToast";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import useConnection from "@/hooks/useConnection";

import { updateThreads } from "@/features/threads/threadSlice";

const ForumPage = () => {

  const { timelineView } = useAppSelector(state => state.config);
  const cacheThreads = useAppSelector(state => state.threads).threads;

  const dispatch = useAppDispatch();

  const { isConnected } = useConnection();

  const [threads, setThreads] = useState<TThread[]>(cacheThreads);

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
      getData().catch(err => showErrorToast(err));
    }, [currentPage, timelineView, isConnected])
  );

  const renderItem = ({ item }: { item: TThread }) => {
    return (
      <ForumCard
        thread={item}
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
      setThreads([]);
      if (isConnected) {

        let data: TThread[] = []

        await threadsData.forEach(value => {
          if (!timelineView) {
            if (value.author === "Anon") {
              return data.push(value);
            }
          } else {
            return data.push(value);
          }
        });

        await setThreads(data);
        dispatch(updateThreads(data));

      } else {
        setThreads(cacheThreads);
      }

      stopLoading();
    } catch (error: any) {
      showErrorToast(error);
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
        pb={1}
      >
        {!isLoading && isConnected ?
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
            showsVerticalScrollIndicator={false}
            data={threads}
            px={3}
            pb={7}
            maxH="90%"
            keyExtractor={(item, key) => `${item.id}${new Date().toISOString()}${key}`}
            renderItem={renderItem}
            ListFooterComponent={renderLoader}
            onEndReached={loadMoreItem}
          /> :
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
        }
      </VStack>
    </Container>
  );
};

export default ForumPage;