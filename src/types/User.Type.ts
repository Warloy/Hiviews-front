import { ImageSourcePropType } from "react-native";

export type TSession = {
  id: string | number | null;
  token: string | number | null;
} | null;

export type TLogin = {
  email: string;
  password: string;
};

export type TRegister = {
  email: string;
  username: string;
  name: string;
  surname: string;
  birthday: Date;
  password: string;
  passwordConfirm: string;
};

export type TChangePassword = {
  password: string;
  newPassword: string;
  newPasswordConfirm: string;
};

export type TPasswordRecovery = {
  email: string;
};

export type TPasswordRestore = {
  newPassword: string;
  newPasswordConfirm: string;
};

export type TUser = {
  _id: number | string;
  email: string;
  name: string;
  surname: string;
  username: string;
  bio: string;
  birthday: Date | string;
  avatar?: String | ImageSourcePropType;
  roles?: any;
  reviewCollection?: string[];
  status?: boolean;
};

export type TUserCard = {
  id: string;
  name: string;
  surname: string;
  username: string;
  avatar?: String | ImageSourcePropType;
}

export type TAvatar = {
  _id: string | number;
  src: string | ImageSourcePropType;
}