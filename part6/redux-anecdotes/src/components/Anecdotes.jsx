import { useSelector } from 'react-redux'
import Anecdote from './Anecdote'

const Anecdotes = () => {

  const anecdotes = useSelector(state => state)

  return (
    <>
    {anecdotes
      .toSorted((a, b) => b.votes - a.votes)
      .map( anecdote => <Anecdote key={anecdote.id} anecdote={anecdote}/> ) }
    </>
  )   
}

export default Anecdotes