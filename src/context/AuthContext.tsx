import React, { createContext, useEffect, useReducer } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { IAuthContextType, IAuthState, IAuthAction, IAuthProviderProps } from '../interfaces/AuthContext.Interfaces'
import { setSession } from '../services/jwt'

export const AuthContext = createContext<IAuthContextType>({} as IAuthContextType)

const initialState: IAuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
}

const stateReducer = (state: IAuthState, action: IAuthAction): IAuthState => {
  const type = action.type

  switch (type) {
    case 'INITIALIZE': {
      const { isAuthenticated, user } = action.payload
      return {
        ...state,
        isAuthenticated,
        isInitialized: true,
        user,
      }
    }

    case 'LOGIN': {
      const { user } = action.payload
      return {
        ...state,
        isAuthenticated: true,
        user,
      }
    }

    case 'LOGOUT': {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      }
    }

    default:
      return state
  }
}

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [state, dispatch] = useReducer(stateReducer, initialState)

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessID: string | null = await AsyncStorage.getItem('@id')
        const accessToken: string | null = await AsyncStorage.getItem('@token')

        if (!accessToken) {
          setSession(null, null)
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null,
            },
          })
          return
        }

        await setSession(accessID, accessToken)

        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: true,
            user: {
              id: accessID,
              token: accessToken,
            },
          },
        })
      } catch (error) {
        setSession(null, null)
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        })
      }
    }
    initialize()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}