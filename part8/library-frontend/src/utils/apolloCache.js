import { READ_ALL, READ_BOOKS_BY_GENRE } from '../queries'

export const addBookToCache = (cache, bookToAdd) => {
  cache.updateQuery({ query: READ_ALL }, ({ allAuthors, allBooks }) => {
    const bookExists = allBooks.some(book => book.id === bookToAdd.id)

    console.log('bookExists: ', bookExists, 'title: ', bookToAdd.title)

    if (bookExists) {
      return { allAuthors, allBooks }
    }

    return {
      allAuthors,
      allBooks: allBooks.concat(bookToAdd)
    }
  })
  cache.updateQuery({ query: READ_BOOKS_BY_GENRE, variables: { genreToSearch: null } }, ({ allBooks }) => {
    const bookExists = allBooks.some(book => book.id === bookToAdd.id)

    console.log('bookExists in READ_BOOKS_BY_GENRE: ', bookExists, 'title: ', bookToAdd.title)

    if (bookExists) {
      return { allBooks }
    }

    return {
      allBooks: allBooks.concat(bookToAdd)
    }
  })
}
