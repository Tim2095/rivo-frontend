import { FormEvent, useState } from "react";
import classes from "./login.module.scss";



const Login = () => {
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()

  const onSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(email, password)
  }

  return (
    <form className={classes.form} onSubmit={onSubmitForm}>
      <div className={classes["form-fields"]}>
        <div className={classes["login-inp"]}>
          <label htmlFor="email">Email</label>
          <input type="text" id="email"  onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className={classes["login-inp"]}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className={classes["login-btn"]}>
          <button>Login</button>
        </div>
      </div>
    </form>
  );
};

export default Login;
