import React from "react";
import { useForm } from "react-hook-form";
import styles from "./Form.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { sendFormData } from "../common/Send-data";
import { useRef } from "react";
import { fieldsScheme } from "../validators/rhfyup-validator";

export const RhfYup = () => {
  const buttonRef = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      checkPassword: "",
    },
    resolver: yupResolver(fieldsScheme),
  });

  const emailErrors = errors.email?.message;
  const passwordErrors = errors.password?.message;
  const checkPasswordErrors = errors.checkPassword?.message;

  const setFocus = () => {
    const values = getValues();
    const isValid = Object.values(values).every((value) => value.length > 0);

    if (isValid) {
      buttonRef.current.focus();
    }
  };

  return (
    <div className={styles.container}>
      <h1>RHF+Yup Form</h1>
      <form className={styles.regForm} onSubmit={handleSubmit(sendFormData)}>
        <input
          name="email"
          type="text"
          placeholder="Введите email:"
          {...register("email", { onBlur: setFocus })}
        />
        <hr />
        <input
          name="password"
          type="password"
          placeholder="Введите пароль:"
          {...register("password", { onBlur: () => setFocus() })}
        />
        <hr />
        <input
          name="checkPassword"
          type="password"
          placeholder="Подтвердите пароль:"
          {...register("checkPassword", { onBlur: setFocus })}
        />
        <hr />
        <button className={styles.submitButton} ref={buttonRef} type="submit">
          Зарегистрироваться
        </button>
        {errors !== {} && (
          <div className={styles.error}>
            {emailErrors || passwordErrors || checkPasswordErrors}
          </div>
        )}
      </form>
    </div>
  );
};
