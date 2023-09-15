import { object, ref, string } from "yup";

export const passwordRestoreSchema = object({
  newPassword: string()
    .required("El campo es requerido.")
    .min(8, "La contraseña requiere mínimo 8 caracteres.")
    .max(100, "La contraseña requiere máximo 100 caracters."),

  newPasswordConfirm: string()
    .required("El campo es requerido.")
    .oneOf([ref("newPassword")], "Las contraseñas no coinciden.")

});

export const passwordRestoreDefaultValues = {
  newPassword: "",
  newPasswordConfirm: ""
};