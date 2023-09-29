import { useLocalSearchParams, Stack } from "expo-router";
import Container from "@/components/Container";
import PasswordRestoreForm from "@/components/LoginComponents/PasswordRestoreForm";

const RestorePasswordPage = () => {
  const { token } = useLocalSearchParams();

  return (
    <Container
      hiddenNavBar={true}
    >
      <Stack.Screen options={{ headerShown: false, animation: "slide_from_left" }} />
      <PasswordRestoreForm token={token} />
    </Container>
  );
};

export default RestorePasswordPage;