import { useRef, useState } from "react";
import { Avatar, Divider, FormControl, HStack, Icon, KeyboardAvoidingView, Stack, Text, TextArea, VStack, WarningOutlineIcon } from "native-base";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { colors } from "@/constants/Colors";

import { newPostSchema, newPostDefaultValues } from "@/schemas/NewPostSchema";
import { newPostAdapter } from "@/adapters/PostAdapter";

import useLoading from "@/hooks/useLoading";
import useCustomToast from "@/hooks/useCustomToast";
import { TReview } from "@/types/Post.Type";
import { ImageBackground, TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { pickImage } from "@/utils/functions";
import { useAppSelector } from "@/hooks/useRedux";

const NewPostComponent = () => {

  const ref = useRef();

  const { user } = useAppSelector(state => state.user);

  const [textAreaHeight, setTextAreaHeight] = useState(30);
  const [imagePost, setImagePost] = useState<string | null>(null);

  const { isLoading, startLoading, stopLoading } = useLoading();
  const { showErrorToast, showSuccessToast } = useCustomToast();

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
                    mt={1}
                    h={textAreaHeight}
                    maxH={120}
                    borderRadius={10}
                    alignItems="flex-start"
                    justifyContent="flex-start"
                    fontSize="sm"
                    placeholder="Cuéntanos..."
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

            {!imagePost ?
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
              :
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
                        color={colors.gray0}
                      />
                    }
                    size={7}
                    m={2}
                    opacity={0.5}
                    alignSelf="flex-end"
                  />
                </ImageBackground>
              </TouchableOpacity>
            }


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
              Tu post será visible por todos
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
                  Post
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