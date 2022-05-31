import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
const User = () => {
  const userId = useParams().userId

  const user = useSelector((state) => {
    console.log(state.users)
    console.log(state.blogs)
    return state.users.find((user) => user.id === userId)
  })
  //   const blogs = useSelector((state) => state.blogs)
  //   const match = useMatch('/blogs/:id')
  //   const blog = match
  //     ? blogs.find((blog) => blog.id === Number(match.params.id))
  //     : null

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  if (user) {
    return (
      <div>
        <h2>{user.name}</h2>
        {user.blogs.map((blog) => (
          <div key={blog.id} style={blogStyle}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} {blog.author}
            </Link>
          </div>
        ))}
      </div>
    )
  }
  return null
}

export default User
