import { object, string } from "yup";

export const passwRestoreSchema = object({
  newpassword: string()
    .required("El campo es requerido.")
    .min(8, "La contraseña requiere mínimo 8 caracteres.")
  .max(100, "La contraseña requiere máximo 100 caracters."),
  newpasswordconfirm: string()
    .required("El campo es requerido.")
    .min(8, "La contraseña requiere mínimo 8 caracteres.")
    .max(100, "La contraseña requiere máximo 100 caracters.")
})

export const passwRestoreDefaultValues = {
  newpassword: "",
  newpasswordconfirm: ""
}