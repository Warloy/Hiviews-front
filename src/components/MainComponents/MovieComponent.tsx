import useUUID from "@/hooks/useUUID";
import { IMovieComponent } from "@/interfaces/Movie.Interface";
import { Image, Stack } from "native-base"
import { TouchableOpacity } from "react-native"

const MovieComponent = ({
  id,
  page,
  image,
  alt,
  w = 85,
  h = 120
}: IMovieComponent) => {

  const uuid = id?.toString() ?? useUUID();

  return (
    <TouchableOpacity
      id={uuid}
      onPress={() => console.info(`Movie ${alt} pressed, maybe redirect to ${page}...`)}
    >
      <Stack
        p={1}
      >
        <Image
          borderRadius={5}
          h={h}
          w={w}
          source={image}
          alt={alt}
        />
      </Stack>
    </TouchableOpacity>
  );
};

export default MovieComponent;