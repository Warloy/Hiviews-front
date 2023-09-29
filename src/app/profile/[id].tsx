import { useLocalSearchParams, Stack } from "expo-router";
import Container from "@/components/Container";
import ProfileComponent from "@/components/ProfileComponents/ProfileComponent";
import { colors } from "@/constants/Colors";
import { useAppSelector } from "@/hooks/useRedux";


const ProfilePage = () => {
  const { id } = useLocalSearchParams();
  const { user } = useAppSelector(state => state.user);

  return (
    <Container
      hiddenNavBar
      statusBarColor={colors.white}
      statusBarStyle="dark-content"
    >
      <Stack.Screen options={{ headerShown: true, headerTitle: 'Ver perfil', animation: "fade" }} />      
      {id === user?.id?.toString() ?
        <ProfileComponent user={user} /> :
        <ProfileComponent />
      }
    </Container>
  );
};

export default ProfilePage;