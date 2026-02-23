import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'

const AnecdotesForm = () => {
  const dispatch = useDispatch()

  const add = event => {
    event.preventDefault()
    dispatch(addAnecdote(event.target.anecdote.value))
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
