import { object, string, date } from 'yup'

export const registerSchema = object({
  email: string()
    .email('Debe ingresarse un correo electrónico.')
    .required('El correo es requerido.'),

  username: string()
    .min(4, 'El nombre de usuario debe contener al menos 4 caracteres')
    .required('Debe ingresar un nombre de usuario.'),

  name: string()
    .min(3, 'El nombre debe contener al menos 3 caracteres')
    .max(40, 'El nombre debe contener máximo 40 caracteres')
    .required('El nombre es requerido'),

  lastName: string()
    .min(2, 'El apellido debe contener al menos 2 caracteres')
    .max(40, 'El apellido debe contener máximo 40 caracteres')
    .required('El apellido es requerido'),

  birthday: date()
    .required('La fecha de nacimiento es requerida'),

  password: string()
    .required('El campo es requerido.')
    .min(8, 'La contraseña requiere mínimo 8 caracteres.')
    .max(100, 'La contraseña requiere máximo 100 caracteres.'),

  passwordConfirm: string()
    .required('El campo es requerido.')
    .min(8, 'La contraseña requiere mínimo 8 caracteres.')
    .max(100, 'La contraseña requiere máximo 100 caracteres.'),
}).required()

export const RegisterDefaultValues = {
  email: '',
  username: '',
  name: '',
  lastName: '',
  birthday: new Date(),
  password: '',
  passwordConfirm: ''
}