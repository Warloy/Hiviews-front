import { StyleSheet, View, useWindowDimensions } from "react-native";
import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg";
import { IBackgroundProps } from "../interfaces/Background.Interface";

const Background = ({ topColor, bottomColor, children }: IBackgroundProps) => {
  const { height, width } = useWindowDimensions();
  
  return (
    <View style={{ flex: 1 }}>
      <Svg
        width={width}
        height={height}
        style={StyleSheet.absoluteFillObject}
      >
        <Defs>
          <LinearGradient
            id="grad"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <Stop 
              offset="0"
              stopColor={topColor}
            />
            <Stop 
              offset="1"
              stopColor={bottomColor}
            />
          </LinearGradient>
        </Defs>
        <Rect 
          width={width}
          height={height}
          fill="url(#grad)"
        />
      </Svg>
      {children}
    </View>
  )
};

export default Background;