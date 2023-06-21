import { Dispatch, ReactNode } from 'react'

export interface IAuthState {
  isAuthenticated: boolean
  isInitialized: boolean
  user: {
    id: string
    token: string
  } | null
}

export interface IAuthAction {
  type: string
  payload?: any
}

export interface IAuthContextType {
  state: IAuthState
  dispatch: Dispatch<IAuthAction>
}

export interface IAuthProviderProps {
  children: ReactNode
}