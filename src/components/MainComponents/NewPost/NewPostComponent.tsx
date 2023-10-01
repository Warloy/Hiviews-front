import { useCallback, useRef, useState } from "react";
import { Avatar, Button, Divider, FormControl, HStack, Icon, KeyboardAvoidingView, ScrollView, Stack, Text, TextArea, VStack, WarningOutlineIcon } from "native-base";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { colors, arrayColor } from "@/constants/Colors";

import { newPostSchema, newPostDefaultValues } from "@/schemas/NewPostSchema";
import { newPostAdapter } from "@/adapters/PostAdapter";

import useLoading from "@/hooks/useLoading";
import useCustomToast from "@/hooks/useCustomToast";
import { TCategory, TReview } from "@/types/Post.Type";
import { ImageBackground, TouchableOpacity } from "react-native";
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { pickImage } from "@/utils/functions";
import { useAppSelector } from "@/hooks/useRedux";
import categoriesData from "@/static/categoriesData";
import StyledModal from "@/components/StyledModal";
import StyledField from "@/components/StyledField";
import { useFocusEffect } from "expo-router";

const NewPostComponent = () => {

  const ref = useRef();

  const { user } = useAppSelector(state => state.user);

  const [titleTextAreaHeight, setTitleTextAreaHeight] = useState(18);
  const [textAreaHeight, setTextAreaHeight] = useState(30);
  const [imagePost, setImagePost] = useState<string | null>(null);

  const [tags, setTags] = useState<TCategory | null>(null);
  const [tagModal, setTagModal] = useState(false);

  const [searchTags, setSearchTags] = useState<TCategory[]>(categoriesData);
  const [filteredTags, setFilteredTags] = useState("");

  const { isLoading, startLoading, stopLoading } = useLoading();
  const { showErrorToast, showSuccessToast } = useCustomToast();

  const handleTag = (tag: TCategory) => {
    setTags(tag);
  };

  const tagColor = (tag: TCategory) => {
    if (tag && Number(tag.id) <= arrayColor.length) {
      return arrayColor[Number(tag.id) - 1];
    } 

    return arrayColor[0];
  };

  const tagIcon = () => {
    if (!tags) {
      return "tag-outline";
    } else {
      return "tag";
    }
  };

  useFocusEffect(
    useCallback(() => {
      let search: TCategory[] = [];

      searchTags.forEach(item => {
        if (filteredTags && filteredTags !== "" && item.name.includes(filteredTags)) {
          search.push(item);
        }
      });

      if (filteredTags && filteredTags !== "") {
        setSearchTags(search);
      } else {
        setSearchTags(categoriesData);
      }

    }, [filteredTags])
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid, errors }
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(newPostSchema),
    defaultValues: newPostDefaultValues
  });

  const onSubmit = async (values: any) => {
    startLoading();

    try {
      console.log(values);
    } catch (error) {
      console.error(error);
      showErrorToast(`Lo lamento, ha ocurrido un error... ${error}`);
    } finally {
      stopLoading();
      reset();
    }
  };

  return (
    <KeyboardAvoidingView>
      <VStack
        h="95%"
        justifyContent="space-between"
      >

        <HStack
          w="100%"
          h="10%"
          maxH="80%"
          pt={3}
          px={3}
          space={2}
        >

          <VStack
            space={2}
            alignItems="center"
            w="15%"
          >
            <Avatar
              alignSelf="center"
              size="md"
              source={user?.avatar}
              bg={colors.secondary}
            >
              {user?.name.charAt(0)}{user?.surname.charAt(0)}
            </Avatar>
            <Divider
              orientation="vertical"
              h={textAreaHeight + (imagePost ? 265 : 0)}
            />
          </VStack>

          <VStack
            space={1}
            ml={2}
            w="80%"
          >
            <Text
              bold
              fontSize="md"
              color={colors.gray5}
            >
              {user?.username}
            </Text>

            <Controller
              name="title"
              control={control}
              render={({ field: { onChange } }) => (
                <FormControl
                  isInvalid={Boolean(errors.description)}
                >
                  <TextArea
                    ref={ref}
                    autoCompleteType={false}
                    borderWidth={0}
                    p={0}
                    my={1}
                    h={(titleTextAreaHeight < 37) ? titleTextAreaHeight : 36}
                    maxH={36}
                    borderRadius={5}
                    alignItems="flex-start"
                    justifyContent="flex-start"
                    fontSize="md"
                    color={colors.primary}
                    placeholder="¿Qué quieres contar?"
                    onChangeText={onChange}
                    onContentSizeChange={(event) =>
                      setTitleTextAreaHeight(event.nativeEvent.contentSize.height)
                    }
                    _focus={{
                      backgroundColor: "white" //"transparent"
                    }}
                  />
                  {errors.description && (
                    <FormControl.ErrorMessage
                      leftIcon={
                        <WarningOutlineIcon
                          size="xs"
                        />
                      }
                    >
                      {errors.description.message}
                    </FormControl.ErrorMessage>
                  )}
                </FormControl>
              )}
            />
            <Stack>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
              >
                {tags && (
                  <Stack
                    bgColor={tagColor(tags)}
                    borderRadius="full"
                    px={2}
                  >
                    <Text
                      fontSize="xs"
                      color={colors.white}
                    >
                      {tags.name}
                    </Text>
                  </Stack>
                )}
              </ScrollView>
            </Stack>

            <Divider 
              my={1} 
            />
            <Controller
              name="description"
              control={control}
              render={({ field: { onChange } }) => (
                <FormControl
                  isInvalid={Boolean(errors.description)}
                >
                  <TextArea
                    ref={ref}
                    autoCompleteType={false}
                    borderWidth={0}
                    p={0}
                    m={0}
                    mb={1}
                    h={(textAreaHeight < 121) ? textAreaHeight : 120}
                    maxH={120}
                    borderRadius={10}
                    alignItems="flex-start"
                    justifyContent="flex-start"
                    fontSize="sm"
                    placeholder="Danos más detalles al respecto..."
                    onChangeText={onChange}
                    onContentSizeChange={(event) =>
                      setTextAreaHeight(event.nativeEvent.contentSize.height)
                    }
                    _focus={{
                      backgroundColor: "white" //"transparent"
                    }}
                  />
                  {errors.description && (
                    <FormControl.ErrorMessage
                      leftIcon={
                        <WarningOutlineIcon
                          size="xs"
                        />
                      }
                    >
                      {errors.description.message}
                    </FormControl.ErrorMessage>
                  )}
                </FormControl>
              )}
            />

            <HStack>

              {!imagePost ?
                <HStack
                  space={3}
                  alignItems="center"
                >
                  <TouchableOpacity
                    onPress={async () => {
                      let image = await pickImage();

                      if (image) {
                        setImagePost(image);
                      }
                    }}
                  >
                    <Ionicons
                      name="image-outline"
                      size={20}
                      color={colors.gray0}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      setTagModal(true);
                    }}
                  >
                    <MaterialCommunityIcons
                      name={tagIcon()}
                      size={20}
                      color={colors.gray0}
                    />
                  </TouchableOpacity>
                </HStack>
                :
                <VStack
                  space={3}
                >
                  <TouchableOpacity
                    activeOpacity={0.75}
                    style={{
                      marginTop: 5
                    }}
                    onPress={() => {
                      setImagePost(null);
                    }}
                  >
                    <ImageBackground
                      source={{
                        uri: imagePost
                      }}
                      style={{
                        width: 285,
                        height: 285,
                        borderRadius: 15
                      }}
                      imageStyle={{
                        borderRadius: 15
                      }}
                      alt="Post image"
                    >
                      <Icon
                        as={
                          <MaterialIcons
                            name="cancel"
                            color={colors.white}
                          />
                        }
                        size={7}
                        m={2}
                        opacity={0.5}
                        alignSelf="flex-end"
                      />
                    </ImageBackground>
                  </TouchableOpacity>

                  <Stack
                    pl={5}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        setTagModal(true);
                      }}
                    >
                      <MaterialCommunityIcons
                        name={tagIcon()}
                        size={20}
                        color={colors.gray0}
                      />
                    </TouchableOpacity>
                  </Stack>

                </VStack>
              }
            </HStack>
          </VStack>
        </HStack>

        <StyledModal
          isOpen={tagModal}
          onClose={() => setTagModal(false)}
          header="¿Quieres incorporar alguna categoría?"
          size="xl"
          maxH={800}
          bodyM={0}
          bodyP={0}
        >
          <ScrollView
            px={5}
            pt={3}
          >
            <StyledField
              placeholder="Dime, ¿qué categoría buscas?"
              value={filteredTags}
              onChangeText={text => setFilteredTags(text)}
              mb={2}
            />
            {searchTags.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleTag(item)}
                >
                  <HStack
                    py={0.5}
                    w="100%"
                  >
                    <Text
                      bold={tags?.id === item.id}
                      fontSize="xs"
                    >
                      {item.name}
                    </Text>
                  </HStack>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          <Divider />
          <Stack>
            <Button
              onPress={() => setTagModal(false)}
              borderTopRadius={0}
              bgColor={colors.secondary}
            >
              Aceptar
            </Button>
          </Stack>
        </StyledModal>


        <HStack
          justifyContent="space-between"
          alignItems="center"
          bgColor={colors.white}
          px={2}
          pb={2}
          w="100%"
        >
          <Stack
            w="70%"
          >
            <Text
              color={colors.gray1}
            >
              Tu thread será visible por todos
            </Text>
          </Stack>

          <Stack
            w="30%"
          >
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
            >
              <Stack
                p={3}
                px={5}
                justifyContent="center"
                alignItems="center"
                borderRadius={10}
              >
                <Text
                  bold
                  color={colors.primary}
                  fontSize="lg"
                >
                  Thread
                </Text>
              </Stack>
            </TouchableOpacity>
          </Stack>
        </HStack>
      </VStack>
    </KeyboardAvoidingView>
  );
};

export default NewPostComponent;