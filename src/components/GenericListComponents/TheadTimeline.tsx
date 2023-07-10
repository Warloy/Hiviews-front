import React from 'react'
import { Divider, FlatList, Stack } from 'native-base'
import { NavigationProp } from '@react-navigation/native'

import colors from '../../styled-components/colors'
import { TThread } from '../../types'

import ThreadCard from '../ThreadComponents/ThreadCard'

interface IThreadTimelineProps {
    navigation?: NavigationProp<any>;
    threads?: TThread[],
    listheight?: string
}

const ThreadTimeline = ({ navigation, threads, listheight }: IThreadTimelineProps) => {
    
    const renderItem = ({ item }: { item: TThread }) => {
        return (
          <ThreadCard
            navigation={navigation}
            thread={item}
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
            data={threads}
            px={3}
            pb={7}
            maxH={listheight}
            keyExtractor={(item, key) => `${item?.id}${new Date().toISOString()}${key}`}
            renderItem={renderItem}
            />
        </Stack>
    )
}
export default ThreadTimeline
