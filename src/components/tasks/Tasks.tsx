import classes from "./tasks.module.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  age: string;
  tasks: [];
}

type Task = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dateCreated: string;
};

interface RootState {
  users: User[];
}

const Tasks = () => {
  const user = useSelector((state: RootState) => state.users);
  const navigate = useNavigate();

  const handleAddTaskBtn = () => {
    navigate("/new-task");
  };

  return (
    <div>
      {user.map((user) =>
        user.tasks.length === 0 ? (
          <div className={classes.task} key={user.id}>
            <h3>You have no tasks yet</h3>
            <button
              onClick={handleAddTaskBtn}
              className={classes["add-task-btn"]}
            >
              Add Task
            </button>
          </div>
        ) : (
          <div className={classes.task} key={user.id}>
            {user.tasks.map((task: Task) => (
              <div key={task.id}>
                <p>{task.title}</p>
                <p>{task.description}</p>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default Tasks;
