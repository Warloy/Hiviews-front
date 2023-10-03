import { TChangePassword, TLogin, TPasswordRecovery, TPasswordRestore, TRegister } from "@/types/User.Type";

export const loginAdapter = (values: TLogin) => {
  const { email, password } = values;

  return {
    email,
    password
  };
};

export const registerAdapter = (values: TRegister) => {
  const { email, username, name, surname, birthday, password } = values;

  return {
    email,
    username,
    password,
    name,
    surname,
    birthday,
    bio: "Nuevo usuario"
  };
};

export const changePasswordAdapter = (values: TChangePassword) => {
  const { password, newPassword, newPasswordConfirm } = values;

  return {
    password,
    newPassword,
    newPasswordConfirm  
  };
};

export const passwordRecoveryAdapter = (values: TPasswordRecovery) => {
  const { email } = values;

  return {
    email
  };
};

export const passwordRestoreAdapter = (values: TPasswordRestore) => {
  const { newPassword, newPasswordConfirm } = values;

  return {
    newPassword,
    newPasswordConfirm
  };
};