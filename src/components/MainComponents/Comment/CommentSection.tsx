import React, { useCallback, useState } from "react"
import { ActivityIndicator, RefreshControl, TouchableOpacity } from "react-native"
import { FlatList, Stack, Divider, VStack } from "native-base"

import { Ionicons } from "@expo/vector-icons"
import { colors } from "@/constants/Colors";
import StyledField from "@/components/StyledField"

import { TComment } from "@/types/Post.Type"
import CommentCard from "./CommentCard"

interface ICommentSectionProps {    
  comments?: TComment[], 
  listHeight?: string
}

const CommentSection = ({ comments, listHeight="78%" }: ICommentSectionProps) => {

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

  const renderItem = ({ item }: { item: TComment }) => {
    return (
      <CommentCard
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
      mb={2}
      alignItems='center'
    >
      <VStack
        w={'90%'}
        pb={2}
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
              <TouchableOpacity
                onPress={()=>{
                  console.log("Post comment pressed")
                }}
              >
                <Ionicons
                  name='send'
                  size={20}
                  color={colors.primary}
                />
              </TouchableOpacity>
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
        maxH={listHeight}
        keyExtractor={(item, key) => `${item?.id}${new Date().toISOString()}${key}`}
        renderItem={renderItem}
        ListFooterComponent={renderLoader}
        onEndReached={loadMoreItem}
      />
    </Stack>
  )
}
export default CommentSection