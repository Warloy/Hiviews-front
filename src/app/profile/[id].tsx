import { useLocalSearchParams, Stack } from "expo-router";
import Container from "@/components/Container";
import ProfileComponent from "@/components/ProfileComponents/ProfileComponent";
import { colors } from "@/constants/Colors";

const RestorePasswordPage = () => {
  const { id } = useLocalSearchParams();

  const user = id=='10' ? {
    id: 1,
    email: 'gatocuantico@gmail.com',
    name: 'Gato',
    surname: 'Cuántico',
    username: 'quantacat',
    bio: 'Gato muy cuántico del mar de Quanta.',
    birthday: new Date(),
    avatar: require('@/assets/example/avatar15.jpg'),
  } : null

  return (
    <Container
      hiddenNavBar={true}
    >
      <Stack.Screen options={{ headerShown: true, headerTitle: 'Ver perfil' }} />
      { user ? 
        <ProfileComponent user={user} /> : 
        <ProfileComponent/>  
      }
      
    </Container>
  );
};

export default RestorePasswordPage;