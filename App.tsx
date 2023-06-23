import { NavigationContainer } from '@react-navigation/native'
import { NativeBaseProvider } from 'native-base'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

import StackNavigation from './src/navigation/StackNavigation'

const App = () => {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1 }}>
            <StackNavigation />
          </SafeAreaView>
        </SafeAreaProvider>
      </NativeBaseProvider>
    </NavigationContainer>
  )
}


export default App
