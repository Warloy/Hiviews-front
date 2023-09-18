import { useLocalSearchParams, Stack } from "expo-router";
import Container from "@/components/Container";
import ProfileComponent from "@/components/ProfileComponents/ProfileComponent";
import { colors } from "@/constants/Colors";
import useAuthContext from "@/hooks/useAuthContext";

const ProfilePage = () => {

  const { id } = useLocalSearchParams();
  const { state: { user } } = useAuthContext();

  return (
    <Container
      hiddenNavBar
      statusBarColor={colors.white}
      statusBarStyle="dark-content"
    >
      <Stack.Screen options={{ headerShown: true, headerTitle: 'Ver perfil' }} />
      {id === user?.id?.toString() ?
        <ProfileComponent user={user.user} /> :
        <ProfileComponent />
      }
    </Container>
  );
};

export default ProfilePage;