import { ImageSourcePropType } from "react-native";

export type TComment = {
  _id: string | number;
  authorID: string | number;
  author: string;
  authAvatar: ImageSourcePropType;
  content: string;
  date: Date;
};

export type TReview = {
  _id: string | number;
  authorID?: string | number;
  author: string;
  description: string;
  movie: string;
  image?: ImageSourcePropType;
  date: string;
  rate: number;
  likes: number;
  comments: number;
  commentCollection?: TComment[];
  tags?: TTag[];
  status?: boolean;
};

export type TMovie = {
  _id: string | number;
  name: string;
  image: string | ImageSourcePropType;
};

export type TThread = {
  _id: string | number;
  authorID: string | number;
  author: string;
  description: string;
  category: TCategory;
  topic: string;
  picture?: ImageSourcePropType | string;
  date: string;
  likes: number;
  comments: number;
  commentCollection?: TComment[];
  status?: boolean;
}

export type TTag = {
  _id: string | number;
  name: string;
};

export type TCategory = {
  _id: string | number;
  name: string;
};

export type TNewReview = {
  description: string;
}