import { gql } from '@apollo/client'

export const AUTHORS_BOOKS = gql`
  query {
    allAuthors {
      name
      bookCount
      born
    }
    allBooks {
      title
      author {
        name
        born
        bookCount
      }
      published
      genres
    }
    me {
      username
      favouriteGenre
      id
    }
  }
`
export const ADD_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      published
      genres
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      published
      genres
      author {
        name
      }
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`
export const BOOKS_GENRE = gql`
  query allBooksGenre($genres: String!) {
    allBooks(genres: $genres) {
      title
      author {
        name
        born
        bookCount
      }
      published
      genres
    }
  }
`
