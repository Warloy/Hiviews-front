import { NavigationContainer } from '@react-navigation/native'
import { NativeBaseProvider } from 'native-base'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

import StackNavigation from './src/navigation/StackNavigation'
import { AuthProvider } from './src/context/AuthContext'

const App = () => {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <SafeAreaProvider>
          <AuthProvider>
            <SafeAreaView style={{ flex: 1 }}>
              <StackNavigation />
            </SafeAreaView>
          </AuthProvider>
        </SafeAreaProvider>
      </NativeBaseProvider>
    </NavigationContainer>
  )
}


export default App
