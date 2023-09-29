import Container from "@/components/Container";
import RegisterForm from "@/components/LoginComponents/RegisterForm";
import { Stack } from "expo-router";

const RegisterPage = () => {
  return (
    <Container
      hiddenNavBar={true}
    >
      <Stack.Screen options={{ headerShown: false, animation: "slide_from_right" }} />
      <RegisterForm />
    </Container>
  );
};

export default RegisterPage;