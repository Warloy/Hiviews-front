import React, { useState } from 'react'
import { ImageSourcePropType } from 'react-native'
import { Center, Button, Box, HStack, VStack, Image, Text, ScrollView, Stack, Modal } from 'native-base'

const ImageViewerModal = ({ picture } : { picture: ImageSourcePropType }) => {
    return(
        <Center>
            <Modal>
                <Modal.Content maxWidth="100%">
                <Modal.CloseButton />
                <Modal.Body>
                    <Image
                        maxH={'100%'}
                        maxW={'100%'}
                        source={picture}
                        alt={`Error: No se pudo mostrar la imagen`}
                    />
                </Modal.Body>
                </Modal.Content>
            </Modal>
        </Center>
    )
}

export default ImageViewerModal