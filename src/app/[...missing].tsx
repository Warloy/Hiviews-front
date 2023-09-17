import { Stack as StackRouter, useRouter } from 'expo-router';
import { StatusBar, VStack, Stack, Text, Button } from 'native-base';
import useAuthContext from '@/hooks/useAuthContext';
import Container from '@/components/Container';
import { colors } from '@/constants/Colors';
import AnimatedCarousel from '@/components/AnimatedCarousel';

import LOGO from "@/assets/images/logo.svg";

export default function NotFoundScreen() {

  const {
    state: { isAuthenticated }
  } = useAuthContext();

  const router = useRouter();

  const handleRoute = () => {
    if (isAuthenticated) {
      router.push("/(tabs)/feed");
    } else {
      router.push("/(auth)/login");
    }
  }

  return (
    <Container
      hiddenNavBar={true}
      hiddenStatusBar={false}
      backgroundTopColor={colors.white}
    >
      <StatusBar hidden />
      <StackRouter.Screen options={{ headerShown: false }} />
      <VStack
        h="100%"
      >
        <AnimatedCarousel />
        <Stack
          h="100%"
          alignItems="center"
          bgColor={colors.white}
          space={2}
        >
          <Text
            mx={5}
            textAlign="center"
            fontSize="sm"
            color={colors.gray4}
            lineHeight={16}
          >
            ¡Explora las películas recomendadas que te ofrecemos esta semana!
          </Text>
          <Text
            my={2}
            mx={5}
            textAlign="center"
            fontSize="sm"
            color={colors.gray4}
            lineHeight={16}
          >
            Todo esto en {""}
            <Text
              bold
              color={colors.primary}
            >
              HIVIEWS
            </Text>
          </Text>
          <Button
            onPress={handleRoute}
            w="40%"
            bgColor={colors.secondary}
            shadow={5}
            mb={10}
          >
            Descubrir
          </Button>

          <LOGO 
            height={30}
            width={30}
          />

          <Text
            mx={5}
            textAlign="center"
            fontSize="xs"
            color={colors.gray4}
            lineHeight={16}
          >
            HIVIEWS © | {new Date().getFullYear()}
          </Text>
        </Stack>
      </VStack>
    </Container>
  );
}
