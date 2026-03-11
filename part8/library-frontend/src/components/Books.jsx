import { useMemo, useState } from 'react'

const Books = ({ show, books }) => {
  const [genre, setGenre] = useState(null)

  const genres = useMemo(
    () => [...new Set(books.flatMap(b => b.genres))],
    [books]
  )

  if (!show) {
    return null
  }

  const handleClick = (clickedGenre) => {
    if (clickedGenre === genre) {
      setGenre(null)
    } else {
      setGenre(clickedGenre)
    }
  }

  const byGenre = (a) => !genre || a.genres.includes(genre)

  return (
    <div>
      <h2>books</h2>
      {genre && <p>in genre <b>{genre}</b></p>}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.filter(byGenre).map(a => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres.map(g=>(<button key={g} onClick={() => handleClick(g)}>{g}</button>))}
      </div>
    </div>
  )
}

export default Books
