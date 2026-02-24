import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes', 
  initialState: [],
  reducers: {
    addAnecdote( state, action ) {
      return state.push(action.payload)
    },
    voteFor( state, action ) {
      const changedAnecdote = action.payload
      return state.map(anecdote => (anecdote.id !== changedAnecdote.id ? anecdote : changedAnecdote))
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

const { addAnecdote, voteFor, setAnecdotes } = anecdoteSlice.actions

export const appendAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(addAnecdote(newAnecdote))
  }
}

export const addVote = (anecdote) => {
  return async (dispatch) => {
    const anecdoteWithVote = {...anecdote, votes: anecdote.votes + 1}
    const updatedAnecdote = await anecdoteService.updateAnecdote(anecdoteWithVote)
    dispatch(voteFor(updatedAnecdote))
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export default anecdoteSlice.reducer
