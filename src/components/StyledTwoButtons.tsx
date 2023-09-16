

import { TouchableOpacity } from "react-native";
import { Stack } from "native-base";
import { Fontisto, Ionicons } from "@expo/vector-icons";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated"

import { colors } from "@/constants/Colors";
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux";
import { changeTimelineView } from "@/features/config/configSlice";

const StyledTwoButtons = () => {

  const { timelineView } = useAppSelector(state => state.config);
  const dispatch = useAppDispatch();

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

    if (timelineView) {
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

    dispatch(changeTimelineView());

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
            <Fontisto
              name={timelineView ? "world" : "world-o"}
              color={colors.secondary}
              size={20}
            />
          </Animated.View>
          <Animated.View
            style={animatedPeopleStyle}
          >
            <Ionicons
              name={!timelineView ? "people" : "people-outline"}
              color={colors.secondary}
              size={24}
            />
          </Animated.View>

        </Stack>
      </Stack>
    </TouchableOpacity>
  );
};

export default StyledTwoButtons;

