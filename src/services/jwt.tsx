import AsyncStorage from '@react-native-async-storage/async-storage'

import { http } from './http'

export const setSession = async (id: string | number | null, token: string | number | null) => {
  if (id && token) {
    let strId: string
    let strToken: string

    if (typeof id === 'number') {
      strId = String(id)
    } else {
      strId = id
    }

    if (typeof token === 'number') {
      strToken = String(token)
    } else {
      strToken = token
    }

    await AsyncStorage.setItem('@id', strId)
    await AsyncStorage.setItem('@token', strToken)
    http.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    await AsyncStorage.removeItem('@id')
    await AsyncStorage.removeItem('@token')
    delete http.defaults.headers.common['Authorization']
  }
}