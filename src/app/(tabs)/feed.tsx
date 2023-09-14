import Container from "@/components/Container";
import MovieCarousel from "@/components/MainComponents/MovieCarousel";
import { colors } from "@/constants/Colors";
import { Stack } from "expo-router";
import { Divider, Text, VStack } from "native-base";

const FeedPage = () => {
  return (
    <Container
      statusBarStyle="dark-content"
      statusBarColor={colors.white}
      backgroundTopColor={colors.white}
      backgroundBottomColor={colors.white}
    >
      <Stack.Screen options={{ headerShown: false }} />
      <VStack
        w="100%"
        maxH="100%"
        minH="100%"
        py={1}
      >
        <Divider bgColor={colors.divider} />
        <MovieCarousel />
        <Divider bgColor={colors.divider} />
        <Text> Feed </Text>
      </VStack>
    </Container>
  );
};

export default FeedPage;