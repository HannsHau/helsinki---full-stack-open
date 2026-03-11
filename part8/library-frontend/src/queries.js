import { gql } from '@apollo/client'

export const READ_ALL = gql`
  query {
    allAuthors {
      id
      name
      born
      bookCount
    }
    allBooks {
      id
      title
      published
      genres
      author {
        name
        id
        born
        bookCount
      }
    }
  }
`

export const READ_BOOKS_BY_GENRE = gql`
  query readBooksByGenre($genreToSearch: String) {
    allBooks(genre: $genreToSearch) {
      id
      title
      published
      genres
      author {
        name
        id
        born
        bookCount
      }
    }
}`

export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $published: Int
    $author: String!
    $genres: [String]
  ) {
    addBook (title: $title, published: $published, author: $author, genres: $genres ) {
      title
      published
      author {
        name
        id
        born
        bookCount
      }
      genres
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation editAuthor(
    $name: String!
    $born: Int!
  ) {
    editAuthor(name: $name, born: $born) {
      name
      born
      id
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const ME = gql`
  query {
    me {
      favoriteGenre
      username
      id
    }
  }
`