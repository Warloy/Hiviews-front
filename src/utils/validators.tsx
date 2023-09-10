import RegExp from './Regex/RegEx'

export const emailValidator = (email: string) => {
  return RegExp.regEmail.test(email)
}

export const passwordValidator = (password: string) => {
  return RegExp.regPassword.test(password)
  
}

export const nameValidator = (name: string) => {
  return RegExp.regName.test(name)
}

export const lastNameValidator = (lastName: string) => {
  return RegExp.regLastName.test(lastName)
}

export const usernameValidator = (username: string) => {
  return RegExp.regUsername.test(username)
}
export const birthdayValidator = (birthday: string) => {
  return RegExp.regBirthday.test(birthday)
}
