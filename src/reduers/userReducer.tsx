import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type User = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  age: string;
  tasks: [];
};

const initialState: User | null = null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      return action.payload
    },

    unsetUser(state, action: PayloadAction) {
      return action.payload;
    },
  },
});

export const { setUser, unsetUser } = userSlice.actions;

export default userSlice.reducer;
