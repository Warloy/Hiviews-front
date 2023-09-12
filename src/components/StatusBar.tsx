import { SafeAreaView, StatusBar as Bar} from "react-native";
import { IStatusBarProps } from "@/interfaces/StatusBar.Interface";
import { colors } from "@/constants/Colors";
import styles from "./styled-components/styles";

const StatusBar = ({ backgroundColor = colors.primary, hidden = false, statusBarStyle = "default" }: IStatusBarProps) => {
  return (
    <SafeAreaView
      style={styles.container}
    >
      <Bar 
        animated={true}
        backgroundColor={backgroundColor}
        barStyle={statusBarStyle}
        hidden={hidden}
      />
    </SafeAreaView>
  );
};

export default StatusBar;