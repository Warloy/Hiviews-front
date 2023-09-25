import React, { useCallback, useState } from "react"
import { ActivityIndicator, RefreshControl } from "react-native"
import { FlatList, Stack } from "native-base"

import { colors } from "@/constants/Colors";
import { TUser } from "@/types/User.Type"
import ProfileCard from "../Profile/ProfileCard";

interface IUserListProps {
  users?: TUser[], 
  listHeight?: string
}

const UserList = ({ users, listHeight="78%" }: IUserListProps) => {

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

  const renderItem = ({ item }: { item: TUser }) => {
    return (
      <ProfileCard
        user={item}
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
        data={users}
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
export default UserList