import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setMessage, removeMessage } from '../reducers/anecdoteMessage'
import anecdoteService from '../services/anecdotes'

const AnecdotesForm = () => {
  const dispatch = useDispatch()

  const add = async (event) => {
    event.preventDefault()

    const newAnecdote = await anecdoteService.createNew(event.target.anecdote.value)
    dispatch(addAnecdote(newAnecdote))

    dispatch(setMessage(`You added: '${newAnecdote}'`))
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
