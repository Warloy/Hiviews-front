import { object, string } from "yup";

export const passwordRecoverySchema = object({
  email: string()
    .email("Debe ingresarse un correo electrónico.")
    .required("El campo es requerido.")
}).required();

export const passwordRecoveryDefaultValues = {
  email: ""
}