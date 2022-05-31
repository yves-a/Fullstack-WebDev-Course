// import { useState } from 'react'
import { connect } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { createNotification } from '../reducers/notificationReducer'
const BlogForm = (props) => {
  const addBlog = (event) => {
    event.preventDefault()
    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value
    const likes = event.target.likes.value
    const newBlog = {
      title,
      author,
      url,
      likes,
    }
    console.log(newBlog)
    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
    event.target.likes.value = ''
    props.createBlog(newBlog)
    console.log(newBlog)
    const message = `blog ${title} created`
    const noti = { message, type: '' }
    props.createNotification(noti, 3)
  }
  return (
    <div className="formDiv">
      <form onSubmit={addBlog}>
        <div>
          title
          <input type="text" placeholder="title" id="title" />
        </div>
        <div>
          author
          <input type="text" placeholder="author" id="author" />
        </div>
        <div>
          url
          <input type="text" placeholder="url" id="url" />
        </div>
        <div>
          likes
          <input type="number" placeholder="likes" id="likes" />
        </div>
        <button id="save" type="submit">
          save
        </button>
      </form>
    </div>
  )
}

export default connect(null, { createBlog, createNotification })(BlogForm)
