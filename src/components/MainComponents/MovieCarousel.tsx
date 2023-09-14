import { TMovie } from "@/types/Post.Type";
import { ScrollView } from "native-base"
import MovieComponent from "./MovieComponent";

const MovieCarousel = () => {

  const movies: TMovie[] = [
    {
      id: 1,
      name: 'Final Fantasy VII Advent Children',
      image: require('../../assets/example/movie01.jpg')
    },
    {
      id: 2,
      name: 'Final Fantasy XV',
      image: require('../../assets/example/movie02.jpg')
    },
    {
      id: 3,
      name: 'Interestellar',
      image: require('../../assets/example/movie03.jpg')
    },
    {
      id: 4,
      name: 'Openheimer',
      image: require('../../assets/example/movie04.jpg')
    },
    {
      id: 5,
      name: 'Barbie',
      image: require('../../assets/example/movie05.jpg')
    }
  ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      minH={130}
      maxH={130}
    >
      {movies.map((movie, index) => {
        <MovieComponent
          key={index}
          image={movie.image}
          alt={movie.name}
        />
      })}
    </ScrollView>
  );
}

export default MovieCarousel;