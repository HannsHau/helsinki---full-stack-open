import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'filter', 
  initialState: '',
  reducers: {
    filterChange(state, action) {
      state = action.payload
      return state
    }
  }
})

export const { filterChange } = anecdoteSlice.actions
export default anecdoteSlice.reducer