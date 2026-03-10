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
      author
    }
  }
`

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
      author
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