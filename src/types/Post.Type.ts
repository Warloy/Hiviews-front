import { ImageSourcePropType } from "react-native";

export type TComment = {
  id: string | number;
  authorid: string | number;
  author: string;
  authAvatar: ImageSourcePropType;
  content: string;
  date: Date;
};

export type TReview = {
  id: string | number;
  authorid: string | number;
  author: string;
  description: string;
  movie: string;
  image: ImageSourcePropType;
  date: string;
  rate: number;
  likes: number;
  comments: number;
  tags: TTag[]
};

export type TMovie = {
  id: string | number;
  name: string;
  image: ImageSourcePropType;
};

export type TThread = {
  id: string | number;
  authorid: string | number;
  author: string;
  description: string;
  category: TCategory;
  topic: string;
  picture: ImageSourcePropType;
  date: Date;
  likes: number;
  comments: number;
}

export type TTag = {
  id: string | number;
  name: string;
};

export type TCategory = {
  id: string | number;
  name: string;
};

