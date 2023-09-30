import { useLocalSearchParams, Stack } from "expo-router";
import Container from "@/components/Container";
import { colors } from "@/constants/Colors";

import SearchContainer from "@/components/SearchComponents/SearchContainer";


const SearchPage = () => {
  const { value } = useLocalSearchParams<{ value: string }>();
  const query = value.replace("_", "#")
  return (
    <Container
      hiddenNavBar
      statusBarColor={colors.white}
      statusBarStyle="dark-content"
    >
      <Stack.Screen options={{ headerShown: true, headerTitle: "Buscar", animation: "fade_from_bottom" }} />
      <SearchContainer query={query}/>
    </Container>
  );
};

export default SearchPage;