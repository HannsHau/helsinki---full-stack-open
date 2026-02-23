import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'message', 
  initialState: '',
  reducers: {
    setMessage(state, action) {
      state = action.payload
      return state
    },
    removeMessage(state) {
      state = ''
      return state
    }
  }
})

export const { setMessage, removeMessage } = anecdoteSlice.actions
export default anecdoteSlice.reducer