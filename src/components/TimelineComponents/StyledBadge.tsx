import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Box, Text } from 'native-base'
import colors from '../../styled-components/colors'
import IStyledBadge from '../../interfaces/StyledBadge.Interface'

const StyledBadge = ({
  key = 'any',
  text = '',
  selectedColorText = colors.white,
  colorText = colors.secondary,
  fontSize = 'xs',
  bold = false,
  italic = false,
  thin = false,
  bgColor = colors.badge.secondary,
  selectedBgColor = colors.badge.primary,
  px = 5,
  h = 5,
  w = '100%',
  value = false,
  onChangeValue
}: IStyledBadge) => {

  return (
    <TouchableOpacity
      key={key}
      activeOpacity={.9}
      onPress={onChangeValue}
    >
      <Box
        h={h}
        w={w}
        px={px}
        bgColor={value ? selectedBgColor : bgColor}
        borderRadius={50}
        shadow={3}
      >
        <Text
          bold={bold}
          italic={italic}
          fontWeight={thin ? 'thin' : 'regular'}
          fontSize={fontSize}
          color={selectedColorText && value ? selectedColorText : colorText}
          textAlign='center'
        >
          {text}
        </Text>
      </Box>
    </TouchableOpacity>
  )
}

export default StyledBadge
