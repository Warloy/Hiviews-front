import React from 'react'
import { ImageBackground, ScaledSize, useWindowDimensions } from 'react-native'

import { Box } from 'native-base'

import colors from '../styled-components/colors'
import styles from './styled-components/styles'

interface StyledModalProps {
  children: React.ReactNode;
  left?: number | null;
  top?: number;
  modalStyle?: any;
}

const StyledModal: React.FC<StyledModalProps> = ({
  children,
  left = null,
  top = 1,
  modalStyle = {},
}) => {

  const layout: ScaledSize = useWindowDimensions()

  return (
    <Box
      position='absolute'
      top={top === 0 ? 0 : -1}
      bottom={0}
      left={left !== null ? left : -20}
      right={0}
      bg='rgba(255, 255, 255, 0.75)'
      zIndex={1}
      minHeight='120%'
      minWidth='100%'
      {...styles.modalBackground}
    >
      <Box
        minW='80%'
        minH={120}
        p={2}
        pb={3}
        bgColor={colors.base}
        shadow={5}
        borderRadius={10}
        style={modalStyle}
      >
        {children}
      </Box>
    </Box>
  )
}
export default StyledModal