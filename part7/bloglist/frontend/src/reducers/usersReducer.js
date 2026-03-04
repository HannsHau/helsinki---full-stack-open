import { createSlice } from '@reduxjs/toolkit'

import usersService from '../services/users'

const initDbUsers = await usersService.getAll()

const usersSlice = createSlice({
  name: 'users',
  initialState: initDbUsers,
  reducers: {
    getAll(state, action) {
      return state
    }
  }
})

export const { getAll } = usersSlice.actions 

export default usersSlice.reducer
