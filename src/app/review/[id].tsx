import { useLocalSearchParams, Stack } from "expo-router";
import Container from "@/components/Container";
import { colors } from "@/constants/Colors";
import ReviewPost from "@/components/MainComponents/ReviewPost";
import CommentSection from "@/components/MainComponents/Comment/CommentSection";
import comments from "@/static/commentData";


const ReviewPage = () => {
  const { id } = useLocalSearchParams();
  const review = id=="6" ? {id: 6,
    authorID: 10,
    author: 'Wilder',
    description: 'no la he visto, pero dicen que es madre pelicula. Lorem ipsum dolor sit amet quinnLorem ipsum dolor sit amet quinnLorem ipsum dolor sit amet quinnLorem ipsum dolor sit amet quinnLorem ipsum dolor sLorem ipsum dolor sit amet quinnLorem ipsum dolor sit amet quinnLorem ipsum dolor sit amet quinnLorem ipsum dolor sit amet quinnLorem ipsum dolor sit amet quinnit amet quinnLorem ipsum dolor sit amet quinnLorem ipsum dolor sit amet quinnLorem ipsum dolor sit amet quinnLorem ipsum dolor sit amet quinnLorem ipsum dolor sLorem ipsum dolor sit amet quinnLorem ipsum dolor sit amet quinnLorem ipsum dolor sit amet quinnLorem ipsum dolor sit amet quinnLorem ipsum dolor sit amet quinnit amet quinn',
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
      hiddenNavBar
      statusBarColor={colors.white}
      statusBarStyle="dark-content"
    >
      <Stack.Screen options={{ headerShown: true, headerTitle: "Review" }} />
      { review ?
        <ReviewPost review={review}>
          <CommentSection comments={comments} listHeight="68%"/>
        </ReviewPost> :
        <></>
      }
    </Container>
  );
};

export default ReviewPage;