import classes from "./newTask.module.scss";
import taskService from '../../services/task'
import { useRef } from "react";

const NewTask = () => {

  const taskTitle = useRef<HTMLInputElement>(null)
  const taskDescription = useRef<HTMLTextAreaElement>(null)
  
  const onAddTask =  async (event: React.FormEvent) => {
    event.preventDefault()

    const newTask = {
      title: taskTitle.current!.value,
      description: taskDescription.current!.value
    }

    const response = await taskService.createTask(newTask)
    console.log(response)

  }

  return (
    <form className={classes.form} onSubmit={onAddTask}>
      <div className={classes['task-cnt']}>
        <div className={classes["task-item"]}>
          <label htmlFor="task-title">Task Title</label>
          <input type="text" id="task-title" ref={taskTitle} />
        </div>
        <div className={classes["task-item"]}>
          <label htmlFor="task-description">Task Description</label>
          <textarea id="task-description" rows={5} cols={30} ref={taskDescription}></textarea>
        </div>
        <div className={classes['task-btn']}>
          <button>Create Task</button>
        </div>
      </div>
    </form>
  );
};

export default NewTask;
