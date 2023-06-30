import React, { useCallback, useState } from 'react'
import { ActivityIndicator, RefreshControl } from 'react-native'

import { Divider, FlatList, Stack } from 'native-base'
import { NavigationProp, useFocusEffect } from '@react-navigation/native'

import Container from '../components/Container'
import colors from '../styled-components/colors'
import MovieCarousel from '../components/TimelineComponents/MovieCarousel'
import TagCarousel from '../components/TimelineComponents/TagsCarousel'
import { TReview, TTag } from '../types'

import reviewsData from '../static/reviewsData'
import ReviewCard from '../components/TimelineComponents/ReviewCard'

interface TimelinePageProps {
  navigation?: NavigationProp<any>
}

const TimelinePage: React.FC<TimelinePageProps> = ({ navigation }) => {

  const tags = [
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
  ]

  const [reviews, setReviews] = useState(reviewsData)
  const [badges, setBadges] = useState<TTag[]>(tags)
  const [categoriesSelected, setCategoriesSelected] = useState([{ id: -1, name: 'Todo' }])

  const [currentPage, setCurrentPage] = useState(1)
  const [isNextPage, setIsNextPage] = useState(false)

  const handleCategories = (item: TTag) => {
    setCategoriesSelected([item])
    setCurrentPage(1)
    setIsNextPage(true)
  }

  const getCategory = (value: TTag): TTag | undefined => {
    return categoriesSelected?.find(item => item?.name === value?.name)
  }

  const wait = (timeOut: any) => {
    return new Promise(resolve => setTimeout(resolve, timeOut))
  }

  const [isLoading, setIsLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(() => {
    setReviews([])
    setCurrentPage(1)
    setIsNextPage(true)
    setReviews(reviewsData)
  }, [])

  useFocusEffect(
    useCallback(() => {
      setReviews(reviewsData)
    }, [currentPage, categoriesSelected])
  )

  const renderItem = ({ item }: { item: TReview }) => {
    return (
      <ReviewCard
        review={item}
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
        <MovieCarousel />
        <TagCarousel
          tags={badges}
          handleCategories={handleCategories}
          getCategory={getCategory}
          selectedBadges={categoriesSelected}
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
          maxH='83%'
          keyExtractor={(item, key) => `${item?.id}${new Date().toISOString()}${key}`}
          renderItem={renderItem}
          ListFooterComponent={renderLoader}
          onEndReached={loadMoreItem}
        />
      </Stack>
    </Container>
  )
}

export default TimelinePage