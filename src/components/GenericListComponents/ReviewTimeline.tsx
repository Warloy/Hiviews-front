import React from 'react'
import { Divider, FlatList, Stack } from 'native-base'
import { NavigationProp } from '@react-navigation/native'

import colors from '../../styled-components/colors'
import { TReview } from '../../types'

import ReviewCard from '../TimelineComponents/ReviewCard'

interface IReviewTimelineProps {
    navigation?: NavigationProp<any>;
    reviews?: TReview[],
    listheight?: string
}

const ReviewTimeline = ({ navigation, reviews, listheight }: IReviewTimelineProps) => {
    
    const renderItem = ({ item }: { item: TReview }) => {
        return (
          <ReviewCard
            navigation={navigation}
            review={item}
          />
        )
    }

    return(
        <Stack
            w='100%'
            maxH='100%'
            minH='100%'
            py={1}
        >
            <Divider bgColor={colors.divider} />
            <FlatList            
            showsVerticalScrollIndicator={false}
            data={reviews}
            px={3}
            pb={7}
            maxH={listheight}
            keyExtractor={(item, key) => `${item?.id}${new Date().toISOString()}${key}`}
            renderItem={renderItem}
            />
        </Stack>
    )
}
export default ReviewTimeline