import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import classes from "./task.module.scss";
import { useState } from "react";
import taskServices from "../../services/task";
import { updateUserTask } from "../../reduers/userReducer";
import { useNavigate } from "react-router-dom";

type User = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  age: string;
  tasks: Task[];
};

interface RootState {
  users: User[] | null;
}

type Task = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
};

interface TaskComplete {
  onTaskComple: (data: any) => void;
  onTaskUpdate: (data: any) => void;
}

const Task = ({ onTaskComplete, onTaskUpdate }: TaskComplete) => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");
  const { id } = useParams<{ id: string }>();
  const user = useSelector((state: RootState) => state.users);
  const task = useSelector((state: RootState) => {
    return state.users.tasks.find((task: Task) => task.id === id);
  });

  if (!task) {
    return <p>Task not found</p>;
  }

  const handleCompleteTask = async (taskId: string, userId: string) => {
    const response = await taskServices.updateCompleteTask(taskId, userId);
    onTaskComplete(response.user);
    dispatch(updateUserTask(response.user.tasks))
    localStorage.removeItem('user')
    localStorage.setItem('user', JSON.stringify(response.user))
    setIsEditing(false);
  };

  const handleEditTask = async (
    taskId: string,
    userId: string,
    taskTitle: string,
    taskDescription: string
  ) => {
    const response = await taskServices.editTask(
      taskId,
      userId,
      taskTitle,
      taskDescription
    );
    console.log(response.user);
    onTaskUpdate(response.user);
    localStorage.removeItem('user')
    localStorage.setItem('user', JSON.stringify(response.user))
    setIsEditing(false)
    
  };

  return (
    <div className={classes.task}>
      {!isEditing ? (
        <>
          <h2>{task.title}</h2>
          <p>{task.description}</p>
          <p>{task.completed ? "Completed" : "Not"}</p>
        </>
      ) : (
        <>
          <input
            type="text"
            defaultValue={task.title}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
          <input
            type="text"
            defaultValue={task.description}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
        </>
      )}
      <div className={classes["btn-cnt"]}>
        <button
          onClick={() => handleCompleteTask(task.id, user.id)}
          disabled={task.completed ? true : false}
        >
          Complete
        </button>
        <>
          {!isEditing ? (
            <button onClick={() => setIsEditing(true)}>Edit</button>
          ) : (
            <button
              onClick={() =>
                handleEditTask(task.id, user.id, taskTitle, taskDescription)
              }
            >
              save
            </button>
          )}
        </>
      </div>
    </div>
  );
};

export default Task;
