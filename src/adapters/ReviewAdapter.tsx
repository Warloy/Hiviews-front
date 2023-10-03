import { TTag } from "@/types/Post.Type";


export const reviewAdapter = (authorID: string, 
  description: string,
  movie: string, 
  image: string, 
  date: Date, 
  rate: number,
  likes: number,
  comments: number ) => {

  return {
    authorID,
    description,
    movie,
    image,
    date,
    rate,
    likes,
    comments
  };
};