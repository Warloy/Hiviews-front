import Container from "@/components/Container";
import PasswordRecoveryForm from "@/components/LoginComponents/PasswordRecoveryForm";
import { Stack } from "expo-router";

const PasswordRecoveryPage = () => {
  return (
    <Container
      hiddenNavBar={true}
    >
      <Stack.Screen options={{ headerShown: false }} />
      <PasswordRecoveryForm />
    </Container>
  );
};

export default PasswordRecoveryPage;