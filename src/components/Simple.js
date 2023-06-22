import { useState } from "react";
import styles from "./Form.module.css";
import { useRef } from "react";
import { EMAIL_REGEXP } from "../validators/email";
import { passwordValidator } from "../validators/password";
import { sendFormData } from "../common/Send-data";

export function Simple() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    checkPassword: "",
  });
  const { email, password, checkPassword } = formData;
  const [error, setError] = useState(null);
  const buttonRef = useRef(null);

  const onEmailChange = ({ target }) => {
    setFormData({ ...formData, email: target.value });
  };

  const setFocus = () => {
    const isValid = Object.values(formData).every((value) => value.length > 0);

    if (isValid) {
      buttonRef.current.focus();
    }
  };

  const onEmailBlur = () => {
    !EMAIL_REGEXP.test(email)
      ? setError("Введите корректный email")
      : setFocus();
  };

  const onPassChange = ({ target }) => {
    setFormData({ ...formData, password: target.value });
    const error = passwordValidator(target.value);
    setError(error);
  };

  const onPassBlur = () => {
    if (password.length < 3) {
      setError("Длина пароля должна быть не менее 3 символов");
    } else if (password !== checkPassword) {
      setError("Пароли должны совпадать!");
    } else {
      setFocus();
    }
  };

  const onCheckPassChange = ({ target }) => {
    setFormData({ ...formData, checkPassword: target.value });
  };

  const onCheckPassBlur = () => {
    if (formData.checkPassword !== password) {
      setError("Пароли должны совпадать!");
    } else {
      setError(null);
      setFocus();
    }
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (!error && email && password && checkPassword) {
      sendFormData(formData);
      setFormData({
        email: "",
        password: "",
        checkPassword: "",
      });
    } else if (email === "" || password === "" || checkPassword === "") {
      setError("Все поля должны быть заполнены!");
    }
  };

  return (
    <div className={styles.container}>
      <h1>Simple Form</h1>
      <form className={styles.regForm} onSubmit={onSubmitForm}>
        <input
          name="email"
          type="email"
          placeholder="Введите email:"
          value={email}
          onChange={onEmailChange}
          onBlur={onEmailBlur}
        />
        <hr />
        <input
          name="pass"
          type="password"
          placeholder="Введите пароль:"
          value={password}
          onChange={onPassChange}
          onBlur={onPassBlur}
        />
        <hr />
        <input
          name="passCheck"
          type="password"
          placeholder="Подтвердите пароль:"
          value={checkPassword}
          onChange={onCheckPassChange}
          onBlur={onCheckPassBlur}
        ></input>
        <hr />
        <button
          ref={buttonRef}
          className={styles.submitButton}
          type="submit"
          disabled={!!error}
        >
          Зарегистрироваться
        </button>
        {error && <div className={styles.error}>{error}</div>}
      </form>
    </div>
  );
}
