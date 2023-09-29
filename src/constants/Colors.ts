const tintColorLight = "#2f95dc";
const tintColorDark = "#fff";

export default {
  light: {
    text: "#000",
    background: "#fff",
    tint: tintColorLight,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#fff",
    background: "#000",
    tint: tintColorDark,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorDark,
  },
};

export const colors = {
  base: "#FFFFFF",
  primary: "#975C8D",
  secondary: "#D989B5",
  tertiary: "#FFADBC",
  quaternary: "#FF9747",
  gray0: "#b7b7b7",
  gray1: "#999999",
  gray2: "#777777",
  gray3: "#555555",
  gray4: "#333333",
  gray5: "#111111",
  white: "#FFFFFF",
  background: "#863A6F",
  divider: "#FFADBC",
  cardBackground: "#FFF0F2",
  container: {
    top: "#FFB3E8",
    bottom: "#ffffff"
  },
  textField: {
    primary: "#7dffc0",
    background: "rgba(255, 179, 232, .1)",
    text: "#333333",
    error: "#d95f5f",
  },
  text: "#916D8B",
  button: {
    //Fix needed: Apply colours to button colours when needed
    primary: "rgba(84, 13, 110, 1)",
    primaryDisabled: "rgba(84, 13, 110, 0.45)",
    secondary: "rgba(187, 103, 220, .75)",
    secondaryDisabled: "rgba(187, 103, 220, .45)",
    tertiary: "rgba(150, 129, 223, .75)",
    tertiaryDisabled: "rgba(150, 129, 223, .45)",
    disabled: "#999999",
    text: "#FFFFFF",
    textDisabled: "#999999",
    icon: "#FFFFFF",
    iconDisabled: "#999999",
  },
  error: {
    primary: "#d95f5f",
    secondary: "#f52556",
    bgError: "#fce1e1",
    warning: "#f57f25",
  },
  badge: {
    primary: "#975C8D",
    secondary: "#ECE6FF"
  },
  neon: "#FF00F0",
};

export const arrayColor = [
  "#975C8D",
  "#D989B5",
  "#8870f9",
  "#ed467b",
  "#247539"
];