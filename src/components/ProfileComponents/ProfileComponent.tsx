import React, { ReactNode, useState } from 'react';
import { useRouter } from 'expo-router';
import { Text, TouchableOpacity } from 'react-native';
import { Stack, Image, HStack, VStack, Divider } from 'native-base';

import { colors } from "@/constants/Colors";
import { TUser } from "@/types/User.Type";
import ProfileCard from '@/components/MainComponents/Profile/ProfileCard';
import useLoading from '@/hooks/useLoading';
import useCustomToast from '@/hooks/useCustomToast';
import reviews from '@/static/reviewsData';
import threads from '@/static/threadsData';
import users from '@/static/userData';

interface IProfileHeaderProps {
    user?: TUser
    children?: ReactNode
}

const ProfileComponent = ({ user, children }: IProfileHeaderProps) => {
    const router = useRouter()
    const { showSuccessToast, showErrorToast } = useCustomToast();
    const [isFollowing, setIsFollowing] = useState(false);
    const userFound = user ? true : false;
    const activeUser = user ? user : {
        id: 1,
        email: '',
        name: 'Perfil no encontrado',
        surname: '',
        username: '',
        bio: '',
        birthday: new Date(),
        avatar: require('@/assets/example/avatar00.png'),
    }

    const handleFollowToggle = () => {
        setIsFollowing(!isFollowing)
    };

    return(
        <Stack
            backgroundColor={colors.white}
            minH={'100%'}
        >
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
                        source={activeUser.avatar}
                        alt='Profile picture'
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
                    {activeUser.name}{` `}{activeUser.surname}
                    </Text>
                    { userFound &&
                    <Text style={{ 
                        fontSize: 16, 
                        marginBottom: 12, 
                        color: colors.gray2 
                    }}>
                     {`@`}{activeUser.username}
                    </Text> 
                    }
                </VStack>
                <Stack
                    w={'30%'}
                    alignSelf={'flex-start'}
                    mt={3}
                    alignItems={'center'}
                >
                    { activeUser.username==='quantacat' || !userFound ?
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
                {activeUser.bio}
                </Text>
            </Stack>
            <Stack
                w='100%'
            >
                { userFound ?
                    <>
                        <ProfileTabs user={activeUser}/>
                        <ProfileCard
                            user={{
                                id: 1,
                                email: 'gatocuantico@gmail.com',
                                name: 'Gato',
                                surname: 'Cuántico',
                                username: 'quantacat',
                                bio: 'Gato muy cuántico del mar de Quanta.',
                                birthday: new Date(),
                                avatar: require('@/assets/example/avatar15.jpg'),
                                }}
                        />
                    </> : <>
                        <Stack
                            alignItems={'center'}
                        >
                            <VStack
                                alignContent={'center'}
                                alignItems={'center'}
                                space={6}
                            >
                                <Text
                                        style={{ 
                                            fontSize: 20,
                                            color: colors.gray5,
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        Este perfil no existe.
                                </Text>
                                <TouchableOpacity
                                    onPress={() => router.back()} 
                                >
                                    <Text
                                        style={{ 
                                            fontSize: 14,
                                            color: '#2e78b7'
                                        }}
                                    >
                                        Volver
                                    </Text>
                                </TouchableOpacity>
                            </VStack>
                        </Stack>
                    </>
                }
                {children}
            </Stack>
        </Stack>
    )
}

const ProfileTabs = ({ user } : { user: TUser }) => {
    const { isLoading, startLoading, stopLoading } = useLoading();
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
                        <Text> Hilos </Text>
                    : activeTab===2 ?
                        <Text> Reseñas </Text>
                    : activeTab===3 ?
                        <Text> Seguidos </Text>
                    : activeTab===4 ?
                        <Text> Seguidores </Text>
                    : activeTab===5 ? 
                        <Text> Favoritos </Text>
                    : <></>
                }
                
            </Stack>
        </Stack>
    )
}

export default ProfileComponent