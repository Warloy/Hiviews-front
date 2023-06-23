import { ReactNode } from "react";
import { StatusBarStyle } from 'react-native'

export interface IContainerProps {
    statusBarStyle?: StatusBarStyle, 
    statusBarColor?: string, 
    hiddenStatusBar?: boolean, 
    hiddenNavBar?: boolean, 
    backgroundTopColor?: string, 
    backgroundBottomColor?: string, 
    children?: ReactNode
}