import classes from "./home.module.scss";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className={classes.home}>
      <div>
        <h2>Hello there!</h2>
      </div>
      <div>
        <h3>This is task manager app</h3>
      </div>
      <div>
        <p>
          To use the app you need to signup and login!
        </p>
      </div>
      <div className={classes['home-link']}>
        <Link to='signup'>Signup</Link>
        <Link to='login'>Login</Link>
      </div>
    </div>
  );
};

export default Home;
