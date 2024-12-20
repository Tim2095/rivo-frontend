import { useState } from "react";
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
  user: User;
}

const Tasks = () => {
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<string>('all')

  const filteredTasks = user.tasks.filter((task: Task) => {
    if(tasks === 'all') {
      return task 
    } else {
      return task.completed === true
    }
  })

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
            <li onClick={() => setTasks('all')}>All</li>
            <li onClick={() => setTasks('completed')}>Completed</li>
          </nav> 
          <div className={classes.task}>
            {filteredTasks.map((task: Task) => (
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
