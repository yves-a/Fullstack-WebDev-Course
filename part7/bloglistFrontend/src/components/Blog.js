import { useState } from 'react'
import { likeBlog, deleteBlog, addNewComment } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { createNotification } from '../reducers/notificationReducer'
import { useParams } from 'react-router-dom'

// import blogService from '../services/blogs'

const Blog = () => {
  const dispatch = useDispatch()
  const [blogState, setBlogState] = useState(false)
  const blogId = useParams().blogId

  const blog = useSelector((state) => {
    return state.blogs.find((blog) => blog.id === blogId)
  })

  const toggleBlogState = () => {
    setBlogState(!blogState)
  }

  const updateLikes = () => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    }
    dispatch(likeBlog(blog.id, updatedBlog))
    const message = `anecdote ${blog.title} liked`
    const noti = { message, type: '' }
    dispatch(createNotification(noti, 3))
  }

  const destroyBlog = () => {
    const ok = window.confirm(`Remove ${blog.title} by ${blog.author}`)
    if (ok) {
      dispatch(deleteBlog(blog.id))
    }
  }
  const users = useSelector((state) => state.users)

  const addComment = (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    console.log(comment, 'comment')
    const updatedBlog = {
      ...blog,
      comments: [],
    }
    try {
      const comments = blog.comments.concat({ comment })
      updatedBlog.comments = comments
    } catch (e) {
      updatedBlog.comments = Array.of(comment)
    }
    console.log(updatedBlog)
    event.target.comment.value = ''
    dispatch(addNewComment(blog.id, updatedBlog))
    const message = `comment ${comment} created`
    const noti = { message, type: '' }
    dispatch(createNotification(noti, 3))
  }

  if (blogState) {
    return (
      <div>
        <div>
          {blog.title} <button onClick={toggleBlogState}> hide </button>
          <br /> {blog.url} <br />
          {blog.likes} <br /> {blog.author}
          <br />{' '}
          <button id="deleteButton" onClick={destroyBlog}>
            {' '}
            delete{' '}
          </button>
        </div>
      </div>
    )
  }
  if (blog && users) {
    let user
    if (users.find((user) => user.id === blog.user.id)) {
      user = users.find((user) => user.id === blog.user.id)
    } else {
      user = users.find((user) => user.id === blog.user)
    }
    return (
      <div className="blog">
        <h1>blog app</h1>
        <h1>
          {blog.title} {blog.author}
        </h1>
        <p>{blog.url}</p>
        <p>
          {blog.likes}
          <button id="likeButton" onClick={updateLikes}>
            {' '}
            like{' '}
          </button>
        </p>
        <p>added by {user.name}</p>
        <h3>comments</h3>
        <form onSubmit={addComment}>
          <input type="text" placeholder="comment" id="comment" />
          <button id="saveComment" type="submit">
            add comment
          </button>
        </form>
        {blog.comments && blog.comments.length > 0 ? (
          <ul>
            {blog.comments.map((comment, i) => (
              <li key={i}>{comment.comment}</li>
            ))}
          </ul>
        ) : (
          <div></div>
        )}
      </div>
    )
  }
  return <div></div>
}

export default Blog
