import React, { useState } from 'react'
import { ScaledSize, TouchableOpacity, useWindowDimensions } from 'react-native'
import { Box, HStack, VStack, Image, Text, Divider, Stack } from 'native-base'
import { NavigationProp } from '@react-navigation/native'

import { TUser } from '../../types'
import colors from '../../styled-components/colors'

interface IProfileContainerProps {
    navigation?: NavigationProp<any>, 
    user: TUser
}

const ProfileContainer = ({ navigation, user }: IProfileContainerProps) => {
    const [isFollowing, setIsFollowing] = useState(false)

    const handleFollowToggle = () => {
        setIsFollowing(!isFollowing)
    };

  return (
    <Box
    m={2}
    w={'100%'}
    bgColor={colors.white}
    py={1}
    >     
        <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {console.log(`Press profile card of ${user.username}`)
            navigation?.navigate('ProfilePage', {user})}}
        >
            <Stack
                space={3}
                pb={1}
            >
                <HStack
                    space={3}
                    px={3}
                    w={'100%'}
                    alignItems='center'
                >
                    <VStack
                        w={'15%'}
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
                        w={'45%'}
                        h={'100%'}
                        justifyContent='flex-start'
                        ml={2}
                    >
                        <Text
                            fontSize='md'
                            bold
                            color={colors.text}
                            lineHeight={'sm'}
                        >
                        {user.name}{` `}{user.surname}
                        </Text>
                        <VStack
                            w={'100%'}
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
                    <Stack
                        w={'28%'}
                    >
                        <TouchableOpacity 
                            onPress={handleFollowToggle} 
                            style={{ 
                                backgroundColor: isFollowing ? colors.primary : colors.secondary, 
                                paddingVertical: 3,
                                paddingHorizontal: 13, 
                                borderRadius: 4 
                                }}
                            >
                            <Text 
                                style={{ 
                                    fontSize: 14, 
                                    fontWeight: 'bold', 
                                    alignSelf:'center',
                                    alignItems: 'center', 
                                    color: colors.button.text 
                                }}
                            >
                            {isFollowing ? 'Siguiendo' : 'Seguir'}
                            </Text>
                        </TouchableOpacity>
                    </Stack>
                </HStack>    
            </Stack>
        </TouchableOpacity>
        <Divider 
            mt={2}
            w={'100%'}
            alignSelf={'center'}
        />
    </Box>
  )
}

export default ProfileContainer