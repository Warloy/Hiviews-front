import { ReactNode } from "react";
import { DimensionValue } from "react-native";

export interface ICardContainerProps {
  topChildren?: ReactNode;
  children: ReactNode;
  bottomChildren?: ReactNode;
  h?: number;
  top?: DimensionValue;
  opacity?: number;
}

