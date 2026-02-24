import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'message', 
  initialState: '',
  reducers: {
    setMessage(state, action) {
      state = action.payload
      return state
    },
    removeMessage(state, action) {
      /* makes sure that the last message set stay there for x seconds */
      if (state === action.payload ) { 
        state = '' 
      } 
      return state
    }
  }
})

const { setMessage, removeMessage} = anecdoteSlice.actions

export const setMessageForPeriod = ( message, timeInSec ) => {
  return async (dispatch) => {
    dispatch(setMessage(message))
    setTimeout(() => {dispatch(removeMessage(message)) }, timeInSec * 1000)
  }
}

//export const { setMessage, removeMessage } = anecdoteSlice.actions
export default anecdoteSlice.reducer