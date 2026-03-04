import { createSlice } from '@reduxjs/toolkit'

import blogService from '../services/blogs'

import { setTimedNotification } from './notificationReducer'

const initDbBlogs = await blogService.getAll()

const blogSlice = createSlice({
  name: 'blog',
  initialState: initDbBlogs,
  reducers: {
    add(state, action) {
      console.log('add payload: ', action.payload)
      return state.concat(action.payload)
    },
    modify(state, action) {
      console.log('modify payload: ', action.payload)
      const blog = action.payload
      return state.map(b => (b.id !== blog.id ? b : blog))
    },
    remove(state, action) {
      console.log('remove payload: ', action.payload)
      const blog = action.payload
      //setBlogs(blogs => blogs.filter(blog => blog.id !== blogObject.id))
      return state.filter(b => b.id !== blog.id)
    }
  }
})

const { add, modify, remove } = blogSlice.actions

export const addBlog = blog => {
  console.log('addBlog: ', blog)

  return async dispatch => {
    const newBlog = await blogService.create(blog)
    console.log('newBlog: ', newBlog)
    dispatch(add(newBlog))

    const payload = {
      text: `a new blog ${blog.title} by ${blog.author} added`,
      error: false
    }
    dispatch(setTimedNotification(payload, 3))
  }
}

export const modifyBlog = blog => {
  console.log('modifyBlog: ', blog)

  return async dispatch => {
    const changedBlog = await blogService.update(blog)
    console.log('changedBlog: ', changedBlog)

    dispatch(modify(changedBlog))
    const payload = {
      text: `blog ${blog.title} changed`,
      error: false
    }
    dispatch(setTimedNotification(payload, 3))
  }
}

export const removeBlog = blog => {
  console.log('removeBlog: ', blog)

    // const removeBlog = async blogObject => {
    //   try {
    //     await blogService.deleteBlog(blogObject)
    //     setBlogs(blogs => blogs.filter(blog => blog.id !== blogObject.id))
    //   } catch (err) {
    //     prepareNotification(err.response.data.error, true)
    //   }
    // }
  return async dispatch => {
    try {
      console.log('1');
      
      await blogService.deleteBlog(blog)
      dispatch(remove(blog))
      console.log('2');
      const payload = {
        text: `blog ${blog.title} removed`,
        error: false
      }
      console.log('3');
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
