import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./components/pages/Home";
import Signup from "./components/pages/Signup";
import Login from "./components/pages/Login";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "./reduers/userReducer";
import { useEffect, useState } from "react";
import Tasks from "./components/tasks/Tasks";
import NewTask from "./components/tasks/NewTask";
import { jwtDecode } from "jwt-decode";
import { unsetUser } from "./reduers/userReducer";
import Task from "./components/tasks/Task";

interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  age: string;
}

interface RootState {
  users: User[] | null;
}

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const user = useSelector((state: RootState) => state.users);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const user = JSON.parse(storedUser);
      dispatch(setUser(user));
    }

    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const expirationTime = decodedToken.exp * 1000;

      if (Date.now() > expirationTime) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        dispatch(unsetUser());
        navigate("/");
      }
    }

    setIsLoading(false);
  }, [dispatch]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const addNewTask = (task) => {
    dispatch(setUser(task));
    console.log(task)
  };

  return (
    <div className="container">
      <Header />
      <Routes>
        <Route
          path="/"
          element={!user ? <Home /> : <Navigate replace to="/tasks" />}
        />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        {user && <Route path="tasks" element={<Tasks />} />}
        {user && (
          <Route
            path="tasks/:id"
            element={<Task onTaskComplete={addNewTask} />}
          />
        )}
        {user && (
          <Route
            path="new-task"
            element={<NewTask onAddNewTask={addNewTask} />}
          />
        )}
      </Routes>
    </div>
  );
}

export default App;
