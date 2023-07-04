import { ReactNode } from 'react'
import { IModalProps } from 'native-base'

export interface IStyledModal extends IModalProps {
  children: ReactNode
}