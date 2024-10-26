import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./components/pages/Home";
import Signup from "./components/pages/Signup";
import Login from "./components/pages/Login";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "./reduers/userReducer";
import { useEffect, useState } from "react";
import Tasks from "./components/tasks/Tasks";
import NewTask from "./components/tasks/NewTask";

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
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const user = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const user = JSON.parse(storedUser);
      dispatch(setUser(user));
    }
    setIsLoading(false)
  }, [dispatch]);

  if(isLoading) {
    return <p>Loading...</p>
  }

  const showTask = (task) => {
    dispatch(setUser(task))
  }

  return (
    <div className="container">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            !user  ? <Home /> : <Navigate replace to="/tasks" />
          }
        />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        {user && <Route path="tasks" element={<Tasks />} />}
        {user && <Route path="new-task" element={<NewTask onAddNewTask={showTask} />} />}
      </Routes>
    </div>
  );
}

export default App;
