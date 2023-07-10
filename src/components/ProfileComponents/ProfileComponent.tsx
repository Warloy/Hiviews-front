import React, { ReactNode, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { Avatar, Divider, Box, Stack, Image, HStack, VStack } from 'native-base';

import { colors } from '../../styled-components/colors';
import ProfileTabs from './ProfileTabs';
import ProfileContainer from './ProfileContainer';
import { TUser } from '../../types';

interface IProfileHeaderProps {
    navigation?: NavigationProp<any>;
    user: TUser
    children?: ReactNode
}

const ProfileComponent = ({ navigation, user, children }: IProfileHeaderProps) => {
    const [isFollowing, setIsFollowing] = useState(false)

    const handleFollowToggle = () => {
        setIsFollowing(!isFollowing)
    };

    return(
        <Box>
            <HStack 
                alignItems={'center'}
                px={5}
                pt={3}
                space={1}
            >
                <Stack
                    w={'24%'}
                >
                    <Image
                        size='md'
                        rounded={50}
                        source={user.avatar}
                    />
                </Stack>
                <VStack
                    w={'48%'}
                >
                    <Text 
                        style={{ 
                            fontSize: 18, 
                            fontWeight: 'bold', 
                            color: colors.gray3 
                        }}
                    >
                    {user.name}{` `}{user.surname}
                    </Text>
                    <Text style={{ 
                        fontSize: 16, 
                        marginBottom: 12, 
                        color: colors.gray2 
                    }}>
                    {`@`}{user.username}
                    </Text>
                </VStack>
                <Stack
                    w={'30%'}
                    alignSelf={'flex-start'}
                    mt={3}
                    alignItems={'center'}
                >
                    {user.username==='Dudu'?
                    <></>:
                        <TouchableOpacity 
                            onPress={handleFollowToggle} 
                            style={{ 
                                backgroundColor: isFollowing ? colors.primary : colors.secondary, 
                                paddingVertical: 4,
                                paddingHorizontal: 13, 
                                borderRadius: 4 
                                }}
                            >
                            <Text 
                                style={{ 
                                    fontSize: 14, 
                                    fontWeight: 'bold', 
                                    alignItems: 'center', 
                                    color: colors.button.text 
                                }}
                            >
                            {isFollowing ? 'Siguiendo' : 'Seguir'}
                            </Text>
                        </TouchableOpacity>
                    }
                </Stack>
            </HStack>
            <Stack
                mx={3}
            >
                <Text 
                    style={{ 
                        fontSize: 14, 
                        textAlign: 'justify', 
                        marginHorizontal: 14, 
                        marginTop: 18, 
                        marginBottom: 14, 
                        color: colors.gray5 
                        }}
                    >
                {user.bio}
                </Text>
            </Stack>
            <Stack
                w='100%'
            >
                <ProfileTabs
                    navigation={navigation}
                />
                <ProfileContainer
                    navigation={navigation}
                    user={{
                        id: 1,
                        email: 'gatocuantico@gmail.com',
                        name: 'Gato',
                        surname: 'Cuántico',
                        username: 'quantacat',
                        bio: 'Gato muy cuántico del mar de Quanta.',
                        birthday: new Date(),
                        avatar: require('../../assets/example/avatar15.jpg'),
                        }}
                />
                {children}
            </Stack>
        </Box>
    )
}
export default ProfileComponent