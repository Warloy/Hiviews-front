import { useWindowDimensions } from "react-native";
import { View, KeyboardAvoidingView, Stack } from "native-base";

import { ICardContainerProps } from "@/interfaces/CardContainer.Interface";
import styles from "./styled-components/styles";

const CardContainer = ({
  topChildren,
  children,
  bottomChildren,
  h = 0.5,
  top = "25%",
  opacity = 0.95
}: ICardContainerProps) => {

  const { height } = useWindowDimensions();

  return (
    <KeyboardAvoidingView>
      <View
        minH={height}
        maxH={height}
        position="relative"
      >
        <View
          bgColor="white"
          h={height * h}
          opacity={opacity}
          style={{
            top: top,
            ...styles.cardContainer
          }}
        >
          {children}
        </View>
        <Stack
          minH={height * 0.5}
          maxH={height * 0.5}
          alignItems="center"
        >
          {topChildren}
        </Stack>
        <Stack
          minH={height * 0.5}
          maxH={height * 0.5}
          alignItems="center"
          bgColor="white"
          justifyContent="flex-end"
        >
          {bottomChildren}
        </Stack>
      </View>
    </KeyboardAvoidingView>
  );
};

export default CardContainer;