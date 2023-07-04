import React from 'react'
import { useWindowDimensions } from 'react-native'

import { Modal } from 'native-base'

import { IStyledModal } from '../interfaces/StyledModal.Interface'

import colors from '../styled-components/colors'
import styles from './styled-components/styles'

const StyledModal = ({ children, ...props }: IStyledModal) => {

  const layout = useWindowDimensions()

  return (
    <Modal>
      <Modal.Content>
        <Modal.CloseButton />

      </Modal.Content>
    </Modal>
  )
}
export default StyledModal
