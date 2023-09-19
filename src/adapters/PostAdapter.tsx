import { TReview } from "@/types/Post.Type";

export const newPostAdapter = (values: TReview) => {
  const { author, description, movie, image, date, } = values;
  return {
    author,
    description,
    movie,
    image,
    date
  };
};