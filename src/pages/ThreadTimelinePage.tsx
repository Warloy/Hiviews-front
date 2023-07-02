import React, { useCallback, useState } from 'react'
import { ActivityIndicator, RefreshControl } from 'react-native'

import { Divider, FlatList, Stack } from 'native-base'
import { NavigationProp, useFocusEffect } from '@react-navigation/native'

import Container from '../components/Container'
import colors from '../styled-components/colors'
import { TReview, TTag, TThread } from '../types'

import threadsData from '../static/threadsData'
import ThreadCard from '../components/ThreadComponents/ThreadCard'

interface ThreadTimelinePageProps {
  navigation?: NavigationProp<any>
}

const ThreadTimelinePage: React.FC<ThreadTimelinePageProps> = ({ navigation }) => {

  const [threads, setThreads] = useState(threadsData)

  const [currentPage, setCurrentPage] = useState(1)
  const [isNextPage, setIsNextPage] = useState(false)


  const wait = (timeOut: any) => {
    return new Promise(resolve => setTimeout(resolve, timeOut))
  }

  const [isLoading, setIsLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(() => {
    setThreads([])
    setCurrentPage(1)
    setIsNextPage(true)
    setThreads(threadsData)
  }, [])

  useFocusEffect(
    useCallback(() => {
      setThreads(threadsData)
    }, [currentPage])
  )

  const renderItem = ({ item }: { item: TThread }) => {
    return (
      <ThreadCard
        thread={item}
      />
    )
  }

  const renderLoader = () => {
    return (
      isLoading ?
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

  return (
    <Container
      statusBarStyle='dark-content'
      navigation={navigation}
      statusBarColor={colors.white}
      backgroundTopColor={colors.white}
      backgroundBottomColor={colors.white}
    >
      <Stack
        w='100%'
        maxH='100%'
        minH='100%'
        py={1}
      >
        <Divider bgColor={colors.divider} />
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
          maxH='100%'
          keyExtractor={(item, key) => `${item?.id}${new Date().toISOString()}${key}`}
          renderItem={renderItem}
          ListFooterComponent={renderLoader}
          onEndReached={loadMoreItem}
        />
      </Stack>
    </Container>
  )
}

export default ThreadTimelinePage