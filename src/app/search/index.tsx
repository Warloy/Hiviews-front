import { useLocalSearchParams, Stack } from "expo-router";
import Container from "@/components/Container";
import { colors } from "@/constants/Colors";

import ForumPost from "@/components/MainComponents/ForumPost";
import CommentSection from "@/components/MainComponents/Comment/CommentSection";
import comments from "@/static/commentData";


const SearchPage = () => {
  const { id } = useLocalSearchParams();
  const thread = id=="3" ? {
    id: 3,
    authorID: 3,
    author: "Anon",
    description: "No tiene comparativa. No hay discusión. En serio, no puedes llamarte un ser pensante y no estar de acuerdo con esto. Si piensas de esa manera, considera verte con un psicólogo o algo por el estilo. En serio.",
    category: {
      id: 3,
      name: "Offtopic"
    },
    topic: "Definitivamente la mejor imagen de perfil de la app es esta.",
    picture: require("@/assets/example/avatar06.jpg"),
    date: new Date('2023-05-30T14:36:15.684Z').toISOString(),
    likes: 99,
    comments: 1
  } : null


  return (
    <Container
      hiddenNavBar
      statusBarColor={colors.white}
      statusBarStyle="dark-content"
    >
      <Stack.Screen options={{ headerShown: true, headerTitle: "Buscar", animation: "fade_from_bottom" }} />
      { thread ?
        <ForumPost thread={thread}>
          <CommentSection comments={comments} listHeight="66%"/>
        </ForumPost> :
        <></>
      }
    </Container>
  );
};

export default SearchPage;