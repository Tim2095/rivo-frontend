import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reduers/userReducer";

const store = configureStore({
  reducer: {
    users: userReducer
  }
})

export default store