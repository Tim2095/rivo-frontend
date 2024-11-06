import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type User = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  age: string;
  tasks: [];
};

type UserState = User | null;

// Set the initial state to null
const initialState: UserState = null;


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      return action.payload
    },

    unsetUser(state, action: PayloadAction<null>) {
      return action.payload;
    },
  },
});

export const { setUser, unsetUser } = userSlice.actions;

export default userSlice.reducer;
