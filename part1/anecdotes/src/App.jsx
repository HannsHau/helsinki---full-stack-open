import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const total = anecdotes.length
  
  const getRandom = () => {
    const random = Math.floor(Math.random() * total)
    return random
  }
   
  const [selected, setSelected] = useState(() => getRandom())
  const [votes, setVotes] = useState(Array(total).fill(0));

  const handleNext = () => {
    setSelected(getRandom())
  }

  const handleVote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  const getIndexMaxVotes = () => {
    let i = 0
    votes.forEach((element, index, array) => {
      if (element > array[i]) i = index
    })
    return i
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}<br></br>
      has {votes[selected]} votes</p>
      <button onClick={handleVote}>vote</button>
      <button onClick={handleNext}>next anecdote</button> 
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[getIndexMaxVotes()]}<br></br>
      has {votes[getIndexMaxVotes()]} votes</p>
      {console.log('votes: ', votes)}
    </div>
  )
}

export default App
