import { useLocalSearchParams, Stack } from "expo-router";
import Container from "@/components/Container";
import EditProfileComponent from "@/components/ProfileComponents/EditProfileComponent";
import { colors } from "@/constants/Colors";
import { useAppSelector } from "@/hooks/useRedux";


const EditProfilePage = () => {
  const { user } = useAppSelector(state => state.user);

  return (
    <Container
      hiddenNavBar
      statusBarColor={colors.white}
      statusBarStyle="dark-content"
    >
      <Stack.Screen options={{ headerShown: true, headerTitle: 'Editar perfil', animation: "slide_from_bottom" }} />      
      {user ?
        <EditProfileComponent /> :
        <EditProfileComponent />
      }
    </Container>
  );
};

export default EditProfilePage;