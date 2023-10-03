import { useLocalSearchParams, Stack } from "expo-router";
import Container from "@/components/Container";
import { colors } from "@/constants/Colors";

import ForumPost from "@/components/MainComponents/ForumPost";
import CommentSection from "@/components/MainComponents/Comment/CommentSection";
import comments from "@/static/commentData";


const ThreadPage = () => {
  const { id } = useLocalSearchParams();
  const thread = id=="2" ? {
    _id: 2,
    authorID: 2,
    author: "Manuel",
    description: "no la he visto, pero dicen que es madre pelicula. Lorem ipsum dolor sit amet quinnLorem ipsum dolor sit amet quinnLorem ipsum dolor sit amet quinnLorem ipsum dolor sit amet quinnLorem ipsum dolor sLorem ipsum dolor sit amet quinnLorem ipsum dolor sit amet quinnLorem ipsum dolor sit amet quinnLorem ipsum dolor sit amet quinnLorem ipsum dolor sit amet quinnit amet quinnLorem ipsum dolor sit amet quinnLorem ipsum dolor sit amet quinnLorem ipsum dolor sit amet quinnLorem ipsum dolor sit amet quinnLorem ipsum dolor sLorem ipsum dolor sit amet quinnLorem ipsum dolor sit amet quinnLorem ipsum dolor sit amet quinnLorem ipsum dolor sit amet quinnLorem ipsum dolor sit amet quinnit amet quinn",
    category: {
      _id: 2,
      name: "Cinéfilo"
    },
    topic: "Pero es que los planos",
    picture: require("@/assets/example/movie07.jpg"),
    date: new Date().toISOString(),
    likes: 99,
    comments: 1
  } : null


  return (
    <Container
      hiddenNavBar
      statusBarColor={colors.white}
      statusBarStyle="dark-content"
    >
      <Stack.Screen options={{ headerShown: true, headerTitle: "Ver hilo", animation: "fade_from_bottom" }} />
      { thread ?
        <ForumPost thread={thread}>
          <CommentSection comments={comments} listHeight="66%"/>
        </ForumPost> :
        <></>
      }
    </Container>
  );
};

export default ThreadPage;