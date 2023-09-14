import Container from "@/components/Container";
import MovieCarousel from "@/components/MainComponents/MovieCarousel";

const FeedPage = () => {
  return (
    <Container
      hiddenNavBar={true}
    >
      <MovieCarousel />
    </Container>
  );
};

export default FeedPage;