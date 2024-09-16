import classes from "./userForm.module.scss";
import { useRef, useState } from "react";

const UserForm = () => {
  const firstname = useRef<HTMLInputElement>(null);
  const lastname = useRef<HTMLInputElement>(null);
  const age = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  return (
    <form className={classes.form}>
      <div className={classes["form-fields"]}>
        <div>
          <label htmlFor="">First Name</label>
          <input type="text" ref={firstname} />
        </div>
        <div>
          <label htmlFor="">Last Name</label>
          <input type="text" ref={lastname} />
        </div>
        <div>
          <label htmlFor="">Age</label>
          <input type="text" ref={age} />
        </div>
        <div>
          <label htmlFor="">Email</label>
          <input type="email" ref={email} />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <div className={classes["password-cnt"]}>
            <input
              type={!passwordVisible ? "password" : "text"}
              id="password"
              ref={password}
            />
            <span className={classes["show-hide"]} onClick={() => setPasswordVisible(!passwordVisible)}>
              {passwordVisible ? "🙈" : "👁️"}
            </span>
          </div>
        </div>
        <button className={classes["create-btn"]}>Create Account</button>
      </div>
    </form>
  );
};

export default UserForm;
