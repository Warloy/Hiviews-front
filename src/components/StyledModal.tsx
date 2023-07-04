import React from 'react'
import { Modal, Stack } from 'native-base'

import { IStyledModal } from '../interfaces/StyledModal.Interface'

const StyledModal = ({
  size = 'md',
  header = undefined,
  closeButton = false,
  children,
  ...props
}: IStyledModal) => {

  return (
    <Modal
      size={size}
      {...props}
    >
      <Modal.Content>
        {header && <Modal.Header>{header}</Modal.Header>}
        {closeButton && <Modal.CloseButton />}
        <Modal.Body>
          <Stack>
            {children}
          </Stack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  )
}
export default StyledModal
