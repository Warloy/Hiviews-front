
import { object, string } from 'yup'

export const changePasswSchema = object({
    password: string()
    .required('El campo es requerido.')
    .min(8, 'La contraseña requiere mínimo 8 caracteres.')
    .max(100, 'La contraseña requiere máximo 100 caracteres.'),

    newPassw: string()
    .required('El campo es requerido.')
    .min(8, 'La contraseña requiere mínimo 8 caracteres.')
    .max(100, 'La contraseña requiere máximo 100 caracteres.'),
    
    newPasswConfirm: string()
    .required('El campo es requerido.')
    .min(8, 'La contraseña requiere mínimo 8 caracteres.')
    .max(100, 'La contraseña requiere máximo 100 caracteres.'),
}).required()



export const ChangePasswDefaultValues = {
    password: '',
    newPassw: '',
    newPasswConfirm: ''
  }