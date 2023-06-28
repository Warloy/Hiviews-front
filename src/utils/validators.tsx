import RegExp from './Regex/RegEx'

export const emailValidator = (email: string) => {
  return RegExp.regEmail.test(email)
}

export const passwordValidator = (password: string) => {
  return RegExp.regPassword.test(password)
}

export const phoneValidator = (phone: string) => {
  return RegExp.regPhone.test(phone)
}