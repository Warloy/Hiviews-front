import { ReactNode } from 'react'

export default interface ICardContainerProps {
  topChildren?: ReactNode
  children: ReactNode
  bottomChildren?: ReactNode
  h?: number
  top?: string | number
  opacity?: number
}