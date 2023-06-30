import React from 'react'
import { Stack, Image } from 'native-base'
import { TouchableOpacity } from 'react-native'
import IMovieComponent from '../../interfaces/MovieComponent.Interface'

const MovieComponent = ({ image, alt }: IMovieComponent) => {

  return (
    <TouchableOpacity
      onPress={() => console.log(`Movie ${alt} press`)}
    >
      <Stack
        p={1}
      >
        <Image
          borderRadius={5}
          h={120}
          w={85}
          source={image}
          alt={alt}
        />
      </Stack>
    </TouchableOpacity>
  )
}

export default MovieComponent