import { ReactNode } from "react";
import { IModalProps } from "native-base";

export interface IStyledModalProps extends IModalProps {
  header?: string;
  closeButton?: boolean;
  children: ReactNode;
};