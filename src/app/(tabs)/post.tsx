import Container from "@/components/Container";
import { Stack } from "expo-router";

const PostPage = () => {
  return (
    <Container
      hiddenNavBar={true}
    >
      <Stack.Screen options={{ headerShown: false }} />

    </Container>
  );
};

export default PostPage;