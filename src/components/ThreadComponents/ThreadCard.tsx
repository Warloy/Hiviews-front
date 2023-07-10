import React, { useState } from 'react'
import { ScaledSize, TouchableOpacity, useWindowDimensions } from 'react-native'
import { Modal, Box, HStack, VStack, Image, Text, ScrollView, Stack, Divider } from 'native-base'
import { NavigationProp } from '@react-navigation/native'

import { AntDesign, Feather, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'

import { TComment, TThread } from '../../types'
import { before24hours, formatDate, getHour } from '../../utils/functions'
import colors from '../../styled-components/colors'

const ThreadCard = ({ navigation, thread }: { navigation?: NavigationProp<any>, thread: TThread }) => {

  const layout: ScaledSize = useWindowDimensions()

  const [like, setLike] = useState(false)
  const [showModal, setShowModal] = useState(false)

  return (
    <Box
      m={2}
      minH={100}
      shadow={1}
      borderRadius={5}
      bgColor={colors.white}
    >
      <VStack
      >
        <HStack
          space={5}
          px={3}
          h={60}
          alignItems='center'
        >
          <MaterialCommunityIcons name="forum-outline" size={24} color={colors.primary} />
          <VStack
            maxW='82%'
            my={2}
            justifyContent='center'
          >
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              h={10}
              pr={2}
            >
              <TouchableOpacity
                onPress={() => {console.log(`${thread.id} - ${thread.topic} thread pressed`)
                navigation?.navigate('ThreadPage', {thread})
              }}
                >
                <Text
                    fontSize='lg'
                    bold
                    color={colors.text}
                >
                    {thread.topic}
                </Text>
              </TouchableOpacity>
            </ScrollView>
            <HStack>
                <Text
                        fontSize='sm'
                        color={colors.text}
                >
                        {`En `}
                </Text>
                <Text
                        fontSize='sm'
                        bold
                        color={colors.text}
                >
                        {thread.category.name}
                </Text>
            </HStack>
          </VStack>
        </HStack>
        <Box
          bgColor={colors.cardBackground}
          minH={50}
          borderTopRightRadius={35}
          borderBottomLeftRadius={35}
        >
          <Stack
            alignSelf='center'
            w='100%'
            maxH={200}
          >
            <TouchableOpacity
                onPress={() => { setShowModal(true) }}
            >
                <Image
                w={'100%'}
                maxH={'100%'}
                resizeMode='cover'
                borderTopRightRadius={35}
                source={thread.picture}
                alt={thread.topic}
                />
            </TouchableOpacity>
            <Modal
                isOpen={showModal} 
                onClose={() => setShowModal(false)}>
                <Modal.Content 
                    maxW={'100%'}
                    maxH={'80%'}
                >
                    <Modal.Body>
                        <Box
                            maxH={layout.height*0.75}
                            maxW={'100%'}
                            alignItems={'flex-start'}
                        >
                        <Image
                            maxH={'100%'}
                            maxW={'100%'}
                            source={thread.picture}
                            resizeMode='contain'
                            alt={`No se pudo mostrar la imagen`}
                        />
                        </Box>
                    </Modal.Body>
                </Modal.Content>
            </Modal>
          </Stack>
          <VStack
            space={2}
          >
            <Stack
              py={2}
              alignSelf='center'
              w='90%'
            >
              <Text
                fontSize='xs'
                lineHeight={13}
                color={colors.gray5}
              >
                {thread?.description}
              </Text>
            </Stack>
            <VStack
              pr={2}
              pb={2}
              alignSelf='flex-end'
            >
              <Text
                fontSize={9}
                color={colors.gray5}
                textAlign='right'
              >
                {formatDate(thread.date)} {getHour(thread.date)}
              </Text>
              <HStack
                justifyContent='flex-end'
              >
                <Text
                  fontSize='xs'
                  color={colors.gray5}
                  textAlign='right'
                >
                  por{' '}
                </Text>
                <TouchableOpacity
                  onPress={() => console.log(`${thread.id} - ${thread.author} author pressed`)}
                >
                  <Text
                    bold
                    fontSize='xs'
                    color={colors.text}
                    textAlign='right'
                  >
                    {thread.author}
                  </Text>
                </TouchableOpacity>
              </HStack>
            </VStack>
          </VStack>
        </Box>

        <HStack
          justifyContent='space-between'
          my={1}
          py={1}
          px={2}
        >
          <HStack
            px={2}
            space={3}
          >
            {thread.author === 'Manuel' && before24hours(thread.date) &&
              <>
                <TouchableOpacity
                  onPress={() => console.log('Delete pressed')}
                >
                  <HStack
                    alignItems='center'
                    pr={2}
                  >
                    <AntDesign
                      name='delete'
                      size={14}
                      color={colors.primary}
                    />
                  </HStack>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => console.log('Edit pressed')}
                >
                  <HStack
                    alignItems='center'
                    pr={2}
                  >
                    <Feather
                      name='edit'
                      size={14}
                      color={colors.primary}
                    />
                  </HStack>
                </TouchableOpacity>
              </>

            }
          </HStack>
          <HStack
            px={2}
            space={3}
          >
            <TouchableOpacity
              onPress={() => console.log('Comment pressed')}
            >
              <HStack
                alignItems='center'
                space={1}
              >
                <FontAwesome5
                  name='comment-alt'
                  size={14}
                  color={colors.primary}
                />
                <Text
                  fontSize={10}
                  color={colors.primary}
                >
                  {thread.comments}
                </Text>
              </HStack>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setLike(!like)}
            >
              <HStack
                alignItems='center'
                space={1}
              >
                <AntDesign
                  name={like ? 'like1' : 'like2'}
                  size={16}
                  color={colors.primary}
                />
                <Text
                  fontSize={10}
                  color={colors.primary}
                >
                  {like ? thread.likes + 1 : thread.likes}
                </Text>
              </HStack>
            </TouchableOpacity>
          </HStack>
        </HStack>
      </VStack>
    </Box>
  )
}

export default ThreadCard