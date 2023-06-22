import React from 'react'

import NavBar from './NavBar'
import Background from './Background'
import StatusBar from './StatusBar'

import { IContainerProps } from '../interfaces/Container.Interface'

import colors from '../styled-components/colors'

const Container = ({
    statusBarStyle = 'default',
    statusBarColor = colors.primary,
    hiddenStatusBar = false,
    hiddenNavBar = false,
    backgroundTopColor = colors.primary,
    backgroundBottomColor = colors.base,
    children
}: IContainerProps) => {

    return(
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
                logout={false}
            />
            {children}
        </Background>
    )
}
export default Container