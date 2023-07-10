import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Box, HStack, VStack, Image, Text, ScrollView, Stack, Divider } from 'native-base'
import { NavigationProp } from '@react-navigation/native'

import { AntDesign, Feather, FontAwesome5, Ionicons } from '@expo/vector-icons'

import { AirbnbRating } from 'react-native-elements'

import useCustomToast from '../../hooks/useCustomToast'

import { TReview } from '../../types'
import { before24hours, formatDate, getHour } from '../../utils/functions'
import colors from '../../styled-components/colors'

const ReviewCard = ({ navigation, review }: { navigation?: NavigationProp<any>, review: TReview }) => {

  const [like, setLike] = useState(false)
  const [bookmark, setBookmark] = useState(false)
  const toast = useCustomToast()

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
          <TouchableOpacity
            onPress={() => console.log(`Press review of ${review.movie} movie`)}
          >
            <Image
              borderRadius={50}
              h={50}
              w={50}
              source={review.image}
              alt={review.movie}
            />
          </TouchableOpacity>

          <VStack
            maxW='82%'
            justifyContent='center'
          >
            <TouchableOpacity
              onPress={() => {console.log(`${review.id} - ${review.movie} movie pressed`)
              navigation?.navigate('ReviewPage', {review: review})
            }}
            >
              <Text
                fontSize='lg'
                bold
                color={colors.text}
              >
                {review.movie}
              </Text>
            </TouchableOpacity>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              h={10}
              pr={2}
            >
              {review?.tags?.map((item, index) => (
                <Stack
                  key={index}
                  px={1}
                >
                  <TouchableOpacity
                    onPress={() => console.log(`${item.id} - ${item.name} hashtag pressed`)}
                  >
                    <Text
                      fontSize='xs'
                      color={colors.primary}
                    >
                      #{item.name?.split(' ').join('')}
                    </Text>
                  </TouchableOpacity>
                </Stack>
              ))}
            </ScrollView>
          </VStack>

        </HStack>
        <Box
          bgColor={colors.cardBackground}
          minH={50}
          borderTopRightRadius={35}
          borderBottomLeftRadius={35}
        >
          <VStack
            space={2}
          >
            <Stack
              py={2}
              alignSelf='center'
              w='85%'
            >
              <Text
                fontSize='xs'
                lineHeight={13}
                color={colors.gray5}
              >
                {review?.description}
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
                {formatDate(review.date)} {getHour(review.date)}
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
                  onPress={() => console.log(`${review.id} - ${review.author} author pressed`)}
                >
                  <Text
                    bold
                    fontSize='xs'
                    color={colors.text}
                    textAlign='right'
                  >
                    {review.author}
                  </Text>
                </TouchableOpacity>
              </HStack>
              <AirbnbRating
                count={5}
                showRating={false}
                size={10}
                defaultRating={review?.rate}
                isDisabled={true}
                selectedColor={colors.tertiary}
              />
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
            {review.author === 'Manuel' && before24hours(review.date) &&
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
              onPress={() => {
                toast.showSuccessToast(!bookmark? `Añadido a favoritos.` : `Eliminado de favoritos.`)
                setBookmark(!bookmark)
              }}
            >
              <HStack
                alignItems='center'
                mr={2}
              >
                <Ionicons
                  name={bookmark ? 'ios-bookmark' : 'ios-bookmark-outline'}
                  size={14}
                  color={colors.primary}
                />
              </HStack>
            </TouchableOpacity> 

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
                  {review.comments}
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
                  {like ? review.likes + 1 : review.likes}
                </Text>
              </HStack>
            </TouchableOpacity>
          </HStack>
        </HStack>
      </VStack>
    </Box>
  )
}

export default ReviewCard