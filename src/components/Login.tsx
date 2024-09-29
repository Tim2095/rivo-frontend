import { FormEvent, useState } from "react";
import classes from "./login.module.scss";
import loginServices from "../services/login";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginError, setLoginError] = useState<string>("");

  const onSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await loginServices.loginUser({
        email,
        password,
      });
    } catch (err) {
      if (err instanceof Error) {
        const errorMessage =
          (err as Error).message || "An unknown error occurred";
        setLoginError(errorMessage);
        setTimeout(() => {
          setLoginError("");
        }, 5000);
      } else {
        setLoginError("An unknown Error occured");
        setTimeout(() => {
          setLoginError("");
        }, 5000);
      }
    }
  };

  return (
    <form className={classes.form} onSubmit={onSubmitForm}>
      <h2>{loginError}</h2>
      <div className={classes["form-fields"]}>
        <div className={classes["login-inp"]}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={classes["login-inp"]}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={classes["login-btn"]}>
          <button>Login</button>
        </div>
      </div>
    </form>
  );
};

export default Login;
