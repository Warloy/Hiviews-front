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
  lastName: string;
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
  id: number | string;
  email: string;
  name: string;
  surname: string;
  username: string;
  bio: string;
  birthday: Date;
  avatar: ImageSourcePropType;
};

export type TUserCard = {
  id: string;
  name: string;
  surname: string;
  username: string;
  avatar: ImageSourcePropType;
}