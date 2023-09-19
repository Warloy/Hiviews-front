import React from "react"
import { useRouter } from "expo-router"
import { TouchableOpacity } from "react-native"
import { Box, HStack, VStack, Image, Text, ScrollView, Stack, Divider } from "native-base"

import { AntDesign, Feather, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons"
import { TComment } from "@/types/Post.Type"
import { before24hours, formatDate, getHour } from "@/utils"
import { colors } from "@/constants/Colors";

interface ICommentContainerProps {
    comment: TComment
}

const CommentCard = ({ comment }: ICommentContainerProps) => {
  const router = useRouter()
  return (
    <Box
      m={2}
      w={"95%"}
      bgColor={colors.white}
      py={2}
    >     
      <VStack
        space={3}
        pb={1}
      >
        <HStack
          space={5}
          px={3}
          w={"100%"}
          alignItems="center"
        >
          <VStack
            maxW={"15%"}
            h={"100%"}
            justifyContent={"flex-start"}
          >
            <TouchableOpacity
                onPress={() => {
                console.log(`Press profile picture of ${comment.author}`)
                router.push(`/profile/${comment.authorid}`)
              }}
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
            maxW={"85%"}
            h={"100%"}
            justifyContent="flex-start"
            pr={2}
          >
            <HStack
              space={2}
              alignItems={"flex-end"}
            >
              <TouchableOpacity
                onPress={() => {
                  console.log(`Press profile name of ${comment.author}`)
                  router.push(`/profile/${comment.authorid}`)
                }}
              >
                <Text
                  fontSize={"md"}
                  bold
                  color={colors.text}
                >
                  {comment.author}
                </Text>
              </TouchableOpacity>
              <Text
                fontSize={10}
                color={colors.text}
                textAlign={"right"}
              >
                {getHour(comment.date)} {formatDate(comment.date)}
              </Text>
            </HStack>
            <VStack
              w={"95%"}
              pr={1}
            >
              <Text
                fontSize="sm"
                color={colors.text}
              >
                {comment.content}
              </Text>
            </VStack>
            <HStack 
              justifyContent="flex-end"
              alignItems="flex-end"
              w={"100%"}
              space={3}
              py={1}
              px={5}
            >
              <TouchableOpacity
                onPress={() => console.log("Edit comment pressed")}
              >
                <HStack
                  alignItems="center"
                  space={1}
                >
                  <Text
                    fontSize="xs"
                    color={colors.text}
                  >
                    {"editar"}
                  </Text>
                  <Feather
                    name="edit"
                    size={14}
                    color={colors.primary}
                  />
                </HStack>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => console.log("Delete comment pressed")}
              >
                <HStack
                  alignItems="center"
                  space={1}
                >
                  <Text
                    fontSize="xs"
                    color={colors.text}
                  >
                    {"eliminar"}
                  </Text>
                  <AntDesign
                    name="delete"
                      size={14}
                      color={colors.primary}
                  />
                </HStack>
              </TouchableOpacity>
            </HStack>
          </VStack>
        </HStack>    
      </VStack>
      <Divider/>
    </Box>
  )
}

export default CommentCard