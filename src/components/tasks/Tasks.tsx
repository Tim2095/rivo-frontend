import { useSelector, useDispatch } from "react-redux";

interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  age: string;
}

interface RootState {
  users: User[];
}

const Tasks = () => {

  const user = useSelector((state: RootState) => state.users);
  return (
  <h1>{user.firstname}</h1>
  )
}

export default Tasks