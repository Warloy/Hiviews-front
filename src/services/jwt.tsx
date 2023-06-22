import AsyncStorage from '@react-native-async-storage/async-storage'

import { http } from './http'

export const setSession = async (id: string | null = '', token: string | null) => {
  if (id && token) {
    await AsyncStorage.setItem('@id', id)
    await AsyncStorage.setItem('@token', token)
    http.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    await AsyncStorage.removeItem('@id')
    await AsyncStorage.removeItem('@token')
    delete http.defaults.headers.common['Authorization']
  }
}