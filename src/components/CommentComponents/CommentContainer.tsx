import React from 'react'
import { ScaledSize, TouchableOpacity, useWindowDimensions } from 'react-native'
import { Box, HStack, VStack, Image, Text, ScrollView, Stack, Divider } from 'native-base'

import { AntDesign, Feather, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'

import { TComment } from '../../types'
import { before24hours, formatDate, getHour } from '../../utils/functions'
import colors from '../../styled-components/colors'

const CommentContainer = ({ comment }: { comment: TComment }) => {

  const layout: ScaledSize = useWindowDimensions()

  return (
    <Box
      m={2}
      minH={100}
      w={'95%'}
      bgColor={colors.white}
    >
        <VStack
            space={3}
        >
        <Divider/>
        <HStack
            space={5}
            px={3}
            h={60}
            w={'100%'}
            alignItems='center'
        >
            <VStack
                maxW={'15%'}
                h={'100%'}
                justifyContent='flex-start'
            >
                <TouchableOpacity
                    onPress={() => console.log(`Press profile picture of ${comment.author}`)}
                    >
                    <Image
                        borderRadius={50}
                        h={50}
                        w={50}
                        source={comment.authAvatar}
                        alt={comment.author}
                    />
                </TouchableOpacity>
            </VStack>
            <VStack
                maxW={'85%'}
                h={'100%'}
                justifyContent='flex-start'
                pr={2}
                >
                <TouchableOpacity
                    onPress={() => console.log(`Press profile name of ${comment.author}`)}
                >
                    <Text
                    fontSize='md'
                    bold
                    color={colors.text}
                    >
                    {comment.author}
                    </Text>
                </TouchableOpacity>
                <HStack>
                    <VStack
                        w={'95%'}
                        pr={1}
                    >
                        <Text
                            fontSize='sm'
                            color={colors.text}
                            >
                            {comment.content}
                        </Text>
                    </VStack>
                </HStack>
                <HStack 
                    justifyContent='flex-end'
                    alignItems='flex-end'
                    w={'100%'}
                    space={3}
                    py={1}
                    px={5}
                >
                    <TouchableOpacity
                        onPress={() => console.log('Edit comment pressed')}
                    >
                        <HStack
                        alignItems='center'
                        space={1}
                        >
                        <Text
                        fontSize='xs'
                        color={colors.text}
                        >
                        {`editar`}
                        </Text>
                        <Feather
                            name='edit'
                            size={14}
                            color={colors.primary}
                        />
                        </HStack>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => console.log('Delete comment pressed')}
                    >
                        <HStack
                        alignItems='center'
                        space={1}
                        >
                        <Text
                        fontSize='xs'
                        color={colors.text}
                        >
                        {`eliminar`}
                        </Text>
                        <AntDesign
                            name='delete'
                            size={14}
                            color={colors.primary}
                        />
                        </HStack>
                    </TouchableOpacity>
                </HStack>
                </VStack>
        </HStack>
        </VStack>
    </Box>
  )
}

export default CommentContainer