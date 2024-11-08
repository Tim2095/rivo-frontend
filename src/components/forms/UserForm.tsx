import classes from "./userForm.module.scss";
import { useRef, useState } from "react";
import userServices from "../../services/users";
import { type NavigateFunction, useNavigate } from "react-router-dom";
const UserForm = () => {
  const navigate: NavigateFunction = useNavigate();

  const firstname = useRef<HTMLInputElement>(null);
  const lastname = useRef<HTMLInputElement>(null);
  const age = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const [error, setError] = useState<string>("");
  const [successUser, setSuccessUser] = useState<string>("");

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

      console.log(newUser);
      await userServices.createUser(newUser);
      console.log("User created successfully");
      setSuccessUser("User created successfully");
      setTimeout(() => {
        setSuccessUser("");
        navigate("/login");
      }, 3000);
      setError("");
    } catch (err) {
      if (err instanceof Error) {
        const errorMessage =
          (err as Error).message || "An unknown error occurred";
        setError(errorMessage);
        setTimeout(() => {
          setError("");
        }, 5000);
      } else {
        setError("An unknown Error occured");
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    }
  };

  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  return (
    <>
      <form className={classes.form} onSubmit={onCreateUser}>
        {error && <p className={classes.error}>{error}</p>}
        {successUser && (
          <p className={classes["user-created"]}>{successUser}</p>
        )}
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
    </>
  );
};

export default UserForm;
