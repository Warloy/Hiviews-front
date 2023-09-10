export type TComment = {
  id: string | number;
  author: string;
  authAvatar: string;
  content: string;
  date: Date;
};

export type TReview = {
  id: string | number;
  author: string;
  description: string;
  movie: string;
  image: string;
  date: Date;
  rate: number;
  likes: number;
  comments: number;
  tags: TTag[]
};

export type TThread = {
  id: string | number;
  author: string;
  description: string;
  category: TCategory;
  topic: string;
  picture: string;
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

