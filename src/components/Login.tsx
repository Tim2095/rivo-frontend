import classes from "./login.module.scss";

const Login = () => {
  return (
    <form className={classes.form}>
      <div className={classes["form-fields"]}>
        <div className={classes["login-inp"]}>
          <label htmlFor="">Email</label>
          <input type="text" />
        </div>
        <div className={classes["login-inp"]}>
          <label htmlFor="">Password</label>
          <input type="password" />
        </div>

        <div className={classes["login-btn"]}>
          <button>Login</button>
        </div>
      </div>
    </form>
  );
};

export default Login;
