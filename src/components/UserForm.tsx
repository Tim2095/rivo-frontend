import classes from "./userForm.module.scss";
import { useRef, useState } from "react";
import userServices from "../services/users";
const UserForm = () => {
  const firstname = useRef<HTMLInputElement>(null);
  const lastname = useRef<HTMLInputElement>(null);
  const age = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const [error, setError] = useState<string>("");

  const onCreateUser = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const newUser = {
        firstname: firstname.current!.value,
        lastname: lastname.current!.value,
        age: +age.current!.value,
        email: email.current!.value,
        password: password.current!.value,
        tasks: [],
      };
      const response = await userServices.createUser(newUser);
      console.log("User created successfully", response);
      setError("");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown Error occured')
      }
    }
  };

  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  return (
    <form className={classes.form} onSubmit={onCreateUser}>
      <h1>{error}</h1>
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
            <span
              className={classes["show-hide"]}
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
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
