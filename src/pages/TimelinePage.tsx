import React, { useState } from 'react'
import { Divider, Stack, Text } from 'native-base'
import { NavigationProp } from '@react-navigation/native'

import StatusBar from '../components/StatusBar'
import Container from '../components/Container'
import colors from '../styled-components/colors'
import MovieCarousel from '../components/TimelineComponents/MovieCarousel'
import TagCarousel from '../components/TimelineComponents/TagsCarousel'
import { TTag } from '../types'

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

  const [reviews, setReviews] = useState([])
  const [badges, setBadges] = useState<TTag[]>(tags)
  const [categoriesSelected, setCategoriesSelected] = useState([{ id: -1, name: 'Todo' }])
  
  const [currentPage, setCurrentPage] = useState(1)
  const [isNextPage, setIsNextPage] = useState(false)

  const handleCategories = (item: TTag) => {
    setCategoriesSelected([item])
    setReviews([])
    setCurrentPage(1)
    setIsNextPage(true)
  }

  const getCategory = (value: TTag): TTag | undefined => {
    return categoriesSelected?.find(item => item?.name === value?.name)
  }

  return (
    <Container
      backgroundBottomColor={colors.container.bottom}
    >
      <Stack
        w='100%'
        maxH='100%'
        minH='100%'
        py={1}
      >
        <Divider bgColor={colors.tertiary} />
        <MovieCarousel />
        <Divider bgColor={colors.tertiary} />
        <TagCarousel 
          tags={badges}
          handleCategories={handleCategories}
          getCategory={getCategory}
          selectedBadges={categoriesSelected}
        />
      </Stack>
    </Container>
  )
}

export default TimelinePage