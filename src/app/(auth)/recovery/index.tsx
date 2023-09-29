import Container from "@/components/Container";
import PasswordRecoveryForm from "@/components/LoginComponents/PasswordRecoveryForm";
import { Stack } from "expo-router";

const PasswordRecoveryPage = () => {
  return (
    <Container
      hiddenNavBar={true}
    >
      <Stack.Screen options={{ headerShown: false, animation: "slide_from_left" }} />
      <PasswordRecoveryForm />
    </Container>
  );
};

export default PasswordRecoveryPage;