import { useLocalSearchParams, Stack } from "expo-router";
import Container from "@/components/Container";
import { colors } from "@/constants/Colors";
import ReviewPost from "@/components/MainComponents/ReviewPost";
import CommentSection from "@/components/MainComponents/Comment/CommentSection";
import comments from "@/static/commentData";


const ReviewPage = () => {
  const { id } = useLocalSearchParams();
  const review = id=="2" ? {
    id: 2,
    authorID: 2,
    author: 'Manuel',
    description: 'Es cine. Scorsese celebra que por primera vez se reúne tanto talento en un mismo lugar, y no es a practicar lavandería.',
    movie: 'Inglorious Basterds (2009)',
    image: require('@/assets/example/movie07.jpg'),
    date: new Date().toISOString(),
    rate: 5,
    likes: 99,
    comments: 1,
    tags: [
      {
        id: 4,
        name: 'Inglorious'
      },
      {
        id: 2,
        name: 'Acción'
      }
    ]
  } : null


  return (
    <Container
      hiddenNavBar
      statusBarColor={colors.white}
      statusBarStyle="dark-content"
    >
      <Stack.Screen options={{ headerShown: true, headerTitle: "Review", animation: "fade_from_bottom" }} />
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