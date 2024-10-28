import classes from "./tasks.module.scss";
import { useSelector } from "react-redux";
import { redirect, useNavigate } from "react-router-dom";

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
  // Select the first user in this example or adjust based on the actual logged-in user
  const user = useSelector((state: RootState) => state.users);
  const navigate = useNavigate();

  const handleAddTaskBtn = () => {
    navigate("/new-task");
  };

  const viewTask = (id: string) => {
    navigate(`/tasks/${id}`)
  }

  return (
    <div className={classes["main-cnt"]}>
      {user?.tasks && user.tasks.length > 0 ? (
        <div className={classes.cnt}>
          <nav className={classes.nav}>
            <li>All</li>
            <li>Completed</li>
          </nav>
          <div className={classes.task}>
            {user.tasks.map((task: Task) => (
              <div key={task.id} className={classes["task-cnt"]}>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <button className={classes['view-task-btn']} onClick={() => viewTask(task.id)}>view</button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={classes.task}>
          <h3>You have no tasks yet</h3>
          <button
            onClick={handleAddTaskBtn}
            className={classes["add-task-btn"]}
          >
            Add Task
          </button>
        </div>
      )}
    </div>
  );
};

export default Tasks;
