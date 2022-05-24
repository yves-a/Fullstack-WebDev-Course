import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addVote(state, action) {
      const id = action.payload.id
      const foundAnecdote = state.find(n => n.id === id)
      const changedAnecdote = {...foundAnecdote, votes: foundAnecdote.votes+1}
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote 
      )
      
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }

  },
})

export const { addVote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const updateAnecdote = (id) => {
  return async dispatch => {
    const chosenAnecdote = await anecdoteService.updateVotes(id)
    dispatch(addVote(chosenAnecdote))
  }
}


export default anecdoteSlice.reducer