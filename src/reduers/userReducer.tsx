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
  name: "users",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      return action.payload
    },

    updateUserTask(state, action: PayloadAction) {
      if (state.users) {
        console.log('hello')
        state.user.tasks = action.payload;
      }
    },

    unsetUser() {
      return initialState;
    },
  },
});

export const { setUser, updateUserTask, unsetUser } = userSlice.actions;

export default userSlice.reducer;
