import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification', 
  initialState: null,
  reducers: {
    setNotification(state, action) {
      state = action.payload
      return state
    },
    resetNotification() {
      return null
    }
  }
})

const { setNotification, resetNotification } = notificationSlice.actions

export const setTimedNotification = (payload, timeInSec=5) => {
  return async (dispatch) => {
    dispatch(setNotification(payload))
    setTimeout(() => dispatch(resetNotification()), timeInSec * 1000)
  }
}

export default notificationSlice.reducer