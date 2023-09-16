
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { AirbnbRating } from "react-native-elements";
import { Box, HStack, Image, ScrollView, Text, VStack, Stack } from "native-base";

import { colors } from "@/constants/Colors";
import useCustomToast from "@/hooks/useCustomToast";
import { IReviewCard } from "@/interfaces/ReviewCard.Interface";
import { before24hours, formatDate, getHour } from "@/utils";
import { AntDesign, Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";

const ButtonsUp = ({ review }: IReviewCard) => {

  const [like, setLike] = useState(false);
  const [bookmark, setBookmark] = useState(false);
  const { showSuccessToast } = useCustomToast();

  return (
    (review.author === "Manuel" && before24hours(review.date)) &&
    <>
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

      <TouchableOpacity
        onPress={() => {
          showSuccessToast(!bookmark ? "Añadido a favoritos" : "Eliminado de favoritos");
          setBookmark(value => !value);
        }}
      >
        <HStack
          alignItems="center"
          mr={2}
        >
          <Ionicons
            name={bookmark ? "ios-bookmark" : "ios-bookmark-outline"}
            size={14}
            color={colors.primary}
          />
        </HStack>
      </TouchableOpacity>

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

      <TouchableOpacity
        onPress={() => {
          setLike(value => !value)
        }}
      >
        <HStack
          alignItems="center"
          space={1}
        >
          <AntDesign
            name={like ? "like1" : "like2"}
            size={13}
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
    </>
  );
};

const ReviewCard = ({ review }: IReviewCard) => {

  const router = useRouter();

  return (
    <Box
      m={2}
      minH={100}
      shadow={1}
      borderRadius={5}
      bgColor={colors.white}
    >
      <VStack>
        <HStack
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
              py={2}
              alignSelf="center"
              w="85%"
            >
              <Text
                fontSize="xs"
                lineHeight={13}
                color={colors.gray5}
              >
                {review.description}
              </Text>
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
    </Box>
  );
};

export default ReviewCard;