import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      const users = action.payload
      console.log(users)
      return users
    },
  },
})

export const { setUsers } = usersSlice.actions

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await usersService.getAll()
    console.log(users, 'digg')
    dispatch(setUsers(users))
  }
}
export default usersSlice.reducer
