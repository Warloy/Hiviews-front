import { ReactNode } from "react";
import { IModalProps } from "native-base";

export interface IModal extends IModalProps {
  header?: any;
  closeButton?: boolean;
  footer?: any;
  maxHeight?: string | number;
  maxH?: string | number;
  iconGroup?: "AntDesign" | "Entypo" | "EvilIcons" | "Feather" | "FontAwesome" | "FontAwesome5" | "Fontisto" | "Foundation" | "Ionicons" | "MaterialCommunityIcons" | "MaterialIcons" | "Octicons" | "SimpleLineIcons" | "Zocial"
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