import { colors } from "@/constants/Colors";
import { birthdayValidator, emailValidator, nameValidator, passwordValidator, usernameValidator } from "./validators";
import { FieldError } from "react-hook-form";

export const emailColor = (value: string, error: FieldError | undefined): string => {
  if (error) {
    return colors.error.primary;
  } else if (!error && emailValidator(value)) {
    return colors.primary;
  } else {
    return colors.gray0;
  }
};

export const passwordColor = (value: string, error: FieldError | undefined): string => {
  if (error) {
    return colors.error.primary;
  } else if (!error && passwordValidator(value)) {
    return colors.primary;
  } else {
    return colors.gray0;
  }
};

export const usernameColor = (value: string, error: FieldError | undefined): string => {
  if (error) {
    return colors.error.primary;
  } else if (!error && usernameValidator(value)) {
    return colors.primary;
  } else {
    return colors.gray0;
  }
};

export const nameColor = (value: string, error: FieldError | undefined): string => {
  if (error) {
    return colors.error.primary;
  } else if (!error && nameValidator(value)) {
    return colors.primary;
  } else {
    return colors.gray0;
  }
};

export const birthdayColor = (value: string,error: FieldError | undefined): string => {
  if (error) {
    return colors.error.primary;
  } else if (!error && birthdayValidator(value)) {
    return colors.primary;
  } else {
    return colors.gray0;
  }
};