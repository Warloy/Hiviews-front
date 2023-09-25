import { ReactNode, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { AirbnbRating } from "react-native-elements";
import { Box, HStack, Image, ScrollView, Text, VStack, Stack } from "native-base";

import { colors } from "@/constants/Colors";
import { IReviewCard } from "@/interfaces/ReviewCard.Interface";
import { TReview } from "@/types/Post.Type";
import { before24hours, formatDate, getHour } from "@/utils";
import { AntDesign, Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";
import Animated, { Extrapolate, SharedValue, interpolate, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

const ButtonsUp = ({ review }: IReviewCard) => {

  const [like, setLike] = useState(false);
  const [bookmark, setBookmark] = useState(false);

  const bookmarked = useSharedValue(0);
  const liked = useSharedValue(0);

  const OutlineStyle = (style: SharedValue<number>) => useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(style.value, [0, 1], [1, 0], Extrapolate.CLAMP)
        }
      ]
    };
  });

  const FillStyle = (style: SharedValue<number>) => useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: style.value,
        }
      ],
      opacity: style.value
    };
  });

  const handleLiked = () => {
    liked.value = withSpring(liked.value ? 0 : 1);
    setLike(value => !value);
  };

  const handleBookmarked = () => {
    bookmarked.value = withSpring(bookmarked.value ? 0 : 1);
    setBookmark(!bookmark);
  };

  return (
    <>
      <HStack
        w={'100%'}
      >
        {(review.author === "Manuel" && before24hours(review.date)) &&
          <>
            <HStack
              w={'20%'}
              justifyContent={'center'}
            >
              <TouchableOpacity
                onPress={() => console.info("Delete pressed")}
              >
                <HStack
                  alignItems="center"
                  pr={2}
                >
                  <AntDesign
                    name="delete"
                    size={14}
                    color={colors.primary}
                  />
                </HStack>
              </TouchableOpacity>
            </HStack>
            <HStack
              w={'20%'}  
              justifyContent={'center'}
            >
              <TouchableOpacity
                onPress={() => console.info("Edit pressed")}
              >
                <HStack
                  alignItems="center"
                  pr={2}
                >
                  <Feather
                    name="edit"
                    size={14}
                    color={colors.primary}
                  />
                </HStack>
              </TouchableOpacity>
            </HStack>
          </>
        }
        
        {!(review.author === "Manuel" && before24hours(review.date)) &&
          <>
            <HStack
              w={'20%'}
              justifyContent={'center'}
            />
            <HStack
              w={'20%'}
              justifyContent={'center'}
            />
          </>
        }

        <HStack
          w={'20%'}  
          justifyContent={'center'}
        >
          <TouchableOpacity
            onPress={handleBookmarked}
          >
            <HStack
              alignItems="center"
              space={1}
              pr={2}
            >
              <Animated.View
                style={[StyleSheet.absoluteFill, OutlineStyle(bookmarked)]}
              >
                <Ionicons
                  name="ios-bookmark-outline"
                  size={14}
                  color={colors.primary}
                />
              </Animated.View>

              <Animated.View
                style={[StyleSheet.absoluteFill, FillStyle(bookmarked)]}
              >
                <Ionicons
                  name="ios-bookmark"
                  size={14}
                  color={colors.tertiary}
                />
              </Animated.View>

              <Text>
                {" "}
              </Text>
            </HStack>
          </TouchableOpacity>
        </HStack>

        <HStack
          w={'20%'}  
          justifyContent={'center'}
        >
          <TouchableOpacity
            onPress={() => console.info("Comment pressed")}
          >
            <HStack
              alignItems="center"
              space={1}
              mr={1}
            >
              <FontAwesome5
                name="comment-alt"
                size={12}
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
        </HStack>

        <HStack
          w={'20%'}  
          justifyContent={'center'}
        >
          <TouchableOpacity
            onPress={handleLiked}
          >
            <HStack
              alignItems="center"
              space={1}
            >

              <Animated.View
                style={[StyleSheet.absoluteFill, OutlineStyle(liked)]}
              >
                <AntDesign
                  name="like2"
                  size={13}
                  color={colors.primary}
                />
              </Animated.View>

              <Animated.View
                style={[StyleSheet.absoluteFill, FillStyle(liked)]}
              >
                <AntDesign
                  name="like1"
                  size={13}
                  color={colors.primary}
                />
              </Animated.View>

              <Text
                pl={2}
                fontSize={10}
                color={colors.primary}
              >
                {like ? review.likes + 1 : review.likes}
              </Text>
            </HStack>
          </TouchableOpacity>
        </HStack>
      </HStack>
    </>
  );
};

const ReviewPost = ({ review, children } : { review: TReview, children: ReactNode}) => {

  const router = useRouter();

  return (
    <Box
      h={"100%"}
      shadow={1}
      bgColor={colors.white}
    >
      <VStack>
        <HStack
          mt={3}
          space={5}
          px={3}
          h={60}
          alignItems="center"
        >
          <TouchableOpacity
            onPress={() => console.info(`Press review of ${review.movie} movie from ${review.author}`)}
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
            maxW="82%"
            justifyContent="center"
          >
            <TouchableOpacity
              onPress={() => {
                console.info(`${review.id} - ${review.movie} movie pressed`);
                router.push("/(tabs)/feed");
              }}
            >
              <Text
                fontSize="lg"
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
              {review.tags.map((item, index) => (
                <Stack
                  key={index}
                  px={1}
                >
                  <TouchableOpacity
                    onPress={() => {
                      console.info(`${item.id} - ${item.name} hashtag pressed`);
                      router.push("/(tabs)/feed");
                    }}
                  >
                    <Text
                      fontSize="xs"
                      color={colors.primary}
                    >
                      #{item.name.split(" ").join("")}
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
              pt={4}
              alignSelf="center"
              w="90%"
              h={"120px"}
            >
              <ScrollView
                showsVerticalScrollIndicator
                persistentScrollbar
              >
                <Text
                  fontSize="sm"
                  lineHeight={14}
                  color={colors.gray5}
                  textAlign={"justify"}
                >
                  {review.description}
                </Text>
              </ScrollView>
            </Stack>

            <VStack
              pr={2}
              pb={2}
              alignSelf="flex-end"
            >
              <Text
                fontSize={9}
                color={colors.gray5}
                textAlign="right"
              >
                {formatDate(review.date)} {getHour(review.date)}
              </Text>

              <HStack
                justifyContent="flex-end"
              >
                <Text
                  fontSize="xs"
                  color={colors.gray5}
                  textAlign="right"
                >
                  por{" "}
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    console.info(`${review.id} - ${review.author} author pressed`);
                    router.push("/(tabs)/feed");
                  }}
                >
                  <Text
                    bold
                    fontSize="xs"
                    color={colors.gray5}
                    textAlign="right"
                  >
                    {review.author}
                  </Text>
                </TouchableOpacity>
              </HStack>
              <AirbnbRating
                count={5}
                showRating={false}
                size={10}
                defaultRating={review.rate}
                isDisabled={true}
                selectedColor={colors.tertiary}
              />

            </VStack>
          </VStack>
        </Box>

        <HStack
          justifyContent="space-between"
          my={1}
          py={1}
          px={2}
        >
          <HStack
            px={2}
            space={3}
          >
            <ButtonsUp
              review={review}
            />
          </HStack>
        </HStack>
      </VStack>
      {children}
    </Box>
  );
};

export default ReviewPost;