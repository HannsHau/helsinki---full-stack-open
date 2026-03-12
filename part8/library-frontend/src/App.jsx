import { useState } from 'react'
import {
  useApolloClient,
  useQuery,
  useSubscription
} from '@apollo/client/react'
import Authors from './components/Authors'
import Books from './components/Books'
import Recommend from './components/Recommend'
import NewBook from './components/NewBook'
import Notify from './components/Notify'
import LoginForm from './components/LoginForm'
import { addBookToCache } from './utils/apolloCache'

import { BOOK_ADDED, READ_ALL } from './queries'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('library-user-token'))
  const [page, setPage] = useState('authors')
  
  const [errorMessage, setErrorMessage] = useState(null)
  
  const result = useQuery(READ_ALL)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const book = data.data.bookAdded
      notify(`${book.title} added`)
      addBookToCache(client.cache, book)
    }
  })
  
  const notify = message => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  if (result.loading) {
    return <div>loading...</div>
  }



  const onLogout = () => {
    setToken(null)
    setPage('authors')
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && (
          <button onClick={() => setPage('recommend')}>recommend</button>
        )}
        {!token && <button onClick={() => setPage('login')}>login</button>}
        {token && <button onClick={onLogout}>logout</button>}
      </div>

      <Authors
        show={page === 'authors'}
        authors={result.data.allAuthors}
        setError={notify}
      />
      <Books show={page === 'books'} books={result.data.allBooks} />
      <Recommend show={page === 'recommend'} oldBooks={result.data.allBooks} />
      <NewBook show={page === 'add'} />

      <LoginForm
        show={page === 'login'}
        setError={notify}
        setToken={setToken}
      />
    </div>
  )
}

export default App
