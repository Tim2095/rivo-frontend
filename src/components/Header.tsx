import classes from "./header.module.scss";
import { NavLink } from "react-router-dom";
import { useSelector, UseSelector } from "react-redux";
const Header = () => {

  const user = useSelector(state => state.users)

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
            <li></li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
