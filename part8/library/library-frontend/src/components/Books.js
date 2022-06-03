import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { BOOKS_GENRE } from '../queries'
const Books = (props) => {
  const [genre, setGenre] = useState('')
  const result = useQuery(BOOKS_GENRE, {
    variables: { genres: genre },
  })
  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }
  console.log(genre, 'genre')
  console.log(result, 'check')
  let books
  if (genre.length > 0) {
    books = result.data.allBooks
    console.log(result.data, 'check')
  } else {
    books = props.books
  }
  const allBooks = props.books
  const handleGenreChange = (event) => {
    event.preventDefault()
    setGenre(event.target.value)
  }
  console.log(books, 'one sec')
  const genres = allBooks.map((book) => book.genres)
  const genresSet = new Set(genres.join(',').split(','))
  return (
    <div>
      <h2>books</h2>
      <h3>current genre: {genre.length > 0 ? genre : 'all genres'}</h3>
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
      {/* check this */}
      {Array.from(genresSet).map((value) => (
        <button key={value} onClick={handleGenreChange} value={value}>
          {value}
        </button>
      ))}
      <button onClick={handleGenreChange} value="">
        all genres
      </button>
    </div>
  )
}

export default Books
