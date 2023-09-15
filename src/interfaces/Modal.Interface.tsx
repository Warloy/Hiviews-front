import { ReactNode } from "react";
import { IModalProps } from "native-base";
import { TIconGroup } from "@/types/Icon.Type";

export interface IModal extends IModalProps {
  header?: any;
  closeButton?: boolean;
  footer?: any;
  maxHeight?: string | number;
  maxH?: string | number;
  iconGroup?: TIconGroup
  iconName?: string
  iconColor?: string
  iconSize?: number
  description?: string
  children?: ReactNode
};

export interface IIconProps {
  name: string;
  color: string;
  size: number;
}