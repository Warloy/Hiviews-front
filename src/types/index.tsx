import { FC, ReactElement } from 'react'

type TBottomIconProps = {
  color: string
  size: number
}

export type TStackRoutes = {
  name: string
  component: FC
  requireAuth: boolean
  options?: {
    title?: string
    headerShown?: boolean
  }
}[]

export type TBottomRoutes = {
  name: string
  component: FC
  Icon: ({ color, size }: TBottomIconProps) => ReactElement
  options?: any
}[]