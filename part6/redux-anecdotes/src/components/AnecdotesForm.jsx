import { useDispatch } from 'react-redux'
import { appendAnecdote } from '../reducers/anecdoteReducer'
import { setMessageForPeriod } from '../reducers/anecdoteMessage'

const AnecdotesForm = () => {
  const dispatch = useDispatch()

  const add = async (event) => {
    event.preventDefault()

    dispatch(appendAnecdote(event.target.anecdote.value))

    dispatch(setMessageForPeriod(`You added: '${event.target.anecdote.value}'`, 10))
  }

  return (
    <form onSubmit={add}>
      <div>
        <input name="anecdote" />
      </div>
      <button type="submit">create</button>
    </form> 
  )   
}

export default AnecdotesForm
