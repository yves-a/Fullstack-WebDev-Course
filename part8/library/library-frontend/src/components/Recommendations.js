import { useQuery } from '@apollo/client'
import { BOOKS_GENRE } from '../queries'
const Recommendations = (props) => {
  const favGenre = props.user.favouriteGenre
  const result = useQuery(BOOKS_GENRE, {
    variables: { genres: favGenre },
  })
  if (result.loading) {
    return <div>loading...</div>
  }
  if (!props.show) {
    return null
  }

  let books = result.data.allBooks
  return (
    <div>
      <h2>recommendations</h2>
      <h3>books in your favourite genre {favGenre}</h3>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations
