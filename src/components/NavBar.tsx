import React, { Children, useCallback, useState } from 'react'
import { ActivityIndicator, ScaledSize, TouchableOpacity, useWindowDimensions } from 'react-native'
import { HStack, Stack, Text } from 'native-base'

import useAuthContext from '../hooks/useAuthContext'
import useCustomToast from '../hooks/useCustomToast'

import colors from '../styled-components/colors'
import { useFocusEffect } from '@react-navigation/native'
import { IAuthContextType } from '../interfaces/AuthContext.Interfaces'
import { INavBarProps } from '../interfaces/NavBar.Interface'



const NavBar = ({ hidden = false, logout = true}: INavBarProps) => {

    const { dispatch }: IAuthContextType = useAuthContext()
    const { showSuccessToast, showErrorToast } = useCustomToast()
    const layout:ScaledSize = useWindowDimensions()

    return(
        <>
            {!hidden && 
                <HStack
                    pt={2}
                    pr={2}
                    minW={layout.width}
                >
                    <Stack
                        alignItems='flex-start'
                        justifyContent='center'
                        minW={layout.width * .3}
                    >
                        
                    </Stack>
                    <Stack
                        alignItems='flex-start'
                        justifyContent='center'
                        minW={layout.width * .3}
                    >
                        
                    </Stack>
                    <Stack
                        alignItems='flex-start'
                        justifyContent='center'
                        minW={layout.width * .3}
                    >
                        
                    </Stack>

                </HStack>
            }
        </>
    )
}

export default NavBar