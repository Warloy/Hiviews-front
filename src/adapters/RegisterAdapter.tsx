export interface IRegisterAdapter {
  email: string
  username: string
  name: string
  lastName: string
  birthday: Date
  password: string
  passwordConfirm: string
}

export const registerAdapter = (values: IRegisterAdapter) => {
  
  const { email, username, name, lastName, birthday, password, passwordConfirm } = values
  
  return {
    email: email,
    username: username,
    name: name,
    lastName: lastName,
    birthday: birthday,
    password: password,
    passwordConfirm: passwordConfirm
  }
}