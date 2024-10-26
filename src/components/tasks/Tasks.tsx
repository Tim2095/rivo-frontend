import classes from "./tasks.module.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

type Task = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dateCreated: string;
};

interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  age: string;
  tasks: Task[];
}



interface RootState {
  users: User[];
}

const Tasks = () => {
  const user = useSelector((state: RootState) => state.users);
  console.log(user);
  const navigate = useNavigate();

  const handleAddTaskBtn = () => {
    navigate("/new-task");
  };

  return (
    <div>
      {!user ? (
        <div className={classes.task}>
          <h3>You have no tasks yet</h3>
          <button
            onClick={handleAddTaskBtn}
            className={classes["add-task-btn"]}
          >
            Add Task
          </button>
        </div>
      ) : (
        <div className={classes.task}>
          {user.tasks.map((task: Task) => (
            <div key={task.id}>
              <p>{task.title}</p>
              <p>{task.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tasks;
