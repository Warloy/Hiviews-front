
import { useState } from "react";
import { Box, HStack, Image, ScrollView, Text, VStack, Stack } from "native-base";

import { colors } from "@/constants/Colors";
import useCustomToast from "@/hooks/useCustomToast";
import { IReviewCard } from "@/interfaces/ReviewCard.Interface";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { formatDate, getHour } from "@/utils";

const ReviewCard = ({ review }: IReviewCard) => {

  const [like, setLike] = useState(false);
  const [bookmark, setBookmark] = useState(false);
  const { showSuccessToast } = useCustomToast();

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

              
            </VStack>
          </VStack>
        </Box>

        <HStack
          justifyContent="space-between"
          my={1}
          py={1}
          px={2}
        >
          <HStack>
            
          </HStack>
        </HStack>
      </VStack>
    </Box>
  );
};

export default ReviewCard;