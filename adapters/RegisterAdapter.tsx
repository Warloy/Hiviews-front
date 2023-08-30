import { TChangePassword, TPasswordRecovery, TRegister } from "../types/User.Type";

export const registerAdapter = (values: TRegister) => {
  const { email, username, name, lastName, birthday, password, passwordConfirm } = values;

  return {
    email,
    username,
    name,
    lastName,
    birthday,
    password,
    passwordConfirm
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