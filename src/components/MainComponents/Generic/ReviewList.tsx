import React, { useCallback, useState } from "react"
import { ActivityIndicator, RefreshControl } from "react-native"
import { FlatList, Stack } from "native-base"

import { colors } from "@/constants/Colors";
import { TReview } from "@/types/Post.Type"
import ReviewCard from "@/components/MainComponents/Feed/ReviewCard"

interface IReviewListProps {
  reviews?: TReview[], 
  listHeight?: string,
  disableLoadingIcon?: boolean
}

const ReviewList = ({ reviews, listHeight="78%", disableLoadingIcon=false }: IReviewListProps) => {

  const [currentPage, setCurrentPage] = useState(1)
  const [isNextPage, setIsNextPage] = useState(false)

  const wait = (timeOut: any) => {
    return new Promise(resolve => setTimeout(resolve, timeOut))
  }

  const [isLoading, setIsLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(() => {
    setCurrentPage(1)
    setIsNextPage(true)
  }, [])

  const renderItem = ({ item }: { item: TReview }) => {
    return (
      <ReviewCard
        review={item}
      />
    )
  }

  const renderLoader = () => {
    return (
      (isLoading && !disableLoadingIcon) ?
        <Stack my={2} alignItems='center' justifyContent='center' alignContent='center' alignSelf='center'>
          <ActivityIndicator size='large' color={colors.secondary} />
        </Stack> : <></>
    )
  }

  const loadMoreItem = () => {
    if (!isLoading && isNextPage) {
      setCurrentPage(currentPage + 1)
    }
  }

  return(
    <Stack
      mb={7}
      alignItems='center'
    >
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
        maxH={listHeight}
        keyExtractor={(item, key) => `${item?._id}${new Date().toISOString()}${key}`}
        renderItem={renderItem}
        ListFooterComponent={renderLoader}
        onEndReached={loadMoreItem}
      />
    </Stack>
  )
}
export default ReviewList