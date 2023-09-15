import { useLocalSearchParams, Stack } from "expo-router"
import { useEffect } from "react";
import Container from "@/components/Container";
import PasswRestoreForm from "@/components/LoginComponents/PasswRestoreForm";

const RestorePasswordPage = () => {
  const { token } = useLocalSearchParams()

  return (
    <Container
      hiddenNavBar={true}
    >
      <Stack.Screen options={{ headerShown: false }} />
      <PasswRestoreForm token={token} />
    </Container>
  )
}

export default RestorePasswordPage