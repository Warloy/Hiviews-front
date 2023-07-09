import { ReactNode } from 'react'
import { IModalProps } from 'native-base'

export interface IStyledModal extends IModalProps {
  header?: string
  closeButton?: boolean
  children: ReactNode
}