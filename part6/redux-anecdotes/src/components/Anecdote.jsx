import { useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setMessageForPeriod } from '../reducers/anecdoteMessage'

const Anecdote = ({ anecdote }) => {

  const dispatch = useDispatch()

  const vote = anecdote => {
    dispatch(addVote(anecdote))
    dispatch(setMessageForPeriod(`You voted '${anecdote.content}'`, 10))
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