import classes from "./userForm.module.scss";

const UserForm = () => {
  return (
    <form className={classes.form}>
      <div className={classes['form-fields']}>
        <div>
          <label htmlFor="">First Name</label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="">Last Name</label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="">Age</label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="">Email</label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input type="text" />
        </div>
        <button className={classes['create-btn']}>Create Account</button>
      </div>
    </form>
  );
};

export default UserForm;
