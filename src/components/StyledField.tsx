import React, { forwardRef } from 'react'
import { Input } from 'native-base'

import colors from '../styled-components/colors'
import IStyledFieldProps from '../interfaces/StyledField.Interface'

const StyledField = forwardRef<any, IStyledFieldProps>((props, ref) => {
  const { style, ...rest } = props

  return (
    <Input
      borderWidth={0}
      borderRadius={0}
      borderBottomWidth={1}
      borderColor={colors.gray0}
      h='10'
      alignItems='flex-start'
      justifyContent='flex-start'
      _focus={{
        borderColor: colors.textField.primary,
        backgroundColor: colors.textField.background
      }}
      {...rest}
    />
  )
})

export default StyledField