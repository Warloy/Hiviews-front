import { colors } from "@/constants/Colors";
import useUUID from "@/hooks/useUUID";
import { IStyledBadge } from "@/interfaces/StyledBadge.Interface";
import { Box, Text } from "native-base";
import { forwardRef } from "react";
import { TouchableOpacity } from "react-native";

const StyledBadge = forwardRef<any, IStyledBadge>((props, ref) => {

  const uuid = useUUID();
  const id = uuid;

  let {
    text,
    selectedBgColor,
    selectedColorText,
    colorText,
    fontSize,
    bold,
    thin,
    italic,
    bgColor,
    px,
    h,
    w,
    value,
    onChangeValue
  } = props;

  selectedBgColor = selectedBgColor ?? colors.badge.primary;
  selectedColorText = selectedColorText ?? colors.white;
  bgColor = bgColor ?? colors.white;
  colorText = colorText ?? colors.secondary;
  fontSize = fontSize ?? "xs";
  bold = Boolean(bold);
  italic = Boolean(italic);
  thin = Boolean(thin);
  px = px ?? 5;
  h = h ?? 5;
  w = w ?? "full";
  value = value ?? Boolean(value);

  return (
    <TouchableOpacity
      ref={ref}
      id={id}
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
          fontWeight={thin ? "thin" : "regular"}
          fontSize={fontSize}
          color={selectedColorText && value ? selectedColorText : colorText}
          textAlign="center"
        >
          {text}
        </Text>
      </Box>
    </TouchableOpacity>
  );
});

export default StyledBadge;