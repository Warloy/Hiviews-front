
import { useRef } from "react";
import { Dimensions, Animated, StyleSheet } from "react-native";
import { Image, Text, View } from "native-base";
import { LinearGradient } from "expo-linear-gradient";

import { TMovie } from "@/types/Post.Type";
import { colors } from "@/constants/Colors";

import movieData from "@/static/moviesData";

const { width, height } = Dimensions.get("window");
const CONTAINER_WIDTH = width * 0.7;
const CONTAINER_SPACE = (width - CONTAINER_WIDTH) / 2;
const BACKDROP_HEIGHT = height * 0.5;
const SPACE = 10;

const movies = movieData;

const Backdrop = ({ scrollX }: { scrollX: Animated.Value }) => {
  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          height: BACKDROP_HEIGHT,
          width,
          top: 0
        },
        StyleSheet.absoluteFillObject
      ]}
    >
      {movies.map((movie, index) => {

        const inputRange = [
          (index - 1) * CONTAINER_WIDTH,
          index * CONTAINER_WIDTH,
          (index + 1) * CONTAINER_WIDTH
        ];

        const outputRange = [0, 1, 0]

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange
        });

        return (
          <Animated.Image
            key={index}
            source={movie.image}
            alt={movie.name}
            blurRadius={10}
            style={[
              {
                height: BACKDROP_HEIGHT,
                width,
                opacity
              },
              StyleSheet.absoluteFillObject
            ]}
          />
        );
      })}
      <LinearGradient
        colors={[
          "transparent",
          colors.white
        ]}
        style={{
          height: BACKDROP_HEIGHT,
          width,
          position: "absolute",
          top: 0
        }}
      />
    </Animated.View>
  );
};

const AnimatedCarousel = () => {

  const scrollX = useRef(new Animated.Value(0)).current;

  const renderItem = ({ item, index }: { item: TMovie, index: number }) => {

    const inputRange = [
      (index - 1) * CONTAINER_WIDTH,
      index * CONTAINER_WIDTH,
      (index + 1) * CONTAINER_WIDTH
    ];

    const outputRange = [0, -50, 0];

    const scrollY = scrollX.interpolate({
      inputRange,
      outputRange
    });

    return (
      <View
        w={CONTAINER_WIDTH}
      >
        <Animated.View
          style={{
            transform: [{ translateY: scrollY }],
            marginHorizontal: SPACE,
            borderRadius: 12,
            backgroundColor: colors.white,
            alignItems: "center",
          }}
        >
          <Image
            source={item.image}
            alt={item.name}
            w="100%"
            h={CONTAINER_WIDTH * 1.2}
            resizeMode="cover"
            borderRadius={12}
            m={0}
          />
          <Text
            pt={1}
            bold
            color={colors.primary}
            fontSize="md"
            lineHeight={18}
            textAlign="center"
          >
            {item.name}
          </Text>
        </Animated.View>
      </View>
    );
  };

  return (
    <View
      zIndex={999}
    >
      <Backdrop
        scrollX={scrollX}
      />
      <Animated.FlatList
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 200,
          paddingHorizontal: CONTAINER_SPACE
        }}
        snapToInterval={CONTAINER_WIDTH}
        scrollEventThrottle={16}
        data={movies}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
      />
    </View>
  );
};

export default AnimatedCarousel