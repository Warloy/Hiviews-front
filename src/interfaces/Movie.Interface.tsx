import { ResponsiveValue } from "native-base/lib/typescript/components/types";
import { ImageSourcePropType } from "react-native";

export interface IMovieComponent {
  id?: string | number;
  page?: string;
  image: ImageSourcePropType;
  alt: string;
  h?: ResponsiveValue<string | number>;
  w?: ResponsiveValue<string | number>;
};