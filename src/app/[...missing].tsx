import { Stack, useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';

import { Text, View } from '@/components/Themed';
import useAuthContext from '@/hooks/useAuthContext';
import { styles } from '@/constants/Styles';

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
    <>
      <Stack.Screen options={{ title: '¡Lo sentimos!' }} />
      <View style={styles.container}>
        <Text style={styles.title}>No se pudo encontrar la página.</Text>
        <TouchableOpacity
          onPress={handleRoute}
        >
          <Text style={styles.linkText}>Volver al inicio</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}