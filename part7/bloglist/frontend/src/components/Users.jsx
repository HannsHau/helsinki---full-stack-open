import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Table } from "react-bootstrap"

const Users = () => {
  const users = useSelector(state => state.users) 
  return (
    <div>
      <h2>Users</h2>
      <Table striped key='userstable'>
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
      </Table>
    </div>
  )
}

export default Users