import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR, AUTHORS_BOOKS } from '../queries'
import Select from 'react-select'

const AuthorBirthYear = ({ authors }) => {
  const [name, setName] = useState(null)
  const [year, setYear] = useState('')
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: AUTHORS_BOOKS }],
  })

  const options = authors.map((author) => {
    return { name: author.name, label: author.name }
  })
  console.log(options)

  const submit = async (event) => {
    event.preventDefault()

    console.log('edit author...')
    console.log(name)
    editAuthor({ variables: { name: name.name, setBornTo: year } })
    setName('')
    setYear('')
  }
  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <Select defaultValue={name} onChange={setName} options={options} />
        <div>
          year
          <input
            type="number"
            value={year}
            onChange={({ target }) => setYear(target.valueAsNumber)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}
const Authors = (props) => {
  if (!props.show) {
    return null
  }
  const authors = props.authors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <AuthorBirthYear authors={authors} />
    </div>
  )
}

export default Authors
