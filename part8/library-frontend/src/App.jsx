import { useState } from 'react'
import { useApolloClient, useQuery } from '@apollo/client/react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notify from './components/Notify'
import LoginForm from './components/LoginForm'

import { READ_ALL } from './queries'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('library-user-token'))
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  const result = useQuery(READ_ALL)

  if (result.loading) {
    return <div>loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const onLogout = () => {
    setToken(null)
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
        {!token && <button onClick={() => setPage('login')}>login</button>}
        {token && <button onClick={onLogout}>logout</button>}
      </div>

      <Authors show={page === 'authors'} 
        authors={result.data.allAuthors} setError={notify}/>
      <Books show={page === 'books'} books={result.data.allBooks} />

      <LoginForm show={page === 'login'} setError={notify} setToken={setToken} />

      <NewBook show={page === 'add'} />
    </div>
  )
}

export default App
