import { ME } from '../queries'

import { useQuery } from '@apollo/client/react'

const Recommend = ({ show, books }) => {

  const result = useQuery(ME)

  if (!show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const genre = result.data?.me?.favoriteGenre ?? null 

  const byGenre = (a) => !genre || a.genres.includes(genre)

  return (
    <div>
      <h2>books</h2>
      {genre && <p>books in your favorite genre <b>{genre}</b></p>}
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
    </div>
  )
}

export default Recommend
