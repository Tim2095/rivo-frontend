import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type User = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  age: string;
  tasks: []
};

const initialState: User[] = [];

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User[]>) {
      return action.payload;
    },

    unsetUser() {
      return initialState;
    },
  },
});

export const { setUser, unsetUser } = userSlice.actions;

export default userSlice.reducer;
