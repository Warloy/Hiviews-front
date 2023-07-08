import { object, string } from 'yup'

export const passwRecoverySchema = object({
  email: string()
    .email('Debe ingresarse un correo electrónico.')
    .required('El campo es requerido.')
}).required()

export const passwRecoveryDefaultValues = {
  email: '',
}