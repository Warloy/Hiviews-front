export default interface IStyledBadge {
  key?: string | number
  text: string
  selectedColorText?: string
  colorText?: string
  fontSize?: string | number
  bold?: boolean
  thin?: boolean
  italic?: boolean
  bgColor?: string
  selectedBgColor?: string
  px?: number
  h?: number | string
  w?: number | string
  value?: any
  onChangeValue?: () => any
}