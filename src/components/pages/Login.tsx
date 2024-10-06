import { FormEvent, useState } from "react";
import classes from "./login.module.scss";
import loginServices from "../../services/login";
import { useDispatch } from "react-redux";
import { setUser } from "../../reduers/userReducer";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginError, setLoginError] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const loggedUser = await loginServices.loginUser({
        email,
        password,
      });

      dispatch(
        setUser({
          id: loggedUser.id,
          email: loggedUser.email,
          firstname: loggedUser.firstname,
          lastname: loggedUser.lastname,
          age: loggedUser.age,
          tasks: loggedUser.tasks,
        })
      );

      localStorage.setItem(
        "user",
        JSON.stringify({
          id: loggedUser.id,
          email: loggedUser.email,
          firstname: loggedUser.firstname,
          lastname: loggedUser.lastname,
          age: loggedUser.age,
          tasks: loggedUser.tasks
        })
      );

      localStorage.setItem("token", JSON.stringify(loggedUser.token));
      navigate("/tasks");
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
