import { gql } from '@apollo/client'

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
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
`

const AUTHOR_DETAILS = gql`
  fragment AuthorDetails on Author {
    id
    name
    born
    bookCount
  }
`

export const READ_ALL = gql`
  query {
    allAuthors {
      ...AuthorDetails
    }
    allBooks {
      ...BookDetails
    }
  }

  ${AUTHOR_DETAILS}
  ${BOOK_DETAILS}
`

export const READ_BOOKS_BY_GENRE = gql`
  query readBooksByGenre($genreToSearch: String) {
    allBooks(genre: $genreToSearch) {
      ...BookDetails
    }
  }

  ${BOOK_DETAILS}
`

export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $published: Int
    $author: String!
    $genres: [String]
  ) {
    addBook (title: $title, published: $published, author: $author, genres: $genres ) {
      ...BookDetails
    }
  }

  ${BOOK_DETAILS}
`

export const EDIT_AUTHOR = gql`
  mutation editAuthor(
    $name: String!
    $born: Int!
  ) {
    editAuthor(name: $name, born: $born) {
      ...AuthorDetails
    }
  }

  ${AUTHOR_DETAILS}
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

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }

  ${BOOK_DETAILS}
`
