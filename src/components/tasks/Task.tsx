import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import classes from "./task.module.scss";
import { useState } from "react";
import taskServices from '../../services/task'

interface RootState {
  users: User[] | null;
}

const Task = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();
  const task = useSelector((state: RootState) => {
    return state.users.tasks.find((task) => task.id === id);
  });

  if (!task) {
    return <p>Task not found</p>;
  }


  const handleCompleteTask = async (taskId: string) => {
    console.log(taskId)
    await taskServices.updateCompleteTask(taskId)

  }

  return (
    <div className={classes.task}>
      {!isEditing ? (
        <>
          <h2>{task.title}</h2>
          <p>{task.description}</p>
        </>
      ) : (
        <>
          <input type="text" defaultValue={task.title} />
          <input type="text" defaultValue={task.description} />
        </>
      )}
      <div className={classes["btn-cnt"]}>
        <button>Complete</button>
        <>
        
         {!isEditing ? <button onClick={() => setIsEditing(true)}>Edit</button> : 
          <button onClick={() => handleCompleteTask(task.id)}>save</button>
         }
        </>
      </div>
    </div>
  );
};

export default Task;
