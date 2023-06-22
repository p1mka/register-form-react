export const passwordValidator = (value) => {
  let error = null;
  if (!/^[\w_]*$/.test(value)) {
    error =
      "Недопустимый пароль. Допустимые символы: буквы, цифры и нижнее подчёркивание";
  } else if (value.length > 10) {
    error = "Длина пароля должна быть не более 10 символов";
  }
  return error;
};
