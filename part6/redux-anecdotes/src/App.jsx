import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import AnecdotesForm from './components/AnecdotesForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { setAnecdotes } from './reducers/anecdoteReducer'
import anecdotesService from './services/anecdotes'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    anecdotesService.getAll().then(anecdotes => dispatch(setAnecdotes(anecdotes)))
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <h2>create new</h2>
      <AnecdotesForm />
    </div>
  )
}

export default App
