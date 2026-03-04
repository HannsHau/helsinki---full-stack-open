import { createSlice } from '@reduxjs/toolkit'

import blogService from '../services/blogs'

import { setTimedNotification } from './notificationReducer'

const initDbBlogs = await blogService.getAll()

const blogSlice = createSlice({
  name: 'blog',
  initialState: initDbBlogs,
  reducers: {
    add(state, action) {
      return state.concat(action.payload)
    },
    modify(state, action) {
      const blog = action.payload
      return state.map(b => (b.id !== blog.id ? b : blog))
    },
    remove(state, action) {
      const blog = action.payload
      return state.filter(b => b.id !== blog.id)
    }
  }
})

const { add, modify, remove } = blogSlice.actions
export const addBlog = blog => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch(add(newBlog))

    const payload = {
      text: `a new blog ${blog.title} by ${blog.author} added`,
      error: false
    }
    dispatch(setTimedNotification(payload, 3))
  }
}

export const modifyBlog = blog => {
  return async dispatch => {
    const changedBlog = await blogService.update(blog)

    dispatch(modify(changedBlog))
    const payload = {
      text: `blog ${blog.title} changed`,
      error: false
    }
    dispatch(setTimedNotification(payload, 3))
  }
}

export const removeBlog = blog => {
  return async dispatch => {
    try {
      await blogService.deleteBlog(blog)
      dispatch(remove(blog))
      const payload = {
        text: `blog ${blog.title} removed`,
        error: false
      }
      dispatch(setTimedNotification(payload))
    } catch (err) {
      const payload = {
        text: err.response.data.error,
        error: true
      }
      dispatch(setTimedNotification(payload))
    }

  }
}

export default blogSlice.reducer
