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

    const response = await axios.post(baseUrl, task, config);
    return response.data;
  } catch (err) {
    console.error("Error creating task:", err);
    throw err; 
  }
};

const updateCompleteTask = async (taskId: string, userId: string) => {
  try {
    const response = await axios.patch(`${baseUrl}/complete`, { taskId, userId });
    console.log("Task update response:", response.data);
    return response.data;
  } catch (err) {
    console.error("Error updating task completion status:", err);
    throw err; 
  }
};

export default {
  createTask,
  updateCompleteTask,
};
