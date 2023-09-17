import React, { useState } from 'react';
import { useRouter } from "expo-router";
import { TouchableOpacity } from 'react-native';
import { Text, Divider, Box, Stack, HStack, VStack } from 'native-base';

import reviews from '@/static/reviewsData';
import threads from '@/static/threadsData';
import users from '@/static/userData';
import { colors } from "@/constants/Colors";
import useLoading from '@/hooks/useLoading';
import useCustomToast from '@/hooks/useCustomToast';
import ThreadTimeline from '../GenericListComponents/TheadTimeline';
import ReviewTimeline from '../GenericListComponents/ReviewTimeline';
import UserTimeline from '../GenericListComponents/UserTimeline';

interface IProfileTabsProps {
}

const ProfileTabs = ({ }: IProfileTabsProps) => {
    const router = useRouter();
    const { isLoading, startLoading, stopLoading } = useLoading();
    const { showSuccessToast, showErrorToast } = useCustomToast();
    const [activeTab, setActiveTab] = useState(1)

    return (
        <Stack
            alignItems={'center'}
        >
            <HStack
                justifyContent={'space-between'}
                alignContent={'center'}
                alignItems={'center'}
                space={6}
            >
                <TouchableOpacity 
                    onPress={() => setActiveTab(1)} 
                    style={{ alignItems: 'center' }}
                >
                    <VStack
                        alignItems={'center'}
                    >
                        <Text 
                        style={{ 
                            fontSize: 18, 
                            fontWeight: 'bold', 
                            color: activeTab===1 ? colors.secondary : colors.gray0
                        }}
                        >
                            100
                        </Text>
                        <Text 
                            style={{ 
                                fontSize: 12, 
                                color: colors.gray3 
                            }}
                        >
                            Hilos
                        </Text>
                    </VStack>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => setActiveTab(2)} 
                    style={{ alignItems: 'center' }}
                >
                    <VStack
                        alignItems={'center'}
                    >
                        <Text 
                            style={{ 
                                fontSize: 18, 
                                fontWeight: 'bold', 
                                color: activeTab===2 ? colors.secondary : colors.gray0
                            }}
                        >
                            500
                        </Text>
                        <Text 
                            style={{ 
                                fontSize: 12, 
                                color: colors.gray3 
                            }}
                        >
                            Reseñas
                        </Text>
                    </VStack>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => setActiveTab(3)} 
                    style={{ alignItems: 'center' }}
                >
                    <VStack
                        alignItems={'center'}
                    >
                        <Text 
                            style={{ 
                                fontSize: 18, 
                                fontWeight: 'bold', 
                                color: activeTab===3 ? colors.secondary : colors.gray0
                            }}
                        >
                            1
                        </Text>
                        <Text 
                            style={{ 
                                fontSize: 12, 
                                color: colors.gray3 
                            }}
                        >
                            Seguidos
                        </Text>
                    </VStack>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => setActiveTab(4)} 
                    style={{ alignItems: 'center' }}
                >
                    <VStack
                        alignItems={'center'}
                    >
                        <Text 
                            style={{ 
                                fontSize: 18, 
                                fontWeight: 'bold', 
                                color: activeTab===4 ? colors.secondary : colors.gray0
                            }}
                        >
                            1k
                        </Text>
                        <Text 
                            style={{ 
                                fontSize: 12, 
                                color: colors.gray3 
                            }}
                        >
                            Seguidores
                        </Text>
                    </VStack>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => setActiveTab(5)} 
                    style={{ alignItems: 'center' }}
                >
                    <VStack
                        alignItems={'center'}
                    >
                        <Text 
                            style={{ 
                                fontSize: 18, 
                                fontWeight: 'bold', 
                                color: activeTab===5 ? colors.secondary : colors.gray0
                            }}
                        >
                            1.7k
                        </Text>
                        <Text 
                            style={{ 
                                fontSize: 12, 
                                color: colors.gray3 
                            }}
                        >
                            Favoritos
                        </Text>
                    </VStack>
                </TouchableOpacity>
            </HStack>
            <Divider my={4} />
            <Stack>
                {
                    activeTab===1 ? 
                        <ReviewTimeline 
                            reviews={reviews}
                            listheight='38%'
                        />
                    : activeTab===2 ?
                        <ThreadTimeline 
                            threads={threads}
                            listheight='38%'
                        />
                    : activeTab===3 ?
                        <UserTimeline 
                            users={users}
                            listheight='38%'
                        />
                    : activeTab===4 ?
                        <UserTimeline 
                            users={users}
                            listheight='38%'
                        />
                    : activeTab===5 ? 
                        <ReviewTimeline 
                            reviews={reviews}
                            listheight='38%'
                        /> 
                    : <></>
                }
                
            </Stack>
        </Stack>
    )
}

export default ProfileTabs