const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await fetch(baseUrl)

  if (!response.ok) {
    throw new Error('Failed to fetch notes')
  }

  const data = await response.json()
  return data
}

const createNew = async (content) => {

  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, votes: 0 }),
  })
  
  if (!response.ok) {
    throw new Error('Failed to create anecdote')
  }
  
  return await response.json()
}

const updateAnecdote = async (anecdote) => {

  const url = baseUrl + '/' + anecdote.id

  const updateAnecdote = {
    content: anecdote.content,
    votes: anecdote.votes
  }

  const response = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify( updateAnecdote ),
  })

  if (!response.ok) {
    throw new Error('Failed to update anecdote')
  }

  const result = await response.json()
  
  return await result
}

export default { getAll, createNew, updateAnecdote}