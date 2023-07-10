import React from 'react'
import { Divider, FlatList, Stack } from 'native-base'
import { NavigationProp } from '@react-navigation/native'

import colors from '../../styled-components/colors'
import { TUser } from '../../types'

import ProfileContainer from '../ProfileComponents/ProfileContainer'

interface IUserTimelineProps {
    navigation?: NavigationProp<any>;
    users?: TUser[],
    listheight?: string
}

const UserTimeline = ({ navigation, users, listheight }: IUserTimelineProps) => {
    
    const renderItem = ({ item }: { item: TUser }) => {
        return (
          <ProfileContainer
            navigation={navigation}
            user={item}
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
            data={users}
            px={3}
            pb={7}
            w='100%'
            maxH={listheight}
            keyExtractor={(item, key) => `${item?.id}${new Date().toISOString()}${key}`}
            renderItem={renderItem}
            />
        </Stack>
    )
}
export default UserTimeline
