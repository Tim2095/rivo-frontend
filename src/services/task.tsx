import axios from "axios";
const baseUrl = "/api/new-task";

type Task = {
  title: string;
  description: string;
};

const createTask = async (task: Task) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No token found");
    }

    const parsedToken = JSON.parse(token);

    const config = {
      headers: {
        Authorization: `Bearer ${parsedToken}`,
      },
    };

    const response = await axios.put(baseUrl, task, config);
    return response.data;
  } catch (err) {
    console.log("error creating task", err);
  }
};

export default {
  createTask,
};
