import { createSlice, current } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes', 
  initialState: [],
  reducers: {
    addAnecdote( state, action ) {
      state.push(action.payload)
    },
    voteFor( state, action ) {
      const id = action.payload
      const anecdoteToChange = current(state).find(n => n.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote => (anecdote.id !== id ? anecdote : changedAnecdote))
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { addAnecdote, voteFor, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
