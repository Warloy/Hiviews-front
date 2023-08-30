import { Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useToast, Avatar, Text, HStack, Icon } from "native-base";
import { IToastProps } from "../interfaces/useCustomToast.Interface";
import useUUID from "./useUUID";
import { colors } from "../constants/Colors";

const { width } = Dimensions.get("window");

const Toast = ({
  id = useUUID(),
  text = "",
  color = colors.primary,
  bgColor = colors.secondary
}: IToastProps) => (
  <HStack
    id={id}
    h="20"
    w={width}
    bottom={-50}
    backgroundColor={bgColor}
    px={10}
    pr={20}
    space={2}
    alignItems="center"
  >
    <Avatar
      bgColor={color}
    >
      <Icon
        as={Ionicons}
        name="ios-information-circle-outline"
        size={6}
        color={colors.white}
      />
    </Avatar>
    <Text
      color={color}
      bold
      pr={2}
      textAlign="justify"
    >
      {text}
    </Text>
  </HStack>
);

const useCustomToast = () => {
  const toast = useToast();

  const showSuccessToast = (text = "") => {
    toast.show({
      render: () => (
        <Toast
          text={text}
          color={colors.secondary}
          bgColor={colors.base}
        />
      )
    })
  };

  const showErrorToast = (text = "") => {
    toast.show({
      render: () => (
        <Toast
          text={text}
          color={colors.error.primary}
          bgColor={colors.error.bgError}
        />
      )
    })
  };

  const showToast = (text = "", color = colors.secondary, bgColor = colors.base) => {
    toast.show({
      render: () => (
        <Toast
          text={text}
          color={color}
          bgColor={bgColor}
        />
      )
    })
  };

  return {
    showToast,
    showSuccessToast,
    showErrorToast
  };
};

export default useCustomToast;