import StyledBadge from "@/components/StyledBadge";
import { ITagCarousel } from "@/interfaces/TagCarousel.Interface";
import { ScrollView, Stack } from "native-base";

const TagCarousel = ({
  handleCategories,
  getCategory,
  tags = [],
  selectedTags = []
}: ITagCarousel) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      minH={7}
      maxH={7}
    >
      {tags.map((tag, index) => (
        <Stack
          key={index}
          m={1}
        >
          <StyledBadge
            bold
            text={tag.name}
            w={100}
            px={0}
            value={getCategory(tag)}
            onChangeValue={() => handleCategories(tag)}
          />
        </Stack>
      ))}
    </ScrollView>
  )
};

export default TagCarousel;