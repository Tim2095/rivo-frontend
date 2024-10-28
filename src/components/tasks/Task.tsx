import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import classes from './task.module.scss'

interface RootState {
  users: User[] | null;
}

const Task = () => {
  const { id } = useParams();
  const task = useSelector((state: RootState) => {
    return state.users.tasks.find(task => task.id === id)
  });



  return (
    <div className={classes.task}>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <div className={classes['btn-cnt']}>
        <button>complete</button>
        <button>edit</button>
      </div>
    </div>
  );
};

export default Task;
