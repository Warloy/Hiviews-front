import React from 'react'
import { ScaledSize, TouchableOpacity, useWindowDimensions } from 'react-native'
import { Box, HStack, VStack, Image, Text, Divider } from 'native-base'
import { NavigationProp } from '@react-navigation/native'

import { TUser } from '../../types'
import colors from '../../styled-components/colors'

interface IProfileContainerProps {
    navigation?: NavigationProp<any>, 
    user: TUser
}

const ProfileContainer = ({ navigation, user }: IProfileContainerProps) => {

  return (
    <Box
    m={2}
    w={'95%'}
    bgColor={colors.white}
    py={2}
    >     
        <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {console.log(`Press profile card of ${user.username}`)
            navigation?.navigate('ProfilePage', {user:user})}}
        >
            <VStack
                space={3}
                pb={1}
            >
                <HStack
                    space={5}
                    px={3}
                    w={'100%'}
                    alignItems='center'
                >
                    <VStack
                        maxW={'15%'}
                        h={'100%'}
                        justifyContent='flex-start'
                    >
                        <TouchableOpacity>
                            <Image
                                borderRadius={50}
                                h={50}
                                w={50}
                                source={user.avatar}
                                alt={user.username}
                            />
                        </TouchableOpacity>
                    </VStack>
                    <VStack
                        maxW={'85%'}
                        h={'100%'}
                        justifyContent='flex-start'
                        pr={2}
                    >
                        <Text
                        fontSize='md'
                        bold
                        color={colors.text}
                        >
                        {user.name}{` `}{user.surname}
                        </Text>
                        <VStack
                            w={'95%'}
                            pr={1}
                        >
                            <Text
                                fontSize='sm'
                                color={colors.gray1}
                                >
                                {`@`}{user.username}
                            </Text>
                        </VStack>
                    </VStack>
                </HStack>    
            </VStack>
        </TouchableOpacity>
        <Divider 
            my={2}
            w={'90%'}
            alignSelf={'center'}
        />
    </Box>
  )
}

export default ProfileContainer