import { createSlice } from '@reduxjs/toolkit'
import { setTimedNotification } from './notificationReducer'
import blogService from '../services/blogs'
import loginService from '../services/login'

const getUser = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
  const user = loggedUserJSON ? JSON.parse(loggedUserJSON) : null
  if (user) { 
    blogService.setToken(user.token)
  }
  return user
}

const userSlice = createSlice ({
  name: 'user',
  initialState: getUser(), 
  reducers: {
    login(state, action) {
      state = action.payload
      return state
    },
    logout() {
      return null
    }
  }
})

const { login, logout } = userSlice.actions

export const loginUser = ({ username, password }) => {
  return async dispatch => {

    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      dispatch(login(user))
    } catch {
      const payload = {
        text: 'wrong username or password',
        error: true
      }
      dispatch(setTimedNotification(payload, 3))
    }
  }
}

export const logoutUser = () => {
  return dispatch => {
    window.localStorage.removeItem('loggedBlogUser')
    dispatch(logout())
  }
}
  
export default userSlice.reducer