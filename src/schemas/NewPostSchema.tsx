import { object, string } from "yup";

export const newPostSchema = object({
  description: string()
    .min(1, "Debe ingresar al menos un caracter.")
    .required("El campo es requerido.")
})

export const newPostDefaultValues = {
  description: ""
}