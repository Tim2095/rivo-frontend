import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import classes from "./task.module.scss";
import { useState } from "react";
import taskServices from "../../services/task";
import { setUser } from "../../reduers/userReducer"; 


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


const Task = () => {
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
    try {
      const response = await taskServices.updateCompleteTask(taskId, userId);
      dispatch(setUser(response.user));
      localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(response.user));
      setIsEditing(false);
    } catch (err) {
      console.log("Failed to update task", err);
      alert("Error while updating task");
    }
  };

  const handleEditTask = async (
    taskId: string,
    userId: string,
    taskTitle: string,
    taskDescription: string
  ) => {
    try {
      const response = await taskServices.editTask(
        taskId,
        userId,
        taskTitle,
        taskDescription
      );
      localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(response.user));
      dispatch(setUser(response.user))
      setIsEditing(false);
    } catch (err) {
      console.log("Failed to update task", err);
      alert("Error while updating task");
    }
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
        <div className={classes["inp-cnt"]}>
          <input
            type="text"
            defaultValue={task.title}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
          <textarea
            rows={5}
            cols={30}
            defaultValue={task.description}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
        </div>
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
