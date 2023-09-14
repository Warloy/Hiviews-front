import Container from "@/components/Container";
import LoginForm from "@/components/LoginComponents/LoginForm";
import { Stack } from "expo-router";

const LoginPage = () => {
  return (
    <Container
      hiddenNavBar={true}
    >
      <Stack.Screen options={{ headerShown: false }} />
      <LoginForm />
    </Container>
  );
};

export default LoginPage;