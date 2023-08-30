export type TSession = {
  id: string | number | null;
  token: string | number | null;
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