import classes from "./header.module.scss";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { unsetUser } from "../../reduers/userReducer";

interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  age: string;
}

interface RootState {
  user: User[];
}

const MainHeader = () => {
  return (
    <header>
      <nav className={classes.nav}>
        <div>
          <h1 className={classes["main-logo"]}>RIVO</h1>
        </div>
        <div className={classes["nav-link"]}>
          <ul className={classes.link}>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
                to="login"
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
                to="signup"
              >
                Signup
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

const ProfileHeader = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    dispatch(unsetUser());
  };

  return (
    <header>
      <nav className={classes.nav}>
        <div>
          <h1 className={classes["main-logo"]}>RIVO</h1>
        </div>
        <div className={classes["nav-link"]}>
          <ul className={classes.link}>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
                to="/tasks"
              >
                Tasks
              </NavLink>
            </li>
            <li>
            <NavLink
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
                to="/new-task"
              >
                New Task
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={handleLogout}
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
                to="/"
              >
                Logout
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

const Header = () => {
  const user = useSelector((state: RootState) => state.user);

  return !user ? <MainHeader /> : <ProfileHeader />;
};

export default Header;
