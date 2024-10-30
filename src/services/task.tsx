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
    console.log("error creating task", err);
  }
};


const updateCompleteTask = async (taskId: string, userId: string) => {
  const response = await axios.patch(`${baseUrl}/complete`, {taskId, userId})
  console.log(response.data)
  return response.data
}

export default {
  createTask,
  updateCompleteTask
};
