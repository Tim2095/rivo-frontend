import {createSlice} from '@reduxjs/toolkit'


const userSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    unsetUser(state, action) {
      return initialState
    }
  }
})

export const {setUser, unsetUser} = userSlice.actions

export default userSlice.reducer