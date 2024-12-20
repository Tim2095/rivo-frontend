import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reduers/userReducer";

const store = configureStore({
  reducer: {
    user: userReducer
  }
})

export default store