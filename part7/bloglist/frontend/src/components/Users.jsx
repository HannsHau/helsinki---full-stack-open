import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const Users = () => {
  const users = useSelector(state => state.users) 
  return (
    <div>
      <h2>Users</h2>
      <table key='userstable'>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td><Link to={`/user/${u.id}`}>{u.username}</Link></td>
              <td>{u.blogs.length}</td>
            </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users