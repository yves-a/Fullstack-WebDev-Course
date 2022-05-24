import { useDispatch, useSelector } from 'react-redux'
import { updateAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return(
    <div>
      <div>
      {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
    
  )
}



const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    return (filter.length === 0) ? anecdotes :
    anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
  })
  const byVotes = (b1, b2) => b2.votes>b1.votes ? 1 : -1
  const sortedAnecdotes =  [...anecdotes].sort(byVotes)

  const handleDispatch = (anecdote) => {
    dispatch(updateAnecdote(anecdote.id))
    dispatch(createNotification(anecdote.content,5))
  }

  return(
    <div>
      {sortedAnecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => handleDispatch(anecdote)
          }
        />
      )}
    </div>
  )
}

export default AnecdoteList