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

export type TMovie = {
  id: number,
  name: string,
  image: any
}

export type TTag = {
  id: number,
  name: string
}

export type TReview = {
  id: number | string
  author: string
  date: Date | string
  description: string | number
  image: any
  movie: string
  rate: number
  likes: number
  comments: number
  tags?: TTag[]
}

export type TCategory = {
  id: number | string
  name: string
}

export type TThread = {
  id: number | string
  author: string
  date: Date | string
  category: TCategory
  topic: string
  description: string
  picture: any
  likes: number
  comments: number
}