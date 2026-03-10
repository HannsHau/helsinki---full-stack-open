import { useMutation } from '@apollo/client/react'
import { useState } from 'react'
import { EDIT_AUTHOR } from '../queries'

const EditAuthor = ({ setError }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [ editAuthor ] =  useMutation(EDIT_AUTHOR, {
    onError: (error) => setError(error.message),
    onCompleted: (data) => {
      if(!data.editAuthor) {
        setError('author not found')
      }
    }
  })

  const submit = async event => {
    event.preventDefault()

    editAuthor({ variables: { name, born: born ? Number(born) : undefined } })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default EditAuthor
