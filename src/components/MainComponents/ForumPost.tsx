import {  useEffect, ReactNode, useState } from "react";
import { StyleSheet, TouchableOpacity, useWindowDimensions, Image as ImageHelper } from "react-native";
import { useRouter } from "expo-router";
import { Box, HStack, Image, Text, VStack, Stack, ScrollView, Button, Modal } from "native-base";

import SVGImg from "@/assets/images/logo.svg";
import { colors } from "@/constants/Colors";
import { IForumCard } from "@/interfaces/ForumCard.Interface";
import { TThread } from "@/types/Post.Type";
import { before24hours, formatDate, getHour } from "@/utils";
import { AntDesign, Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";
import Animated, { Extrapolate, SharedValue, interpolate, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import StyledModal from "../StyledModal";
import EditThread from "./EditPost/EditThread";

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
                  router.push(`/thread/edit/${thread._id}`);
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
            onPress={() => {console.info("Comment pressed");
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

const ForumPost = ({ thread, children } : { thread: TThread, children: ReactNode}) => {
  const { height, width } = useWindowDimensions();
  const [ modalH, setModalH ] = useState(height * 0.8);
  const [ modalW, setModalW ] = useState(height * 0.8);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const solveModalDimensions = () => {
    const pictureSize = (thread.picture ? ImageHelper.resolveAssetSource(thread.picture) : { height: height, width: width });
    const aspectRatio = (pictureSize.height / pictureSize.width);
    const MaxH = height * 0.8;
    const MaxW = width * 0.8;
    if (aspectRatio > 1) {
      if ((MaxH) < pictureSize.height) {
        setModalH(MaxH);
        setModalW(MaxH*aspectRatio);
      } else {
        setModalH(pictureSize.height);
        setModalW(pictureSize.height*aspectRatio);
      }
    } else {
      if ((MaxW) < pictureSize.width) {
        setModalW(MaxW);
        setModalH(MaxW*aspectRatio);
      } else {
        setModalW(pictureSize.width);
        setModalH(pictureSize.width*aspectRatio);
      }
    }
  }

  useEffect(() => {
    solveModalDimensions()
  }, []);

  return (
    <Box
      minH={100}
      shadow={1}
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
            <Modal
              isOpen={showModal}
              onClose={() => setShowModal(false)}
            >
              <Modal.Content
                height={modalH}
                width={modalW}
              >
                <Image
                  source={thread.picture}
                  alt={"No se pudo mostrar la imagen"}
                  style={{
                    resizeMode: 'stretch',
                    flex: 1,
                    aspectRatio: 1
                  }}
                />
              </Modal.Content>
            </Modal>
          </> : <>
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
                console.info(`${thread._id} - ${thread.topic} topic pressed`);
                router.push(`/thread/${thread._id}`);
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
              pt={4}
              alignSelf="center"
              w="90%"
              h={height*0.175}
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
                  {thread.description}
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
                    console.info(`${thread._id} - ${thread.author} author pressed`);
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
      {children}
    </Box>
  );
};

export default ForumPost;