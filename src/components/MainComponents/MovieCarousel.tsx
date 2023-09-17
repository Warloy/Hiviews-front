import { TMovie } from "@/types/Post.Type";
import { IScrollViewProps, ScrollView } from "native-base"
import MovieComponent from "./MovieComponent";
import movieData from "@/static/moviesData";

const MovieCarousel = (props: IScrollViewProps) => {

  const movies: TMovie[] = movieData;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      minH={130}
      maxH={130}
      {...props}
    >
      {movies.map((movie, index) => (
        <MovieComponent
          key={index}
          id={index}
          image={movie.image}
          alt={movie.name}
        />
      ))}
    </ScrollView>
  );
}

export default MovieCarousel;