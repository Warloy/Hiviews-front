import React, { forwardRef } from 'react'
import { Link } from 'native-base'

import colors from '../styled-components/colors'
import IStyledLinkProps from '../interfaces/StyledLink.Interface'

const StyledLink = forwardRef<any, IStyledLinkProps>((props, ref) => {
  const { text, url, ...rest } = props

  return (
    <Link
      _text={{
        color: colors.primary,
        bold: true
      }}
      isUnderlined={false}
      href={url}
      {...rest}
    >
      {text}
    </Link>
  )
})

export default StyledLink