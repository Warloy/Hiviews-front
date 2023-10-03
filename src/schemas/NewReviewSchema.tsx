import { date, number, object, string } from "yup";

export const newReviewSchema = object({
  description: string()
    .min(1, "Debe ingresar al menos un caracter.")
    .required("El campo es requerido.")
  
}).required();

export const newReviewDefaultValues = {
  description: ""
};