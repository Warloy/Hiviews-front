import React, { useCallback, useState } from 'react'
import { ActivityIndicator, RefreshControl } from 'react-native'

import { FlatList, Stack } from 'native-base'
import { NavigationProp } from '@react-navigation/native'

import colors from '../../styled-components/colors'
import { TComment } from '../../types'

import commentsData from '../../static/commentData'
import CommentContainer from './CommentContainer'

const CommentSection = ({ navigation }: { navigation?: NavigationProp<any> }) => {
    const [comments, setComments] = useState(commentsData)

    const [currentPage, setCurrentPage] = useState(1)
    const [isNextPage, setIsNextPage] = useState(false)

    const wait = (timeOut: any) => {
        return new Promise(resolve => setTimeout(resolve, timeOut))
    }

    const [isLoading, setIsLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)

    const onRefresh = useCallback(() => {
        setComments([])
        setCurrentPage(1)
        setIsNextPage(true)
        setComments(commentsData)
      }, [])

    const renderItem = ({ item }: { item: TComment }) => {
    return (
        <CommentContainer
        navigation={navigation}
        comment={item}
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

    return(
        <Stack
        w='100%'
        maxH='100%'
        minH='100%'
        py={1}
        pb={7}
        >
            <FlatList
                refreshControl={
                    <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    />
                }
                showsVerticalScrollIndicator={false}
                data={comments}
                px={3}
                pb={7}
                keyExtractor={(item, key) => `${item?.id}${new Date().toISOString()}${key}`}
                renderItem={renderItem}
                ListFooterComponent={renderLoader}
                onEndReached={loadMoreItem}
            />
        </Stack>
    )

}
export default CommentSection