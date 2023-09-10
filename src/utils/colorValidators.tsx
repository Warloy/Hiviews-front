import { colors } from "@/constants/Colors";
import { birthdayValidator, emailValidator, nameValidator, passwordValidator, usernameValidator } from "./validators";

export const emailColor = (value: string): string => {
  if (!emailValidator(value) && value !== "") {
    return colors.error.primary;
  } else if (emailValidator(value) && value !== "") {
    return colors.primary;
  } else {
    return colors.gray0;
  }
};

export const passwordColor = (value: string): string => {
  if (!passwordValidator(value) && value !== "") {
    return colors.error.primary;
  } else if (passwordValidator(value) && value !== "") {
    return colors.primary;
  } else {
    return colors.gray0;
  }
};

export const usernameColor = (value: string): string => {
  if (!usernameValidator(value) && value !== "") {
    return colors.error.primary;
  } else if (usernameValidator(value) && value !== "") {
    return colors.primary;
  } else {
    return colors.gray0;
  }
};

export const nameColor = (value: string): string => {
  if (!nameValidator(value) && value !== "") {
    return colors.error.primary;
  } else if (nameValidator(value) && value !== "") {
    return colors.primary;
  } else {
    return colors.gray0;
  }
};

export const birthdayColor = (value: string): string => {
  if (!birthdayValidator(value) && value !== "") {
    return colors.error.primary;
  } else if (birthdayValidator(value) && value !== "") {
    return colors.primary;
  } else {
    return colors.gray0;
  }
};