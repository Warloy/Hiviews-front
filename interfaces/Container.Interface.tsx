import { NavigationProp } from "@react-navigation/native";
import { ReactNode } from "react";
import { StatusBarStyle } from "react-native";

export interface IContainerProps {
  statusBarStyle?: StatusBarStyle
  statusBarColor?: string
  hiddenStatusBar?: boolean
  backgroundTopColor?: string
  backgroundBottomColor?: string,
  children?: ReactNode
  navigation?: NavigationProp<any>
}