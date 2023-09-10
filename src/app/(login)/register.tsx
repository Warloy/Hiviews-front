import { Stack } from "expo-router";
import Container from "@/components/Container";
import RegisterForm from "@/components/LoginComponents/RegisterForm";

const RegisterPage = () => {
  return (
    <Container
      hiddenNavBar={true}
    >
      <Stack.Screen name="register" />
      <RegisterForm />
    </Container>
  );
};

export default RegisterPage;