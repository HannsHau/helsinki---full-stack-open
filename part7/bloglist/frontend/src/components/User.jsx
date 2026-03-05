import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"

const User = () => {
  
  const id = useParams().id
  const user = useSelector( state => state.users.find( u => (u.id === id) ) ) 

  if (!user) return <p>404 not found</p>

  return (
    <>
      <h2>{user.name}</h2>
      <h3>{user.blogs.length > 0 ? 'added blogs' : 'no blogs'}</h3>
      <ul>
        {user.blogs.map(b => ( 
            <li>{b.title}</li>
            ) )}
      </ul>
    </>
  )
}

export default User