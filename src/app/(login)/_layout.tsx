import Container from "@/components/Container";
import LoginForm from "@/components/LoginComponents/LoginForm";

const LoginPage = () => {
  return (
    <Container
      hiddenNavBar={true}
    >
      <LoginForm />
    </Container>
  );
};

export default LoginPage;