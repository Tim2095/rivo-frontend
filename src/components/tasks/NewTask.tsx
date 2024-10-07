import classes from "./newTask.module.scss";

const NewTask = () => {
  return (
    <form className={classes.form}>
      <div className={classes['task-cnt']}>
        <div className={classes["task-item"]}>
          <label htmlFor="task-title">Task Title</label>
          <input type="text" id="task-title" />
        </div>
        <div className={classes["task-item"]}>
          <label htmlFor="task-description">Task Description</label>
          <textarea id="task-description" rows={5} cols={30}></textarea>
        </div>
        <div className={classes['task-btn']}>
          <button>Create Task</button>
        </div>
      </div>
    </form>
  );
};

export default NewTask;
