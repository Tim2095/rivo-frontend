const baseUrl = "/api/user";
import axios from "axios";

type Task = {
  title: string;
  description?: string;
  completed: boolean;
};

type User = {
  firstname: string;
  lastname: string;
  age: number;
  email: string;
  password: string;
  tasks: Task[];
};

const createUser = async (user: User) => {
  try {
    const response = await axios.post(baseUrl, user);
    console.log("User created successfully", response.data);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.log("Axios error response", err.response);
      if (err.response?.data) {
        throw new Error(err.response.data.message || "Failed to create user");
      } else {
        throw new Error("Failed to create user");
      }
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};


export default {
  createUser,
};
