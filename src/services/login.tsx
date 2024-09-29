import axios from "axios";
const baseUrl = "/api/login";

type UserCredential = {
  email: string;
  password: string;
};

const loginUser = async (credentials: UserCredential) => {
  try {
    const response = await axios.post(baseUrl, credentials);
    return response.data;
  } catch (err) {
    if(axios.isAxiosError(err)) {
      console.log('Axios error response', err.response)
      if(err.response?.data) {

        throw new Error(err.response.data.message)
      } else {
        throw new Error('An unknown error occured')
      }
    }
  }
};

export default {
  loginUser,
};
