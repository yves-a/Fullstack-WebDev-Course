import { useState } from 'react'
import { useQuery, useSubscription, useApolloClient } from '@apollo/client'
import Notify from './components/Notify'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { AUTHORS_BOOKS, BOOK_ADDED } from './queries'
import Recommendations from './components/Recommendations'

export const updateCache = (cache, query, addedBook) => {
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.name
      return seen.has(k) ? false : seen.add(k)
    })
  }
  cache.updateQuery(query, ({ allAuthors, allBooks }) => {
    return {
      allAuthors: uniqByName(allAuthors.concat(addedBook)),
      allBooks: uniqByName(allBooks.concat(addedBook)),
    }
  })
}

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const result = useQuery(AUTHORS_BOOKS)
  const client = useApolloClient()
  console.log(result)
  const [errorMessage, setErrorMessage] = useState(null)

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      const message = `${addedBook.title} added`
      setErrorMessage(message)
      console.log(errorMessage)
      setTimeout(() => {
        setErrorMessage(null)
      }, 10000)
      updateCache(client.cache, { query: AUTHORS_BOOKS }, addedBook)
    },
  })
  if (result.loading) {
    return <div>loading...</div>
  }
  console.log(errorMessage, 'error')
  const notify = (message) => {
    setErrorMessage(message)

    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  console.log(notify, errorMessage)
  console.log(result.data.allAuthors)

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('login')}>login</button>
        </div>
        <Authors show={page === 'authors'} authors={result.data.allAuthors} />

        <Books show={page === 'books'} books={result.data.allBooks} />
        <LoginForm
          show={page === 'login'}
          setToken={setToken}
          setError={notify}
          setPage={setPage}
        />
      </div>
    )
  }
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommend')}>recommend</button>
        <button onClick={logout}>logout</button>
      </div>
      <Authors show={page === 'authors'} authors={result.data.allAuthors} />
      <Books show={page === 'books'} books={result.data.allBooks} />
      <NewBook show={page === 'add'} setError={notify} />
      <Recommendations show={page === 'recommend'} user={result.data.me} />
      <Notify errorMessage={errorMessage} />
    </div>
  )
}

export default App
