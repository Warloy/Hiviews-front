import React, { useCallback, useState } from 'react'
import { ActivityIndicator, RefreshControl } from 'react-native'
import { FlatList, Stack, Divider, VStack } from 'native-base'
import { NavigationProp } from '@react-navigation/native'

import { Ionicons } from '@expo/vector-icons'
import colors from '../../styled-components/colors'
import StyledField from '../StyledField'

import { TComment } from '../../types'
import commentsData from '../../static/commentData'
import CommentContainer from './CommentContainer'

interface ICommentSectionProps {
    navigation?: NavigationProp<any>, 
    listheight?: string
}

const CommentSection = ({ navigation, listheight }: ICommentSectionProps) => {
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
        h="100%"
        w='100%'
        maxH='100%'
        minH='100%'
        py={1}
        pb={7}
        alignItems='center'
        >
            <VStack
                w={'90%'}
                space={2}
                py={2}
            >
                <Divider />
                <StyledField
                    placeholder='Publicar un comentario'
                    borderColor={colors.primary}
                    InputRightElement={
                    <Stack
                        pr={2}
                        h='full'
                        justifyContent='center'
                        alignItems='center'
                    >
                        <Ionicons
                        name='send'
                        size={20}
                        color={colors.primary}
                        />
                    </Stack>
                    }
                />
            </VStack>
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
                maxH={listheight}
                keyExtractor={(item, key) => `${item?.id}${new Date().toISOString()}${key}`}
                renderItem={renderItem}
                ListFooterComponent={renderLoader}
                onEndReached={loadMoreItem}
            />
        </Stack>
    )

}
export default CommentSection