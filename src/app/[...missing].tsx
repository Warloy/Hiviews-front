import { Stack, useRouter } from 'expo-router';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from '@/components/Themed';
import useAuthContext from '@/hooks/useAuthContext';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
