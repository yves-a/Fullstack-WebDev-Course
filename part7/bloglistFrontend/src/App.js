import { useEffect } from 'react'
import blogService from './services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { loggedIn } from './reducers/userReducer'
import Home from './components/Home'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import Notification from './components/Notification'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'

import NavBar from './components/NavBar'
const App = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(loggedIn(user))
      blogService.setToken(user.token)
      dispatch(initializeBlogs())
      dispatch(initializeUsers())
    }
  }, [])

  const logout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    dispatch(loggedIn(null))
    navigate('/')
  }

  return (
    <div>
      <NavBar user={user} logout={logout} />
      <Notification />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:userId" element={<User />} />
        <Route path="/blogs/:blogId" element={<Blog user={user} />} />
      </Routes>
    </div>
  )
}

export default App
