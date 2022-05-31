import { createSlice } from '@reduxjs/toolkit'

import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlog(state, action) {
      const blog = action.payload
      blog.comments = action.payload.comments
      console.log('set ', blog)
      return state.map((a) => (a.id === blog.id ? blog : a))
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
  },
})

export const { setBlog, appendBlog, setBlogs } = blogSlice.actions

export const likeBlog = (id, blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(id, blog)
    dispatch(setBlog(updatedBlog))
  }
}

export const createBlog = (newBlog) => {
  return async (dispatch) => {
    console.log(newBlog)
    const createdBlog = await blogService.create(newBlog)
    dispatch(appendBlog(createdBlog))
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}
export const deleteBlog = (id) => {
  return async (dispatch) => {
    console.log('yo')
    blogService.destroy(id)
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs.filter((b) => b.id !== id)))
  }
}

export const addNewComment = (id, blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.newComment(id, blog)
    console.log('updae ', blog)
    dispatch(setBlog(updatedBlog))
  }
}

export default blogSlice.reducer
