import { ReactNode } from "react";
import { IModalProps } from "native-base";

export interface IStyledModalProps extends IModalProps {
  header?: string;
  closeButton?: boolean;
  bodyP?: number;
  bodyM?: number;
  children: ReactNode;
};