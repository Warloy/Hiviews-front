import { StyleSheet } from "react-native";
import { colors } from "../../constants/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.primary
  },
  cardContainer: {
    position: "absolute",
    left: "10%",
    right: "10%",
    borderRadius: 5,
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 1,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    zIndex: 1
  }
});

export default styles;