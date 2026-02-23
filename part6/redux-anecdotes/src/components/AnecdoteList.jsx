import { useSelector } from 'react-redux'
import Anecdote from './Anecdote'

const AnecdoteList = () => {

  const anecdotes = useSelector(state => {
    if (state.filter === '') {
      return state.notes
    }
    return state.notes.filter((anecdote) => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()) )
    
  })

  return (
    <>
    {anecdotes
      .toSorted((a, b) => b.votes - a.votes)
      .map( anecdote => <Anecdote key={anecdote.id} anecdote={anecdote}/> ) }
    </>
  )   
}

export default AnecdoteList