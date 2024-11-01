import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import classes from "./task.module.scss";
import { useState } from "react";
import taskServices from '../../services/task'

type User = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  age: string;
  tasks: Task[]
}

interface RootState {
  users: User[] | null;
}

type Task = {
  id: string,
  title: string,
  description: string,
  completed: boolean
}

interface TaskComplete {
  onTaskComple: (data: any) => void
}

const Task = ({onTaskComplete} : TaskComplete) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();
  const user = useSelector((state: RootState) => state.users)
  const task = useSelector((state: RootState) => {
    return state.users.tasks.find((task: Task) => task.id === id);
  });


  if (!task) {
    return <p>Task not found</p>;
  }


  const handleCompleteTask = async (taskId: string, userId: string) => {
    const response = await taskServices.updateCompleteTask(taskId, userId)
    console.log(response)
    onTaskComplete(response.user)
  }

  const handleEditTask = async (taskId: string, userId: string) => {
    await taskServices.editTask(taskId, userId)
  }

  return (
    <div className={classes.task}>
      {!isEditing ? (
        <>
          <h2>{task.title}</h2>
          <p>{task.description}</p>
          <p>{task.completed ? 'Completed' : 'Not'}</p>
        </>
      ) : (
        <>
          <input type="text" defaultValue={task.title} />
          <input type="text" defaultValue={task.description} />
        </>
      )}
      <div className={classes["btn-cnt"]}>
        <button onClick={() => handleCompleteTask(task.id, user.id)} disabled={task.completed ? true : false}>Complete</button>
        <>
        
         {!isEditing ? <button onClick={() => setIsEditing(true)}>Edit</button> : 
          <button onClick={() => handleEditTask(task.id, user.id)}>save</button>
         }
        </>
      </div>
    </div>
  );
};

export default Task;
