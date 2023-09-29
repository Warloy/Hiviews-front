import { useState } from "react";
import { Stack as StackRouter } from "expo-router";
import { Divider, HStack, Stack, Text, VStack } from "native-base";
import Container from "@/components/Container";
import NewPostComponent from "@/components/MainComponents/NewPost/NewPostComponent";
import { colors } from "@/constants/Colors";
import { TouchableOpacity } from "react-native";
import NewReviewComponent from "@/components/MainComponents/NewPost/NewReviewComponent";


import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated"
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ChangeButton = ({ state, changeState }: { state: boolean, changeState: (param: boolean) => void }) => {

  const worldScale = useSharedValue(1);
  const worldTranslateX = useSharedValue(0);
  const worldTranslateY = useSharedValue(0);

  const peopleScale = useSharedValue(0.6);
  const peopleTranslateX = useSharedValue(0);
  const peopleTranslateY = useSharedValue(-10);

  const animatedWorldStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: withSpring(worldScale.value - 0.4) },
      { translateX: withSpring(worldTranslateX.value + 35) },
      { translateY: withSpring(worldTranslateY.value - 10) }
    ]
  }));

  const animatedPeopleStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: withSpring(peopleScale.value + 0.4) },
      { translateX: withSpring(peopleTranslateX.value - 20) },
      { translateY: withSpring(peopleTranslateY.value + 10) }
    ]
  }));

  const handlePress = () => {

    if (state) {
      worldTranslateX.value += 35;
      worldTranslateY.value -= 10;
      worldScale.value -= 0.4;

      peopleTranslateX.value -= 20;
      peopleTranslateY.value += 10;
      peopleScale.value += 0.4;

    } else {
      worldTranslateX.value -= 35;
      worldTranslateY.value += 10;
      worldScale.value += 0.4;

      peopleTranslateX.value += 20;
      peopleTranslateY.value -= 10;
      peopleScale.value -= 0.4;
    }

    changeState(!state);

  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.9}
    >
      <Stack
        alignItems="center"
        justifyContent="center"
      >
        <Stack
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
        >
          <Animated.View
            style={animatedWorldStyle}
          >
            <MaterialCommunityIcons
              name={state ? "message" : "message-outline"}
              color={state ? colors.secondary : colors.gray0}
              size={24}
            />
          </Animated.View>
          <Animated.View
            style={animatedPeopleStyle}
          >
            <MaterialCommunityIcons
              name={!state ? "movie" : "movie-open-outline"}
              size={20}
              color={!state ? colors.secondary : colors.gray0}
            />
          </Animated.View>

        </Stack>
      </Stack>
    </TouchableOpacity>
  );
};


const NewPostPage = () => {

  const [type, setType] = useState(false);

  return (
    <Container
      hiddenNavBar={true}
      statusBarColor={colors.white}
      statusBarStyle="dark-content"
      backgroundTopColor={colors.white}
      backgroundBottomColor={colors.white}
    >
      <StackRouter.Screen options={{ headerShown: false, animation: "fade" }} />
      <HStack
        mt={5}
        px={3}
        h={50}
        minW="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        <Stack>
          <Text
            bold
            fontSize="lg"
          >
            {!type ? "Nueva Review" : "Nuevo Thread"}
          </Text>
        </Stack>
        <Stack>
          <ChangeButton
            state={type}
            changeState={setType}
          />
        </Stack>
      </HStack>
      <Divider />
      <VStack
        minH="100%"
      >
        {type ?
          <NewPostComponent /> :
          <NewReviewComponent />
        }
      </VStack>
    </Container>
  );
};

export default NewPostPage;