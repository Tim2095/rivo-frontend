import classes from "./header.module.scss";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

// Type for user state
interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  age: string;
}

interface RootState {
  users: User[];
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
  const users = useSelector((state: RootState) => state.users);

  return users.length === 0 ? <MainHeader /> : <ProfileHeader />;
};

export default Header;
