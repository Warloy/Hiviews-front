import { NavigationProp } from "@react-navigation/native"

export interface INavBarProps {
  hidden?: boolean
  logout?: boolean
  navigation?: NavigationProp<any>
}