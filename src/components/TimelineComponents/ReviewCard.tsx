import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Box, HStack, VStack, Image, Text, ScrollView, Stack, Divider } from 'native-base'

import { AntDesign, Feather, FontAwesome5 } from '@expo/vector-icons'

import { AirbnbRating } from 'react-native-elements'

import { TReview } from '../../types'
import colors from '../../styled-components/colors'

const ReviewCard = ({ review }: { review: TReview }) => {

  const [like, setLike] = useState(false)

  return (
    <Box
      m={2}
      minH={100}
      shadow={1}
      borderRadius={5}
      bgColor={colors.container.top}
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
              borderRadius='full'
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
            <Text
              fontSize='lg'
              bold
              color={colors.tertiary}
            >
              {review.movie}
            </Text>
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
                  <Text
                    fontSize='xs'
                    color={colors.tertiary}
                  >
                    #{item.name?.split(' ').join('')}
                  </Text>
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
                color={colors.tertiary}
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
                color={colors.tertiary}
                textAlign='right'
              >
                {review.date.toLocaleString()}
              </Text>
              <Text
                fontSize='xs'
                color={colors.tertiary}
                textAlign='right'
              >
                por{' '}
                <Text
                  bold
                >
                  {review.author}
                </Text>
              </Text>
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
          justifyContent='flex-end'
          alignItems='center'
          space={3}
          py={1}
          px={2}
        >
          {review.author === 'Manuel' &&
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
                    color={colors.tertiary}
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
                    color={colors.tertiary}
                  />
                </HStack>
              </TouchableOpacity>
            </>

          }

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
                color={colors.tertiary}
              />
              <Text
                fontSize={10}
                color={colors.tertiary}
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
                color={colors.tertiary}
              />
              <Text
                fontSize={10}
                color={colors.tertiary}
              >
                {like ? review.likes + 1 : review.likes}
              </Text>
            </HStack>
          </TouchableOpacity>
        </HStack>
      </VStack>
    </Box>
  )
}

export default ReviewCard