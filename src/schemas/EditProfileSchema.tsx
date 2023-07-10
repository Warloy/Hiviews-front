import { object, string, date} from 'yup'

export const editProfileSchema = object({
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

  profilepic: string()
    .required('La foto de perfil es requerida'),

  bio: string()
    .required('El campo es requerido.')
    .max(255, 'el máximo de caracteres es 255.'),
}).required()

export const EditProfileDefaultValues = {
  username: '',
  name: '',
  lastName: '',
  birthday: new Date(),
  profilepic: '',
  bio: '',
}