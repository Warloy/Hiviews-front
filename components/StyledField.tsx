import { forwardRef } from "react";
import { Input } from "native-base";
import { IStyledFieldProps } from "../interfaces/StyledField.Interface";
import { colors } from "../constants/Colors";

const StyledField = forwardRef<any, IStyledFieldProps>((props, ref) => {
  return (
    <Input 
      borderWidth={0}
      borderRadius={0}
      borderBottomWidth={1}
      borderColor={colors.gray0}
      h="10"
      alignItems="flex-start"
      justifyContent="flex-start"
      _focus={{
        borderColor: colors.primary,
        backgroundColor: colors.textField.background
      }}
      {...props}
    />
  );
});

export default StyledField;