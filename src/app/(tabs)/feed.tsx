import Container from "@/components/Container";
import MovieCarousel from "@/components/MainComponents/MovieCarousel";
import { Stack } from "expo-router";
import { Text } from "native-base";

const FeedPage = () => {
  return (
    <Container
      hiddenNavBar={true}
    >
      <Stack.Screen options={{ headerShown: false }} />
      <MovieCarousel />
      <Text> Feed </Text>
    </Container>
  );
};

export default FeedPage;