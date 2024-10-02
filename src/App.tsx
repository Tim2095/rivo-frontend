import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./components/pages/Home";
import Signup from "./components/pages/Signup";
import Login from "./components/pages/Login";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "./reduers/userReducer";
import { useEffect } from "react";
import Tasks from "./components/tasks/Tasks";

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

function App() {
  const user = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const user = JSON.parse(storedUser);
      dispatch(setUser(user));
    }
  }, [dispatch]);

  return (
    <div className="container">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            user.length === 0 ? <Home /> : <Navigate replace to="/tasks" />
          }
        />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="tasks" element={<Tasks />} />
      </Routes>
    </div>
  );
}

export default App;
