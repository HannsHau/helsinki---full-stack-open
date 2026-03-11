import { useMemo, useState } from 'react'
import { useQuery } from '@apollo/client/react'
import { READ_BOOKS_BY_GENRE, READ_ALL } from '../queries'

const Books = ({ show, books }) => {
  const [genre, setGenre] = useState(null)

  const genres = useMemo(
    () => [...new Set(books.flatMap(b => b.genres))],
    [books]
  )

  const result = useQuery(READ_BOOKS_BY_GENRE, {
    variables: { genreToSearch: genre },
    fetchPolicy: "network-only",
  })
  
  if (!show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const newBooks = result.data?.allBooks ?? ''

  const handleClick = clickedGenre => {
    if (clickedGenre === genre) {
      setGenre(null)
    } else {
      setGenre(clickedGenre)
    }
  }

  return (
    <div>
      <h2>books</h2>
      {genre && (
        <p>
          in genre <b>{genre}</b>
        </p>
      )}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {/* {books.filter(byGenre).map(a => ( */}
          {newBooks.map(a => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres.map(g => (
          <button key={g} onClick={() => handleClick(g)}>
            {g}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Books
