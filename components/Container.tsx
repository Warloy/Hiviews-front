import { colors } from "../constants/Colors";
import { IContainerProps } from "../interfaces/Container.Interface";
import Background from "./Background";
import NavBar from "./NavBar";
import StatusBar from "./StatusBar";

const Container = ({
  statusBarStyle = "default",
  statusBarColor = colors.primary,
  hiddenStatusBar = false,
  hiddenNavBar = false,
  backgroundTopColor = colors.primary,
  backgroundBottomColor = colors.base,
  children
}: IContainerProps) => {
  return (
    <Background
      topColor={backgroundTopColor}
      bottomColor={backgroundBottomColor}
    >
      <StatusBar
        backgroundColor={statusBarColor}
        hidden={hiddenStatusBar}
        statusBarStyle={statusBarStyle}
      />
      <NavBar 
        hidden={hiddenNavBar}
      />
      {children}
    </Background>
  );
;}

export default Container;