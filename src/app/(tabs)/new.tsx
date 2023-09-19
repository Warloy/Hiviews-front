import Container from "@/components/Container";
import NewPostComponent from "@/components/MainComponents/NewPost/NewPostComponent";
import { colors } from "@/constants/Colors";
import { Stack } from "expo-router";
import { Divider, VStack } from "native-base";

const NewPostPage = () => {
  return (
    <Container
      hiddenNavBar={true}
      statusBarColor={colors.white}
      statusBarStyle="dark-content"
      backgroundTopColor={colors.white}
      backgroundBottomColor={colors.white}
    >
      <Stack.Screen options={{ title: "Nuevo post" }} />
      <Divider />
      <VStack
        minH="100%"
      >
        <NewPostComponent />
      </VStack>
    </Container>
  );
};

export default NewPostPage;