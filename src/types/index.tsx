import { FC } from 'react'

export type TStackRoutes = {
  name: string
  component: FC
  requireAuth: boolean
  options?: {
    title?: string
    headerShown?: boolean
  }
}[]