import { createSlice } from '@reduxjs/toolkit'

import blogService from '../services/blogs'

import { setTimedNotification } from './notificationReducer'

const initDbBlogs = await blogService.getAll()

const blogSlice = createSlice({
  name: 'blog',
  initialState: initDbBlogs,
  reducers: {
    add(state, action) {
      console.log('payload: ', action.payload)
      return state.concat(action.payload)
    },
    modify(state, action) {
      console.log('TODO')
      return null
    },
    remove(state, action) {
      console.log('TODO')
      return null
    }
  }
})

const { add, modify, remove } = blogSlice.actions

export const addBlog = blog => {
  console.log('addBlog: ', blog)

  return async dispatch => {
    // TODO change it to async and use await blogService.create
    const newBlog = await blogService.create(blog)
    console.log('newBlog: ', newBlog)
    dispatch(add(newBlog))

    const payload = {
      text: `a new blog ${blog.title} by ${blog.author} added`,
      error: false
    }
    dispatch(setTimedNotification(payload, 1))
  }
}

export default blogSlice.reducer
