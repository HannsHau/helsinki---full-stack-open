import { useDispatch } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { setMessage, removeMessage } from '../reducers/anecdoteMessage'

const Anecdote = ({ anecdote }) => {

  const dispatch = useDispatch()

  const vote = anecdote => {
    dispatch(voteFor(anecdote.id))
    dispatch(setMessage(`You voted '${anecdote.content}'`))
    setTimeout(() => {dispatch(removeMessage()) }, 5000)
  }

  return ( <div key={anecdote.id}>
    <div>{anecdote.content}</div>
    <div>
      has {anecdote.votes}
      <button onClick={() => vote(anecdote)}>vote</button>
    </div>
  </div> )
}

export default Anecdote