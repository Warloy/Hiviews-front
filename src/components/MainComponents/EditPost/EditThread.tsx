import { useState } from "react";
import { TouchableOpacity, useWindowDimensions } from "react-native";
import { useRouter } from "expo-router";
import { Box, HStack, Image, ScrollView, Text, VStack, Stack, Button, Divider, TextArea } from "native-base";

import SVGImg from "@/assets/images/logo.svg";
import { colors } from "@/constants/Colors";
import { TThread } from "@/types/Post.Type";
import { before24hours, cutText, formatDate, getHour } from "@/utils";
import { AntDesign, Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";

const EditThread = ({ thread }: { thread: TThread }) => {
  const [titleAreaHeight, setTitleAreaHeight] = useState(36)
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
          Editar hilo
        </Text>
        <Divider
          mt={1}
          mb={2}
        />
        <HStack
          w="90%"
          space={2}
          alignItems="center"
        >
          {thread?.picture ? <>
            <Image
              borderRadius={5}
              h={50}
              w={50}
              source={thread.picture}
              alt={thread.topic}
            />
          </>:
          <>
            <SVGImg
              height={50}
              width={50}
            />
          </>
          }
          
          <VStack
            w="83%"
            justifyContent="center"
            space={1}
          >
            <TextArea
              defaultValue={thread.topic}
              autoCompleteType={false}
              borderWidth={1}
              borderColor={colors.primary}
              p={2}
              m={0}
              mt={1}
              h={titleAreaHeight}
              maxH={windowSize.height*0.075}
              borderRadius={5}
              alignItems="flex-start"
              justifyContent="flex-start"
              fontSize="sm"
              placeholder=""
              onContentSizeChange={(event) =>
                setTitleAreaHeight(event.nativeEvent.contentSize.height)
              }
              _focus={{
                backgroundColor: "white", //"transparent"
                borderColor:"#975C8D"
              }}
            />
            <HStack
              mt={1}
            >
              <Text
                fontSize="sm"
                color={colors.gray3}
                lineHeight={14}
              >
                En
              </Text>
              <Text
                bold
                fontSize="sm"
                color={colors.gray3}
                lineHeight={14}
              >
                {" " + thread.category.name}
              </Text>
            </HStack>
          </VStack>
        </HStack>
        <TextArea
          defaultValue={thread.description}
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

export default EditThread;