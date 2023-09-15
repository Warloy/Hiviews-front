import { ResponsiveValue } from "native-base/lib/typescript/components/types";
import { IFontSize } from "native-base/lib/typescript/theme/base/typography";

export interface IStyledBadge {
  key?: string | number;
  text: string;
  selectedColorText?: string;
  colorText?: string;
  fontSize?: ResponsiveValue<IFontSize | number | (string & {})>;
  bold?: boolean;
  thin?: boolean;
  italic?: boolean;
  bgColor?: string;
  selectedBgColor?: string;
  px?: ResponsiveValue<"px" | "0" | (string & {} | (number & {})) | "full">;
  h?: number | string;
  w?: number | string;
  value: any;
  onChangeValue: () => any;
};