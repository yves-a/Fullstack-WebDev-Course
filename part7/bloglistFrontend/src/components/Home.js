import { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import loginService from '../services/login'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { createNotification } from '../reducers/notificationReducer'
import { initializeBlogs } from '../reducers/blogReducer'
import { loggedIn } from '../reducers/userReducer'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

const Home = ({ user }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogs = useSelector((state) => state.blogs)
  const dispatch = useDispatch()

  const sortedBlogs = [...blogs].sort((a1, a2) => a2.likes - a1.likes)
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])
  console.log(sortedBlogs)
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(loggedIn(user))
      blogService.setToken(user.token)
    }
  }, [])
  const notify = (message, type = 'info') => {
    const noti = { message, type }
    console.log(noti)
    dispatch(createNotification(noti, 3))
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log(username)
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))

      blogService.setToken(user.token)
      dispatch(loggedIn(user))
      notify(`logged in ${username}`)
      setUsername('')
      setPassword('')
    } catch (exception) {
      notify('wrong username or password', 'alert')
    }
  }

  const blogForm = () => (
    <Togglable buttonLabel="new blog">
      <BlogForm />
    </Togglable>
  )

  const loginForm = () => (
    <Form onSubmit={handleLogin}>
      <Form.Group>
        <div>
          <Form.Label>username:</Form.Label>
          <input
            type="text"
            value={username}
            name="Username"
            id="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <Form.Label>password:</Form.Label>
          <input
            type="password"
            value={password}
            name="Password"
            id="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
      </Form.Group>
      <Button id="login-button" type="submit">
        login
      </Button>
    </Form>
  )

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        {loginForm()}
      </div>
    )
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div>
      <h2>blogs</h2>
      <div>{blogForm()}</div>
      {sortedBlogs.map((blog) => (
        <div key={blog.id} style={blogStyle}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} {blog.author}
          </Link>
        </div>
      ))}
    </div>
  )
}

export default Home
