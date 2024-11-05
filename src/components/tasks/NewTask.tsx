import classes from "./newTask.module.scss";
import taskService from "../../services/task";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../reduers/userReducer";


const NewTask = () => {
  const dispatch = useDispatch()
  const taskTitle = useRef<HTMLInputElement>(null);
  const taskDescription = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();

  const onAddTask = async (event: React.FormEvent) => {
    event.preventDefault();

    const newTask = {
      title: taskTitle.current!.value,
      description: taskDescription.current!.value,
    };

    try {
      const response = await taskService.createTask(newTask);
      localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(response.user));
      dispatch(setUser(response.user))
      navigate("/tasks");
    } catch (error) {
      console.error("Failed to create task:", error);
      alert("An error occurred while creating the task. Please try again.");
    }
  };

  return (
    <form className={classes.form} onSubmit={onAddTask}>
      <div className={classes["task-cnt"]}>
        <div className={classes["task-item"]}>
          <label htmlFor="task-title">Task Title</label>
          <input type="text" id="task-title" ref={taskTitle} />
        </div>
        <div className={classes["task-item"]}>
          <label htmlFor="task-description">Task Description</label>
          <textarea
            id="task-description"
            rows={5}
            cols={30}
            ref={taskDescription}
          ></textarea>
        </div>
        <div className={classes["task-btn"]}>
          <button>Create Task</button>
        </div>
      </div>
    </form>
  );
};

export default NewTask;
