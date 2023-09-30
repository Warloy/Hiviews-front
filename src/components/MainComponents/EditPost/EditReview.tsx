import { useState } from "react";
import { TouchableOpacity, useWindowDimensions } from "react-native";
import { useRouter } from "expo-router";
import { AirbnbRating } from "react-native-elements";
import { Box, HStack, Image, ScrollView, Text, VStack, Stack, Button, Divider, TextArea } from "native-base";

import { colors } from "@/constants/Colors";
import { TReview } from "@/types/Post.Type";
import { before24hours, cutText, formatDate, getHour } from "@/utils";
import { AntDesign, Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";

const EditReview = ({ review }: { review: TReview }) => {
  const [textAreaHeight, setTextAreaHeight] = useState(30);
  const windowSize = useWindowDimensions()
  return(
    <Stack
      maxH={windowSize.height*0.4}
      w={windowSize.width*0.75}
    >
      <Stack
        alignItems="center"
        h="95%"
      >
        <Text
          fontSize={18}
          lineHeight={18}
          color={colors.primary}
          bold
        >
          Editar reseña
        </Text>
        <Divider
          mt={1}
          mb={2}
        />
        <HStack
          space={3}
          h={60}
          alignItems="center"
        >
          <Image
            borderRadius={50}
            h={50}
            w={50}
            source={review.image}
            alt={review.movie}
          />
          <VStack
            maxW="82%"
            justifyContent="center"
          >
            <Text
              fontSize="lg"
              color={colors.text}
            >
              {review.movie}
            </Text>

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
                  <Text
                      fontSize="xs"
                      color={colors.primary}
                    >
                      #{item.name.split(" ").join("")}
                    </Text>
                </Stack>
              ))}
            </ScrollView>
          </VStack>
        </HStack>
        <TextArea
          defaultValue={review.description}
          autoCompleteType={false}
          borderWidth={1}
          borderColor={colors.primary}
          p={2}
          m={0}
          mt={1}
          h={textAreaHeight}
          maxH={windowSize.height*0.20}
          borderRadius={5}
          alignItems="flex-start"
          justifyContent="flex-start"
          fontSize="sm"
          placeholder=""
          onContentSizeChange={(event) =>
            setTextAreaHeight(event.nativeEvent.contentSize.height)
          }
          _focus={{
            backgroundColor: "white", //"transparent"
            borderColor:"#975C8D"
          }}
        />
        <Stack
          w="100%"
          alignItems="flex-end"
          mt={2}
          mb={5}
        >
          <AirbnbRating
            defaultRating={review.rate}
            count={5}
            showRating={false}
            size={14}
            selectedColor={colors.tertiary}
          />
        </Stack>
      </Stack>
      <Stack
        w="100%"
        alignItems="flex-end"
        alignContent="flex-end"

      >
        <TouchableOpacity>
          <Text
            fontSize={16}
            lineHeight={16}
            color={colors.primary}
            bold
          >
            Guardar
          </Text>
        </TouchableOpacity>
      </Stack>
    </Stack>
  )
}

export default EditReview;