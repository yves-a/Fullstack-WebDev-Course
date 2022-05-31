import { connect } from 'react-redux'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUsers } from '../reducers/usersReducer'
import { Link, useMatch } from 'react-router-dom'
import { initializeBlogs } from '../reducers/blogReducer'
import { Table } from 'react-bootstrap'
const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)
  useEffect(() => {
    dispatch(initializeUsers())
    dispatch(initializeBlogs())
  }, [dispatch])

  const match = useMatch('/users/:id')
  const user = match
    ? users.find((user) => user.id === Number(match.params.id))
    : null
  console.log(user)
  console.log(users, 'users')
  if (users) {
    return (
      <div>
        <h2>Users</h2>
        <Table striped>
          <tbody>
            <tr>
              <th></th>
              <th>blogs created</th>
            </tr>
            {users.map((user) => (
              <tr key={user.id}>
                <th>
                  <Link to={`/users/${user.id}`}>{user.username}</Link>
                </th>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
  }
}

export default connect(mapStateToProps)(Users)
