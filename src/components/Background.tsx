import React from 'react'
import { View, StyleSheet, useWindowDimensions, ScaledSize } from 'react-native'
import Svg, { Defs, Rect, LinearGradient, Stop } from 'react-native-svg'
import { IBackgroundProps } from '../interfaces/Background.Interface'

const Background = ({ topColor, bottomColor, children }: IBackgroundProps ) => {

    const layout:ScaledSize = useWindowDimensions()

    return (
        <View style={{ flex: 1}}>
            <Svg width={layout.width} height={layout.height} style={StyleSheet.absoluteFillObject}>
                <Defs>
                    <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <Stop offset="0" stopColor={topColor}/>
                        <Stop offset="1" stopColor={bottomColor}/>
                    </LinearGradient>
                </Defs>
                <Rect width={layout.width} height={layout.height} fill="url(#grad)"/>
            </Svg>
            {children}
        </View>
    )
}

export default Background;