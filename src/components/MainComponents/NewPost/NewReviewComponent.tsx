import { useCallback, useRef, useState } from "react";
import { Avatar, Button, Divider, FormControl, HStack, Icon, Image, Input, KeyboardAvoidingView, ScrollView, Stack, Text, TextArea, VStack, WarningOutlineIcon } from "native-base";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { colors } from "@/constants/Colors";

import { newPostSchema, newPostDefaultValues } from "@/schemas/NewPostSchema";

import useLoading from "@/hooks/useLoading";
import useCustomToast from "@/hooks/useCustomToast";
import { TMovie, TReview, TTag } from "@/types/Post.Type";
import { ImageBackground, TouchableOpacity } from "react-native";
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { pickImage } from "@/utils/functions";
import { useAppSelector } from "@/hooks/useRedux";
import { AirbnbRating } from "react-native-elements";
import StyledModal from "@/components/StyledModal";
import { useFocusEffect } from "expo-router";
import movieData from "@/static/moviesData";
import { cutText } from "@/utils";
import tagsData from "@/static/tagsData";
import StyledField from "@/components/StyledField";

const NewReviewComponent = () => {

  const ref = useRef();

  const { user } = useAppSelector(state => state.user);

  const [textAreaHeight, setTextAreaHeight] = useState(30);

  const [movie, setMovie] = useState<TMovie | null>(null);
  const [movieModal, setMovieModal] = useState(false);

  const [recommendedMovies, setRecommendedMovies] = useState<TMovie[]>(movieData.slice(0, 5));
  const [searchMovies, setSearchMovies] = useState<TMovie[]>(movieData);
  const [filteredMovies, setFilteredMovies] = useState("");

  const [tags, setTags] = useState<TTag[]>([]);
  const [tagModal, setTagModal] = useState(false);

  const [searchTags, setSearchTags] = useState<TTag[]>(tagsData);
  const [filteredTags, setFilteredTags] = useState("");

  const { isLoading, startLoading, stopLoading } = useLoading();
  const { showErrorToast, showSuccessToast } = useCustomToast();

  useFocusEffect(
    useCallback(() => {
      let recommended: TMovie[] = [];
      let search: TMovie[] = [];

      recommendedMovies.forEach(item => {
        if (filteredMovies && filteredMovies !== "" && item.name.includes(filteredMovies)) {
          recommended.push(item);
        }
      });

      searchMovies.forEach(item => {
        if (filteredMovies && filteredMovies !== "" && item.name.includes(filteredMovies)) {
          search.push(item);
        }
      });

      if (filteredMovies && filteredMovies !== "") {
        setRecommendedMovies(recommended);
        setSearchMovies(search);
      } else {
        setRecommendedMovies(movieData.slice(0, 5));
        setSearchMovies(movieData);
      }

    }, [filteredMovies])
  );

  useFocusEffect(
    useCallback(() => {
      let search: TTag[] = [];

      searchTags.forEach(item => {
        if (filteredTags && filteredTags !== "" && item.name.includes(filteredTags)) {
          search.push(item);
        }
      });

      if (filteredTags && filteredTags !== "") {
        setSearchTags(search);
      } else {
        setSearchTags(tagsData);
      }

    }, [filteredTags])
  );

  const handleTag = (tag: TTag) => {
    if (tags.includes(tag)) {
      setTags(values => values.filter(item => item.id !== tag.id));
    } else {
      setTags([...tags, tag]);
    }
  };

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

  const tagIcon = () => {
    if (!tags || tags.length <= 0) {
      return "tag-outline";
    } else if (tags.length === 1) {
      return "tag";
    } else {
      return "tag-multiple";
    }
  };

  return (
    <KeyboardAvoidingView>
      <VStack
        h="95%"
        w="100%"
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
              h={textAreaHeight}
            />
          </VStack>

          <VStack
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

            {movie &&
              <Text
                py={0}
                my={0}
                fontSize="lg"
                bold
                color={colors.text}
              >
                {movie.name}
              </Text>
            }

            <Stack
              w="105%"
            >
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
              >
                {tags.map((item, index) => (
                  <Stack
                    key={index}
                    pr={2}
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
            </Stack>

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
                    my={2}
                    mt={1}
                    h={textAreaHeight}
                    maxH={120}
                    borderRadius={10}
                    alignItems="flex-start"
                    justifyContent="flex-start"
                    fontSize="sm"
                    placeholder={`Cuéntanos sobre ${movie ? cutText(movie.name, 27) : "la película..."}`}
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

            <HStack
              justifyContent="space-between"
              alignItems="center"
              w="100%"
              minW="100%"
            >
              <HStack
                space={3}
                alignItems="center"
                w="70%"
              >
                <TouchableOpacity
                  onPress={() => {
                    setMovieModal(true)
                  }}
                >
                  <MaterialCommunityIcons
                    name={movie ? "movie" : "movie-open-outline"}
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

              <Stack
                w="30%"
              >
                {movie &&
                  <AirbnbRating
                    count={5}
                    showRating={false}
                    size={12}
                    selectedColor={colors.tertiary}
                  />
                }
              </Stack>

              <StyledModal
                isOpen={movieModal}
                onClose={() => setMovieModal(false)}
                header="¿Qué película estás buscando?"
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
                    placeholder="Dime, ¿qué película buscas?"
                    value={filteredMovies}
                    onChangeText={text => setFilteredMovies(text)}
                    mb={2}
                  />
                  {recommendedMovies.length > 0 &&
                    <>
                      <VStack>
                        <Text
                          bold
                          fontSize="sm"
                        >
                          Recomendados
                        </Text>
                        {recommendedMovies.map((item, index) => {
                          return (
                            <TouchableOpacity
                              key={index}
                              onPress={() => {
                                setMovie(item);
                                setMovieModal(false);
                              }}
                            >
                              <HStack
                                py={1}
                                alignItems="center"
                                space={2}
                              >
                                <Image
                                  borderRadius="full"
                                  height={10}
                                  width={10}
                                  source={item.image}
                                  alt={item.name}
                                />
                                <Text
                                  bold={movie?.id === item.id}
                                  fontSize="xs"
                                >
                                  {item.name}
                                </Text>
                              </HStack>
                            </TouchableOpacity>
                          );
                        })}
                      </VStack>
                      <Divider />
                    </>
                  }
                  <VStack>
                    {searchMovies.map((item, index) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          onPress={() => {
                            setMovie(item);
                            setMovieModal(false);
                          }}
                        >
                          <HStack
                            py={1}
                            alignItems="center"
                            space={2}
                          >
                            <Image
                              borderRadius="full"
                              height={10}
                              width={10}
                              source={item.image}
                              alt={item.name}
                            />
                            <Text
                              fontSize="xs"
                              bold={movie?.id === item.id}
                            >
                              {item.name}
                            </Text>
                          </HStack>
                        </TouchableOpacity>
                      );
                    })}
                  </VStack>
                </ScrollView>
              </StyledModal>

              <StyledModal
                isOpen={tagModal}
                onClose={() => setTagModal(false)}
                header="¿Quieres incorporar alguna etiqueta?"
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
                    placeholder="Dime, ¿qué etiqueta buscas?"
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
                            bold={tags.includes(item)}
                            fontSize="xs"
                          >
                            #{item.name.split(" ").join("")}
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

            </HStack>

          </VStack>

        </HStack>

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
              Tu review será visible por todos
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
                  Review
                </Text>
              </Stack>
            </TouchableOpacity>
          </Stack>
        </HStack>
      </VStack>
    </KeyboardAvoidingView>
  );
};

export default NewReviewComponent;