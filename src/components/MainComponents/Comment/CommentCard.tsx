import React from "react"
import { useRouter } from "expo-router"
import { TouchableOpacity } from "react-native"
import { Box, HStack, VStack, Image, Text, Divider } from "native-base"
import { AntDesign, Feather } from "@expo/vector-icons"

import useAuthContext from "@/hooks/useAuthContext";
import { TComment } from "@/types/Post.Type"
import { before24hours, formatDate, getHour } from "@/utils"
import { colors } from "@/constants/Colors";

interface ICommentContainerProps {
    comment: TComment
}

const CommentCard = ({ comment }: ICommentContainerProps) => {
  const router = useRouter()
  const { state: { user } } = useAuthContext();
  return (
    <Box
      m={2}
      w={"95%"}
      bgColor={colors.white}
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
                router.push(`/profile/${comment.authorID}`)
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
            <VStack
              alignItems={"flex-start"}
            >
              <TouchableOpacity
                  onPress={() => {
                    console.log(`Press profile name of ${comment.author}`)
                    router.push(`/profile/${comment.authorID}`)
                  }}
                >
                  <Text
                    fontSize={"md"}
                    bold
                    color={colors.text}
                    flexWrap={"wrap"}
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
            </VStack>
            <VStack
              w={"100%"}
              my={1}
              pr={2}
            >
              <Text
                fontSize="sm"
                lineHeight={16}
                color={colors.gray2}
              >
                {comment.content}
              </Text>
            </VStack>
          </VStack>
        </HStack>
        { user?.id == comment.authorID &&
          <HStack 
            justifyContent="space-between"
            w={"35%"}
            space={5}
            px={7}
            pb={1}
          >
            <TouchableOpacity
              onPress={() => console.log("Delete comment pressed")}
            >
              <AntDesign
                name="delete"
                  size={14}
                  color={colors.primary}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => console.log("Edit comment pressed")}
            >
              <Feather
                name="edit"
                size={14}
                color={colors.primary}
              />
            </TouchableOpacity>
          </HStack>
        }
      </VStack>
      <Divider/>
    </Box>
  )
}

export default CommentCard