import * as yup from "yup";
import { EMAIL_REGEXP } from "../validators/email";

export const fieldsScheme = yup.object().shape({
  email: yup.string().matches(EMAIL_REGEXP, "Введите корректный email"),
  password: yup
    .string()
    .matches(
      /^[\w_]*$/,
      "Недопустимый пароль. Допустимые символы: буквы, цифры и нижнее подчёркивание"
    )
    .min(3, "Длина пароля должна быть не менее 3 символов")
    .max(10, "Длина пароля должна быть не более 10 символов"),
  checkPassword: yup
    .string()
    .matches(
      /^[\w_]*$/,
      "Недопустимый пароль. Допустимые символы: буквы, цифры и нижнее подчёркивание"
    )
    .min(3, "Длина пароля должна быть не менее 3 символов")
    .max(10, "Длина пароля должна быть не более 10 символов")
    .oneOf([yup.ref("password"), null], "Пароли должны совпадать!"),
});
