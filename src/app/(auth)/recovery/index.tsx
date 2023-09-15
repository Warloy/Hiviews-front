import Container from "@/components/Container";
import PasswRecoveryForm from "@/components/LoginComponents/PasswRecoveryForm";
import { Stack } from "expo-router";

const PasswRecoveryPage = () => {
  return (
    <Container
      hiddenNavBar={true}
    >
      <Stack.Screen options={{ headerShown: false }} />
      <PasswRecoveryForm />
    </Container>
  );
};

export default PasswRecoveryPage;