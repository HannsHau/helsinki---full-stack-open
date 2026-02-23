import { useDispatch, useSelector } from 'react-redux'
import { voteFor, addAnecdote } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = id => {
    dispatch(voteFor(id))
  }

  const add = event => {
    event.preventDefault()
    dispatch(addAnecdote(event.target.anecdote.value))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.toSorted((a, b) => b.votes - a.votes).map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={add}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App
