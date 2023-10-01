import { useState } from "react";
import { StyleSheet, TouchableOpacity, useWindowDimensions } from "react-native";
import { useRouter } from "expo-router";
import { Box, HStack, Image, Text, VStack, Stack, Button } from "native-base";

import SVGImg from "@/assets/images/logo.svg";
import { colors } from "@/constants/Colors";
import StyledModal from "@/components/StyledModal";
import { IForumCard } from "@/interfaces/ForumCard.Interface";
import { before24hours, cutText, formatDate, getHour } from "@/utils";
import { AntDesign, Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";
import Animated, { Extrapolate, SharedValue, interpolate, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import StyledField from "@/components/StyledField";
import EditThread from "../EditPost/EditThread";

const ButtonsUp = ({ thread }: IForumCard) => {
  const router = useRouter()
  const [like, setLike] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

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

  return (
    <>
      <HStack
        w={'100%'}
      >
        {(thread.author === "Manuel" && before24hours(thread.date)) ?
          <>
            <HStack
              w={'20%'}
              justifyContent={'center'}
            >
              <TouchableOpacity
                onPress={() => {
                  console.info("Delete pressed")
                  setDeleteModal(true)
                }}
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
                onPress={() => {
                  console.info("Edit pressed");
                  router.push(`/thread/edit/${thread.id}`);
                  //setEditModal(true)
                }}
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
            <StyledModal
              isOpen={editModal}
              onClose={() => setEditModal(false)}
              size="xl"
            >
              <EditThread
                thread={thread}
              />
            </StyledModal>
            <StyledModal
              isOpen={deleteModal}
              onClose={() => setDeleteModal(false)}
              size="xl"
            >
              <VStack
                justifyContent="center"
                alignItems="center"
                space={2}
                w="100%"
              >
                <Text
                  bold
                  color={colors.primary}
                >
                  ¿Eliminar hilo?
                </Text>
                <Text
                  italic
                  color={colors.gray1}
                >
                  Esta acción no se puede deshacer.
                </Text>

                <Button.Group space={4}>
                  <Button
                    w="20%"
                    borderRadius={50}
                    style={{
                      backgroundColor: colors.secondary
                    }}
                    shadow={1}
                    onPress={() => setDeleteModal(false)}
                  >
                    No
                  </Button>
                  <Button
                    w="20%"
                    borderRadius={50}
                    style={{
                      backgroundColor: colors.primary
                    }}
                    shadow={1}
                    onPress={() => setDeleteModal(false)}
                  >
                    Sí
                  </Button>
                </Button.Group>
              </VStack>
            </StyledModal>
          </> : 
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
            disabled
          >
            <HStack
              alignItems="center"
              space={1}
              pr={2}
            >
              <Animated.View
                style={[StyleSheet.absoluteFill]}
              >
                <Ionicons
                  name="ios-bookmark-outline"
                  size={14}
                  color={"transparent"}
                />
              </Animated.View>

              <Animated.View
                style={[StyleSheet.absoluteFill]}
              >
                <Ionicons
                  name="ios-bookmark"
                  size={14}
                  color={"transparent"}
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
            onPress={() => {console.info("Comment pressed")
              router.push(`/thread/${thread.id}`);
            }}
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
                {thread.comments}
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
                {like ? thread.likes + 1 : thread.likes}
              </Text>
            </HStack>
          </TouchableOpacity>
        </HStack>
      </HStack>
    </>
  );
};

const ForumCard = ({ thread }: IForumCard) => {
  const windowDimensions = useWindowDimensions()
  const [showModal, setShowModal] = useState(false);
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
          space={2}
          mt={2}
          px={4}
          h={60}
          alignItems="center"
        >
          {thread?.picture ? <>
            <TouchableOpacity
              onPress={() => {
                console.info(`Press picture of ${thread.topic} topic from ${thread.author}`)
                setShowModal(true)
              }}
            >
              <Image
                borderRadius={5}
                h={50}
                w={50}
                source={thread.picture}
                alt={thread.topic}
              />
            </TouchableOpacity>
            <StyledModal
              isOpen={showModal}
              onClose={() => setShowModal(false)}
            >
              <Stack
                maxH={windowDimensions.height*0.6}
                maxW={windowDimensions.width*0.6}
              >
                <Image
                  source={thread.picture}
                  alt={"No se pudo mostrar la imagen"}
                  maxH={windowDimensions.height*0.6}
                  maxW={windowDimensions.width*0.6}
                  resizeMode="center"
                />
              </Stack>
            </StyledModal>
          </>:<>
            <SVGImg
              height={50}
              width={50}
            />
          </>}

          <VStack
            maxW="82%"
            justifyContent="center"
          >
            <TouchableOpacity
              onPress={() => {
                console.info(`${thread.id} - ${thread.topic} topic pressed`);
                router.push(`/thread/${thread.id}`);
              }}
            >
              <Text
                fontSize="md"
                bold
                lineHeight={16}
                color={colors.text}
              >
                {thread.topic}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                console.info(`${thread.category.name} category pressed`);
                router.push(`/(tabs)/forum`);
              }}
            >
              <HStack
                mt={1}
              >
                <Text
                  fontSize="sm"
                  color={colors.text}
                  lineHeight={14}
                >
                  En
                </Text>
                <Text
                  bold
                  fontSize="sm"
                  color={colors.text}
                  lineHeight={14}
                >
                  {" " + thread.category.name}
                </Text>
              </HStack>
            </TouchableOpacity>
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
                textAlign={"justify"}
              >
                {cutText(thread.description, 250)}
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
                {formatDate(thread.date)} {getHour(thread.date)}
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
                    console.info(`${thread.id} - ${thread.author} author pressed`);
                    router.push(`/profile/${thread.authorID}`);
                  }}
                >
                  <Text
                    fontSize="xs"
                    color={colors.gray5}
                    textAlign="right"
                  >
                    {thread.author}
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
          <HStack
            px={2}
            space={3}
          >
            <ButtonsUp
              thread={thread}
            />
          </HStack>
        </HStack>
      </VStack>
    </Box>
  );
};

export default ForumCard;