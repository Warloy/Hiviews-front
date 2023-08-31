import { forwardRef } from "react";
import { Link } from "native-base";
import IStyledLinkProps from "../interfaces/StyledLink.Interface";
import { colors } from "../constants/Colors";

const StyledLink = forwardRef<any, IStyledLinkProps>((props, ref) => {
  const { text, url, ...rest } = props;

  return (
    <Link
      ref={ref}
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
  );
});

export default StyledLink;