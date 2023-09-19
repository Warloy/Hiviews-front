import { useLocalSearchParams, Stack } from "expo-router";
import ReviewPost from "@/components/MainComponents/ReviewPost";
import Container from "@/components/Container";

const ReviewPage = () => {
  const { id } = useLocalSearchParams();

  const review = id=='6' ? {
    id: 6,
    authorid: 10,
    author: 'Wilder',
    description: 'no la he visto, pero dicen que es madre pelicula',
    movie: 'Death Stranding',
    image: require('@/assets/example/movie11.jpg'),
    date: new Date('2023-05-30T14:36:15.684Z').toISOString(),
    rate: 1,
    likes: 0,
    comments: 0,
    tags: [
      {
        id: 11,
        name: 'Videojuegos'
      },
      {
        id: 12,
        name: 'Kojimamadas'
      },
      {
        id: 13,
        name: 'No tiene nada que ver con cine'
      },
    ]
  } : null

  return (
    <Container
      hiddenNavBar={true}
    >
      <Stack.Screen options={{ headerShown: true, headerTitle: 'Review' }} />
      { review ? 
        <ReviewPost review={review}>
        </ReviewPost> : 
        <></>  
      }
      
    </Container>
  );
};

export default ReviewPage;