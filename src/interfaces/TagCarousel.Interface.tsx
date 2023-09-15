import { TTag } from "@/types/Post.Type";

export interface ITagCarousel {
  tags: TTag[];
  handleCategories: (item: TTag) => void;
  getCategory: (item: TTag) => TTag | undefined;
  selectedTags: TTag[];
};