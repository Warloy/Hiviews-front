import { useCallback, useState } from "react";
import { ActivityIndicator } from "react-native";
import { useLocalSearchParams, Stack, useRouter, useFocusEffect } from "expo-router";
import { Box } from "native-base";
import Container from "@/components/Container";
import ProfileComponent from "@/components/ProfileComponents/ProfileComponent";
import { colors } from "@/constants/Colors";

import { TUser } from "@/types/User.Type";
import { useAppSelector } from "@/hooks/useRedux";
import useConnection from "@/hooks/useConnection";
import useLoading from "@/hooks/useLoading";
import useCustomToast from "@/hooks/useCustomToast";
import UserService from "@/services/User/User.Service";



const ProfilePage = () => {
  const { id } : { id: string } = useLocalSearchParams();
  const { user } = useAppSelector(state => state.user);

  const router = useRouter()
  const [usr, setUsr] = useState<TUser | null>(null);
  
  const userAPI = new UserService();
  const { isConnected } = useConnection();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const { showErrorToast, showSuccessToast } = useCustomToast();
  
  useFocusEffect(
    useCallback(() => {
      getUser().catch(err => showErrorToast(err));
    }, [id, isConnected])
  );

  const getUser = async () => {
    startLoading();
    try {
      if (isConnected) {

        const { data }: { data: TUser } = await userAPI.findOne(id);
        console.log(data)

        if (data?.statusCode === 404 ) {
          console.log("Data not found");
          showErrorToast("Usuario no encontrado.");
          router.back();
          return
        }
        setUsr(data);
      } else {
        setUsr(null);
      }
      stopLoading();
    } catch (error: any) {
      console.log(error);
      showErrorToast("Ocurrió un error al obtener el perfil.");
    }
  }

  return (
    <Container
      hiddenNavBar
      statusBarColor={colors.white}
      statusBarStyle="dark-content"
    >
      <Stack.Screen options={{ headerShown: true, headerTitle: 'Ver perfil', animation: "fade" }} />      
      { !isLoading ? <>
        { usr &&
          <ProfileComponent user={usr} /> 
        }
        </> : <>
          <Box h="100%" w="100%" backgroundColor={colors.white} alignItems='center' justifyContent='center' alignContent='center' alignSelf='center'>
            <ActivityIndicator size='large' color={colors.secondary}/>
          </Box>
        </>
      }
    </Container>
  );
};

export default ProfilePage;