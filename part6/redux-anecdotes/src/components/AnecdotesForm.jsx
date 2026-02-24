import { useDispatch } from 'react-redux'
import { appendAnecdote } from '../reducers/anecdoteReducer'
import { setMessage, removeMessage } from '../reducers/anecdoteMessage'

const AnecdotesForm = () => {
  const dispatch = useDispatch()

  const add = async (event) => {
    event.preventDefault()

    dispatch(appendAnecdote(event.target.anecdote.value))

    dispatch(setMessage(`You added: '${event.target.anecdote.value}'`))
    setTimeout(() => {dispatch(removeMessage()) }, 5000)
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
