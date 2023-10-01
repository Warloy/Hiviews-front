import { object, string } from "yup";

export const newPostSchema = object({
  title: string()
    .min(1, "Debe ingresar al menos un caracter.")
    .required("El campo es requerido."),
  description: string()
    .min(1, "Debe ingresar al menos un caracter.")
    .required("El campo es requerido.")
})

export const newPostDefaultValues = {
  title: "",
  description: ""
}