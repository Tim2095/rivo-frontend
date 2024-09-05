import classes from "./header.module.scss";
import { NavLink } from "react-router-dom";
const Header = () => {
  return (
    <header>
      <nav className={classes.nav}>
        <div>
          <h1 className={classes["main-logo"]}>CALIFORNIA</h1>
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
            <li></li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
