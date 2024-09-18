const baseUrl = "/api/user/create";
import axios from "axios";

type Task = {
  title: string;
  description?: string;
  completed: boolean;
};

type User = {
  firstname: string;
  secondname: string;
  age: number;
  email: string;
  password: string;
  tasks: Task[];
};

const createUser = async (user: User) => {
  try {
    const response = await axios.post(baseUrl, user);
    console.log('User created successfully', response.data)
  } catch (err) {
    console.log('Error creating user', err)
  }
};


export default {
  createUser
}