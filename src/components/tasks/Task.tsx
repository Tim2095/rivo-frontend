import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import classes from "./task.module.scss";
import { useState } from "react";
import taskServices from "../../services/task";
import { setUser } from "../../reduers/userReducer";
import { useEffect } from "react";

type Task = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
};

type User = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  age: string;
  tasks: Task[];
};

interface RootState {
  user: User;
}

const Task = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const user = useSelector((state: RootState) => state.user);

  const task = user?.tasks.find((task) => task.id === id);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [taskTitle, setTaskTitle] = useState<string>(task?.title || "");
  const [taskDescription, setTaskDescription] = useState<string>(task?.description || "");

  useEffect(() => {
    if (task) {
      setTaskTitle(task.title);
      setTaskDescription(task.description);
    }
  }, [task]);

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
      dispatch(setUser(response.user));
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
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
          <textarea
            rows={5}
            cols={30}
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
        </div>
      )}
      <div className={classes["btn-cnt"]}>
        <button
          onClick={() => handleCompleteTask(task.id, user.id)}
          disabled={task.completed}
        >
          Complete
        </button>
        {!isEditing ? (
          <button onClick={() => setIsEditing(true)}>Edit</button>
        ) : (
          <button
            onClick={() =>
              handleEditTask(task.id, user.id, taskTitle, taskDescription)
            }
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
};

export default Task;
